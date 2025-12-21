'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cmsQueryKeys, type ListParams } from '@/lib/constants/query-keys';
import { toast } from 'sonner';
import type { Tables } from '@/lib/supabase/types';
import type { CreateBlogInput, UpdateBlogInput } from '@/lib/schemas/blog.schema';

type BlogPost = Tables<'blog_posts'>;
type BlogPostWithCategory = BlogPost & {
  blog_categories: Tables<'blog_categories'> | null;
};

// Fetch functions
async function fetchBlogPosts(params?: ListParams & { category?: string }) {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set('page', String(params.page));
  if (params?.search) searchParams.set('search', params.search);
  if (params?.category && params.category !== 'all') searchParams.set('category', params.category);
  
  const res = await fetch(`/api/cms/blog?${searchParams}`);
  if (!res.ok) throw new Error('Failed to fetch blog posts');
  return res.json();
}

async function fetchBlogPost(id: string) {
  const res = await fetch(`/api/cms/blog/${id}`);
  if (!res.ok) throw new Error('Failed to fetch blog post');
  return res.json();
}

async function createBlogPost(data: CreateBlogInput) {
  const res = await fetch('/api/cms/blog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Failed to create blog post');
  }
  return res.json();
}

async function updateBlogPost({ id, ...data }: UpdateBlogInput) {
  const res = await fetch(`/api/cms/blog/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Failed to update blog post');
  }
  return res.json();
}

async function deleteBlogPost(id: string) {
  const res = await fetch(`/api/cms/blog/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Failed to delete blog post');
  }
  return res.json();
}

// Hooks
export function useBlogPosts(params?: ListParams & { category?: string }) {
  return useQuery({
    queryKey: cmsQueryKeys.blog.list(params),
    queryFn: () => fetchBlogPosts(params),
  });
}

export function useBlogPost(id: string) {
  return useQuery({
    queryKey: cmsQueryKeys.blog.detail(id),
    queryFn: () => fetchBlogPost(id),
    enabled: !!id,
  });
}

export function useCreateBlogPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.blog.all });
      toast.success('Blog post created successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to create blog post');
    },
  });
}

export function useUpdateBlogPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateBlogPost,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.blog.all });
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.blog.detail(variables.id) });
      toast.success('Blog post updated successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update blog post');
    },
  });
}

export function useDeleteBlogPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.blog.all });
      toast.success('Blog post deleted successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to delete blog post');
    },
  });
}

export function useBlogCategories() {
  return useQuery({
    queryKey: cmsQueryKeys.blogCategories.list(),
    queryFn: async () => {
      const res = await fetch('/api/cms/blog/categories');
      if (!res.ok) throw new Error('Failed to fetch categories');
      return res.json();
    },
  });
}