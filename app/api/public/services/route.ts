// app/api/public/services/route.ts
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('services')
    .select(`
      id,
      name,
      slug,
      tagline,
      description,
      icon,
      thumbnail_url,
      what_we_do,
      display_order,
      service_use_cases (
        id,
        title,
        description,
        image_url,
        display_order
      )
    `)
    .eq('is_active', true)
    .is('deleted_at', null)
    .order('display_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching services:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
  
  return Response.json({ success: true, data });
}