// app/api/public/blog/[slug]/route.ts
import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

type Params = { params: Promise<{ slug: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const { slug } = await params;
  const supabase = await createClient();
  
  // Fetch blog post with full content
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      content,
      thumbnail_url,
      author_name,
      read_time_minutes,
      published_at,
      is_featured,
      seo_title,
      seo_description,
      seo_image_url,
      blog_categories (
        id,
        name,
        slug
      ),
      blog_post_tags (
        tags (
          id,
          name,
          slug
        )
      )
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .is('deleted_at', null)
    .single();
  
  if (error || !post) {
    return Response.json(
      { success: false, error: 'Blog post not found' },
      { status: 404 }
    );
  }
  
  // Increment view count (fire and forget)
  supabase
    .from('blog_posts')
    .update({ view_count: (post as any).view_count + 1 })
    .eq('id', post.id)
    .then(() => {});
  
  // Get related posts from same category
  const { data: relatedPosts } = await supabase
    .from('blog_posts')
    .select(`
      id,
      title,
      slug,
      thumbnail_url,
      published_at,
      read_time_minutes,
      blog_categories (
        name
      )
    `)
    .neq('id', post.id)
    .eq('is_published', true)
    .is('deleted_at', null)
    .order('published_at', { ascending: false })
    .limit(3);
  
  return Response.json({
    success: true,
    data: {
      ...post,
      relatedPosts: relatedPosts || [],
    },
  });
}