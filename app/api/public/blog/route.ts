// app/api/public/blog/route.ts
import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  
  // Optional filters
  const categorySlug = searchParams.get('category');
  const featured = searchParams.get('featured') === 'true';
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      thumbnail_url,
      author_name,
      read_time_minutes,
      published_at,
      is_featured,
      blog_categories (
        id,
        name,
        slug
      )
    `)
    .eq('is_published', true)
    .is('deleted_at', null)
    .order('published_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching blog posts:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
  
  let filteredData = data || [];
  
  // Filter by category
  if (categorySlug && categorySlug !== 'all') {
    filteredData = filteredData.filter(post =>
      post.blog_categories?.slug === categorySlug
    );
  }
  
  // Filter by featured
  if (featured) {
    filteredData = filteredData.filter(post => post.is_featured);
  }
  
  // Apply limit
  if (limit) {
    filteredData = filteredData.slice(0, limit);
  }
  
  return Response.json({ success: true, data: filteredData });
}