// app/api/cms/services/[id]/route.ts
// CMS API for single service - GET, PUT, DELETE
import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { updateServiceSchema } from '@/lib/schemas/service.schema';
import { ApiError, handleApiError, successResponse } from '@/lib/utils/api-error';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    
    // Get service with related data
    const { data: service, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();
    
    if (error || !service) {
      throw ApiError.notFound('Service');
    }
    
    // Fetch related data
    const [useCasesRes, processStepsRes, packagesRes] = await Promise.all([
      supabase
        .from('service_use_cases')
        .select('*')
        .eq('service_id', id)
        .order('display_order'),
      supabase
        .from('service_process_steps')
        .select('*')
        .eq('service_id', id)
        .order('step_number'),
      supabase
        .from('service_packages')
        .select('*')
        .eq('service_id', id)
        .order('display_order'),
    ]);
    
    return Response.json(
      successResponse({
        ...service,
        use_cases: useCasesRes.data || [],
        process_steps: processStepsRes.data || [],
        packages: packagesRes.data || [],
      })
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const body = await request.json();
    
    // Validate input
    const validationResult = updateServiceSchema.safeParse({ ...body, id });
    if (!validationResult.success) {
      throw ApiError.badRequest('Validation failed', {
        validation: validationResult.error.errors.map((e) => e.message),
      });
    }
    
    const { use_cases, process_steps, packages, ...serviceData } = validationResult.data;
    
    // Check service exists
    const { data: existingService } = await supabase
      .from('services')
      .select('id, slug')
      .eq('id', id)
      .is('deleted_at', null)
      .single();
    
    if (!existingService) {
      throw ApiError.notFound('Service');
    }
    
    // Check for duplicate slug (if slug changed)
    if (serviceData.slug && serviceData.slug !== existingService.slug) {
      const { data: duplicateSlug } = await supabase
        .from('services')
        .select('id')
        .eq('slug', serviceData.slug)
        .is('deleted_at', null)
        .neq('id', id)
        .single();
      
      if (duplicateSlug) {
        throw ApiError.conflict('A service with this slug already exists');
      }
    }
    
    // Update service
    const { data: service, error: serviceError } = await supabase
      .from('services')
      .update(serviceData)
      .eq('id', id)
      .select()
      .single();
    
    if (serviceError) {
      throw ApiError.internal(serviceError.message);
    }
    
    // Update related data if provided (replace strategy)
    if (use_cases !== undefined) {
      await supabase.from('service_use_cases').delete().eq('service_id', id);
      if (use_cases.length > 0) {
        await supabase.from('service_use_cases').insert(
          use_cases.map((uc) => ({
            ...uc,
            id: undefined, // Let DB generate new IDs
            service_id: id,
          }))
        );
      }
    }
    
    if (process_steps !== undefined) {
      await supabase.from('service_process_steps').delete().eq('service_id', id);
      if (process_steps.length > 0) {
        await supabase.from('service_process_steps').insert(
          process_steps.map((step) => ({
            ...step,
            id: undefined,
            service_id: id,
          }))
        );
      }
    }
    
    if (packages !== undefined) {
      await supabase.from('service_packages').delete().eq('service_id', id);
      if (packages.length > 0) {
        await supabase.from('service_packages').insert(
          packages.map((pkg) => ({
            ...pkg,
            id: undefined,
            service_id: id,
          }))
        );
      }
    }
    
    return Response.json(successResponse(service));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    
    // Soft delete
    const { error } = await supabase
      .from('services')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id)
      .is('deleted_at', null);
    
    if (error) {
      throw ApiError.internal(error.message);
    }
    
    return Response.json(successResponse({ deleted: true }));
  } catch (error) {
    return handleApiError(error);
  }
}