import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ApiError, handleApiError, successResponse } from '@/lib/utils/api-error';
import { createFaqCategorySchema } from '@/lib/schemas/faq-category.schema';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('faq_categories')
      .select('*')
      .order('display_order');
    
    if (error) throw ApiError.internal(error.message);
    return Response.json(successResponse(data));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    
    const validation = createFaqCategorySchema.safeParse(body);
    if (!validation.success) {
      throw ApiError.badRequest('Validation failed', validation.error.flatten().fieldErrors);
    }
    
    const { data, error } = await supabase
      .from('faq_categories')
      .insert(validation.data)
      .select()
      .single();
    
    if (error) throw ApiError.internal(error.message);
    return Response.json(successResponse(data), { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}