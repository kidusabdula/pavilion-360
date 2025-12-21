import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ApiError, handleApiError, successResponse } from '@/lib/utils/api-error';
import { createVenueSchema } from '@/lib/schemas/venue.schema';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;
    const search = searchParams.get('search') || '';
    const city = searchParams.get('city');
    
    let query = supabase
      .from('venues')
      .select('*', { count: 'exact' })
      .is('deleted_at', null)
      .order('display_order')
      .range(offset, offset + limit - 1);
    
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }
    
    if (city && city !== 'all') {
      query = query.eq('city', city);
    }
    
    const { data, error, count } = await query;
    
    if (error) throw ApiError.internal(error.message);
    
    return Response.json(successResponse(data, {
      page, limit, total: count || 0, totalPages: Math.ceil((count || 0) / limit)
    }));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    
    const validation = createVenueSchema.safeParse(body);
    if (!validation.success) {
      throw ApiError.badRequest('Validation failed', validation.error.flatten().fieldErrors);
    }
    
    const { data, error } = await supabase
      .from('venues')
      .insert(validation.data)
      .select()
      .single();
    
    if (error) throw ApiError.internal(error.message);
    
    return Response.json(successResponse(data), { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}