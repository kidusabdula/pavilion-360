// components/blog/blog-content.tsx
import { BlogClientView } from './blog-client-view';
import { adaptDbPostsToPosts } from '@/lib/utils/blog-adapter';

async function getPosts() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const res = await fetch(`${baseUrl}/api/public/blog`, {
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) {
    console.error('Failed to fetch blog posts');
    return [];
  }
  
  const { data } = await res.json();
  return adaptDbPostsToPosts(data || []);
}

async function getCategories() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const res = await fetch(`${baseUrl}/api/public/blog-categories`, {
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) return [];
  const { data } = await res.json();
  return data || [];
}

export async function BlogContent() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories(),
  ]);
  
  return (
    <BlogClientView
      initialPosts={posts}
      categories={categories}
    />
  );
}