// app/api/public/rentals/route.ts
import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  
  // Optional filters
  const categorySlug = searchParams.get('category');
  const eventTypeSlug = searchParams.get('eventType');
  const tagSlug = searchParams.get('tag');
  const popular = searchParams.get('popular') === 'true';
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
  
  let query = supabase
    .from('rental_items')
    .select(`
      id,
      name,
      slug,
      sku,
      subcategory,
      thumbnail_url,
      short_description,
      details,
      specs,
      is_popular,
      display_order,
      rental_categories!inner (
        id,
        name,
        slug
      ),
      rental_item_event_types (
        event_types (
          id,
          name,
          slug
        )
      ),
      rental_item_tags (
        tags (
          id,
          name,
          slug
        )
      )
    `)
    .eq('is_active', true)
    .is('deleted_at', null)
    .order('display_order', { ascending: true });
  
  // Apply category filter
  if (categorySlug) {
    query = query.eq('rental_categories.slug', categorySlug);
  }
  
  // Apply popular filter
  if (popular) {
    query = query.eq('is_popular', true);
  }
  
  // Apply limit
  if (limit) {
    query = query.limit(limit);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching rental items:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
  
  // Post-process for event type and tag filtering (if needed)
  let filteredData = data || [];
  
  if (eventTypeSlug) {
    filteredData = filteredData.filter(item =>
      item.rental_item_event_types?.some(
        (riet: any) => riet.event_types?.slug === eventTypeSlug
      )
    );
  }
  
  if (tagSlug) {
    filteredData = filteredData.filter(item =>
      item.rental_item_tags?.some(
        (rit: any) => rit.tags?.slug === tagSlug
      )
    );
  }
  
  return Response.json({ success: true, data: filteredData });
}