// app/api/public/rental-categories/route.ts
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('rental_categories')
    .select('id, name, slug, description, thumbnail_url')
    .eq('is_active', true)
    .order('display_order', { ascending: true });
  
  if (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
  
  return Response.json({ success: true, data });
}