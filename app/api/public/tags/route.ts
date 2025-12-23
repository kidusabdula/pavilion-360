// app/api/public/tags/route.ts
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  
  // Get only tags that are actually used on rental items
  const { data, error } = await supabase
    .from('tags')
    .select(`
      id,
      name,
      slug,
      rental_item_tags (
        rental_item_id
      )
    `)
    .order('name', { ascending: true });
  
  if (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
  
  // Filter to only tags that have at least one rental item
  const usedTags = (data || [])
    .filter(tag => tag.rental_item_tags && tag.rental_item_tags.length > 0)
    .map(({ id, name, slug }) => ({ id, name, slug }));
  
  return Response.json({ success: true, data: usedTags });
}