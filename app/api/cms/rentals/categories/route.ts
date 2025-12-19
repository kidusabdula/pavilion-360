// app/api/cms/rentals/categories/route.ts
// CMS API for rental categories - GET all
import { createClient } from '@/lib/supabase/server';
import { handleApiError, successResponse } from '@/lib/utils/api-error';

export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('rental_categories')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) {
      throw error;
    }
    
    return Response.json(successResponse(data));
  } catch (error) {
    return handleApiError(error);
  }
}