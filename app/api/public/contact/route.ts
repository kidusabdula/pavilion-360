import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ApiError, handleApiError, successResponse } from '@/lib/utils/api-error';
import { createInquirySchema } from '@/lib/schemas/inquiry.schema';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    
    const validation = createInquirySchema.safeParse(body);
    if (!validation.success) {
      throw ApiError.badRequest('Validation failed', validation.error.flatten().fieldErrors);
    }
    
    const { data, error } = await supabase
      .from('inquiries')
      .insert({ ...validation.data, status: 'new' })
      .select()
      .single();
    
    if (error) throw ApiError.internal(error.message);
    return Response.json(successResponse(data), { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}