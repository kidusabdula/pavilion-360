import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ApiError, handleApiError, successResponse } from '@/lib/utils/api-error';
import { updatePortfolioSchema } from '@/lib/schemas/portfolio.schema';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select(`
        *,
        event_types (
          id,
          name,
          slug
        )
      `)
      .eq('id', id)
      .is('deleted_at', null)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        throw ApiError.notFound('Portfolio project');
      }
      throw ApiError.internal(error.message);
    }
    
    return Response.json(successResponse(data));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const body = await request.json();
    
    // Validate
    const validation = updatePortfolioSchema.safeParse({ id, ...body });
    if (!validation.success) {
      throw ApiError.badRequest('Validation failed', validation.error.flatten().fieldErrors);
    }
    
    // Update
    const { data, error } = await supabase
      .from('portfolio_projects')
      .update(validation.data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        throw ApiError.notFound('Portfolio project');
      }
      throw ApiError.internal(error.message);
    }
    
    return Response.json(successResponse(data));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    
    // Soft delete
    const { error } = await supabase
      .from('portfolio_projects')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') {
        throw ApiError.notFound('Portfolio project');
      }
      throw ApiError.internal(error.message);
    }
    
    return Response.json(successResponse({ id }));
  } catch (error) {
    return handleApiError(error);
  }
}