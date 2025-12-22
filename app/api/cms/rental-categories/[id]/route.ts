import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ApiError, handleApiError, successResponse } from '@/lib/utils/api-error';
import { updateRentalCategorySchema } from '@/lib/schemas/rental-category.schema';

interface RouteParams { 
  params: Promise<{ id: string }>; 
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('rental_categories')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') throw ApiError.notFound('Rental category');
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
    
    const validation = updateRentalCategorySchema.safeParse({ id, ...body });
    if (!validation.success) {
      throw ApiError.badRequest('Validation failed', validation.error.flatten().fieldErrors);
    }
    
    const { data, error } = await supabase
      .from('rental_categories')
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
      .from('rental_categories')
      .delete()
      .eq('id', id);
    
    if (error) throw ApiError.internal(error.message);
    return Response.json(successResponse({ id }));
  } catch (error) {
    return handleApiError(error);
  }
}