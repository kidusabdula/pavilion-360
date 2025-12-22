import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ApiError, handleApiError, successResponse } from '@/lib/utils/api-error';
import { updateFaqCategorySchema } from '@/lib/schemas/faq-category.schema';

interface RouteParams { 
  params: Promise<{ id: string }>; 
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('faq_categories')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') throw ApiError.notFound('FAQ category');
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
    
    const validation = updateFaqCategorySchema.safeParse({ id, ...body });
    if (!validation.success) {
      throw ApiError.badRequest('Validation failed', validation.error.flatten().fieldErrors);
    }
    
    const { data, error } = await supabase
      .from('faq_categories')
      .update(validation.data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw ApiError.internal(error.message);
    return Response.json(successResponse(data));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    
    // Hard delete for lookup tables (no soft delete)
    const { error } = await supabase
      .from('faq_categories')
      .delete()
      .eq('id', id);
    
    if (error) throw ApiError.internal(error.message);
    return Response.json(successResponse({ id }));
  } catch (error) {
    return handleApiError(error);
  }
}