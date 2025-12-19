// app/api/public/services/route.ts
// Public API for services - GET all active services
import { createClient } from '@/lib/supabase/server';
import { handleApiError, successResponse } from '@/lib/utils/api-error';

export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('display_order', { ascending: true });
    
    if (error) {
      throw error;
    }
    
    return Response.json(successResponse(data));
  } catch (error) {
    return handleApiError(error);
  }
}