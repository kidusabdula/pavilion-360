// lib/utils/blog-adapter.ts
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail: string;
  category: string;
  categorySlug: string;
  author: string;
  readTime: string;
  date: string;
  isFeatured: boolean;
}

export interface BlogPostDetail extends BlogPost {
  content: any; // TipTap JSON
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
}

interface DbBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content?: any;
  thumbnail_url: string | null;
  author_name: string;
  read_time_minutes: number | null;
  published_at: string | null;
  is_featured: boolean;
  seo_title?: string | null;
  seo_description?: string | null;
  seo_image_url?: string | null;
  blog_categories: {
    id: string;
    name: string;
    slug: string;
  } | null;
  blog_post_tags?: Array<{
    tags: {
      id: string;
      name: string;
      slug: string;
    } | null;
  }>;
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function adaptDbPostToPost(dbPost: DbBlogPost): BlogPost {
  return {
    id: dbPost.id,
    title: dbPost.title,
    slug: dbPost.slug,
    excerpt: dbPost.excerpt || '',
    thumbnail: dbPost.thumbnail_url || '/placeholder.svg',
    category: dbPost.blog_categories?.name || 'Uncategorized',
    categorySlug: dbPost.blog_categories?.slug || 'uncategorized',
    author: dbPost.author_name,
    readTime: dbPost.read_time_minutes ? `${dbPost.read_time_minutes} min read` : '',
    date: formatDate(dbPost.published_at),
    isFeatured: dbPost.is_featured,
  };
}

export function adaptDbPostToPostDetail(dbPost: DbBlogPost): BlogPostDetail {
  const base = adaptDbPostToPost(dbPost);
  
  const tags = (dbPost.blog_post_tags || [])
    .map(bpt => bpt.tags?.name)
    .filter(Boolean) as string[];
  
  return {
    ...base,
    content: dbPost.content || {},
    tags,
    seoTitle: dbPost.seo_title || undefined,
    seoDescription: dbPost.seo_description || undefined,
    seoImage: dbPost.seo_image_url || undefined,
  };
}

export function adaptDbPostsToPosts(dbPosts: DbBlogPost[]): BlogPost[] {
  return dbPosts.map(adaptDbPostToPost);
}