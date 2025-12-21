import { createClient } from '@/lib/supabase/server';
import { handleApiError, successResponse } from '@/lib/utils/api-error';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('faq_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order');
    
    if (error) throw error;
    return Response.json(successResponse(data));
  } catch (error) {
    return handleApiError(error);
  }
}