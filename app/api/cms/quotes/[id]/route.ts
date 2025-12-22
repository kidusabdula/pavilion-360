import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ApiError, handleApiError, successResponse } from '@/lib/utils/api-error';
import { updateQuoteSchema } from '@/lib/schemas/quote.schema';

interface RouteParams { 
  params: Promise<{ id: string }>; 
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('quote_requests')
      .select(`
        *,
        event_types (
          id,
          name
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') throw ApiError.notFound('Quote');
      throw ApiError.internal(error.message);
    }
    return Response.json(successResponse(data));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const body = await request.json();
    
    const validation = updateQuoteSchema.safeParse({ id, ...body });
    if (!validation.success) {
      throw ApiError.badRequest('Validation failed', validation.error.flatten().fieldErrors);
    }
    
    const { data, error } = await supabase
      .from('quote_requests')
      .update({ ...validation.data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw ApiError.internal(error.message);
    return Response.json(successResponse(data));
  } catch (error) {
    return handleApiError(error);
  }
}