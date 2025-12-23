// app/api/public/blog-categories/route.ts
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('blog_categories')
    .select('id, name, slug, display_order')
    .eq('is_active', true)
    .order('display_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching blog categories:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
  
  return Response.json({ success: true, data: data || [] });
}