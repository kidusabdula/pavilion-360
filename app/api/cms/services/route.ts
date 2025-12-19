// app/api/cms/services/route.ts
// CMS API for services - GET (list) and POST (create)
import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServiceSchema } from '@/lib/schemas/service.schema';
import { ApiError, handleApiError, successResponse } from '@/lib/utils/api-error';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    
    // Query params
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'display_order';
    const sortOrder = (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc';
    const includeDeleted = searchParams.get('includeDeleted') === 'true';
    
    // Build query
    let query = supabase
      .from('services')
      .select('*', { count: 'exact' });
    
    // Filter out soft-deleted unless requested
    if (!includeDeleted) {
      query = query.is('deleted_at', null);
    }
    
    // Search
    if (search) {
      query = query.or(`name.ilike.%${search}%,tagline.ilike.%${search}%`);
    }
    
    // Sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });
    
    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
    
    const { data, count, error } = await query;
    
    if (error) {
      throw ApiError.internal(error.message);
    }
    
    return Response.json(
      successResponse(data, {
        total: count ?? 0,
        page,
        limit,
        totalPages: Math.ceil((count ?? 0) / limit),
      })
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    
    // Validate input
    const validationResult = createServiceSchema.safeParse(body);
    if (!validationResult.success) {
      throw ApiError.badRequest('Validation failed', {
        validation: validationResult.error.errors.map((e) => e.message),
      });
    }
    
    const { use_cases, process_steps, packages, ...serviceData } = validationResult.data;
    
    // Check for duplicate slug
    const { data: existingService } = await supabase
      .from('services')
      .select('id')
      .eq('slug', serviceData.slug)
      .is('deleted_at', null)
      .single();
    
    if (existingService) {
      throw ApiError.conflict('A service with this slug already exists');
    }
    
    // Insert service
    const { data: service, error: serviceError } = await supabase
      .from('services')
      .insert(serviceData)
      .select()
      .single();
    
    if (serviceError) {
      throw ApiError.internal(serviceError.message);
    }
    
    // Insert related data if provided
    if (use_cases && use_cases.length > 0) {
      const useCasesWithServiceId = use_cases.map((uc) => ({
        ...uc,
        service_id: service.id,
      }));
      
      const { error: ucError } = await supabase
        .from('service_use_cases')
        .insert(useCasesWithServiceId);
      
      if (ucError) {
        console.error('Error inserting use cases:', ucError);
      }
    }
    
    if (process_steps && process_steps.length > 0) {
      const stepsWithServiceId = process_steps.map((step) => ({
        ...step,
        service_id: service.id,
      }));
      
      const { error: stepsError } = await supabase
        .from('service_process_steps')
        .insert(stepsWithServiceId);
      
      if (stepsError) {
        console.error('Error inserting process steps:', stepsError);
      }
    }
    
    if (packages && packages.length > 0) {
      const packagesWithServiceId = packages.map((pkg) => ({
        ...pkg,
        service_id: service.id,
      }));
      
      const { error: pkgError } = await supabase
        .from('service_packages')
        .insert(packagesWithServiceId);
      
      if (pkgError) {
        console.error('Error inserting packages:', pkgError);
      }
    }
    
    return Response.json(successResponse(service), { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}