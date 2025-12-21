import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ApiError, handleApiError, successResponse } from '@/lib/utils/api-error';
import { createPortfolioSchema } from '@/lib/schemas/portfolio.schema';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;
    
    // Filters
    const search = searchParams.get('search') || '';
    const eventType = searchParams.get('event_type');
    
    // Build query with event type join
    let query = supabase
      .from('portfolio_projects')
      .select(`
        *,
        event_types (
          id,
          name,
          slug
        )
      `, { count: 'exact' })
      .is('deleted_at', null)
      .order('display_order')
      .range(offset, offset + limit - 1);
    
    // Apply search filter
    if (search) {
      query = query.ilike('title', `%${search}%`);
    }
    
    // Apply event type filter
    if (eventType && eventType !== 'all') {
      query = query.eq('event_type_id', eventType);
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
    
    // Validate
    const validation = createPortfolioSchema.safeParse(body);
    if (!validation.success) {
      throw ApiError.badRequest('Validation failed', validation.error.flatten().fieldErrors);
    }
    
    // Insert
    const { data, error } = await supabase
      .from('portfolio_projects')
      .insert(validation.data)
      .select()
      .single();
    
    if (error) throw ApiError.internal(error.message);
    
    return Response.json(successResponse(data), { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}