'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cmsQueryKeys } from '@/lib/constants/query-keys';
import { toast } from 'sonner';
import type { Tables } from '@/lib/supabase/types';
import type { CreateBlogCategoryInput, UpdateBlogCategoryInput } from '@/lib/schemas/blog-category.schema';

type BlogCategory = Tables<'blog_categories'>;

async function fetchBlogCategories() {
  const res = await fetch('/api/cms/blog-categories');
  if (!res.ok) throw new Error('Failed to fetch blog categories');
  return res.json();
}

async function fetchBlogCategory(id: string) {
  const res = await fetch(`/api/cms/blog-categories/${id}`);
  if (!res.ok) throw new Error('Failed to fetch blog category');
  return res.json();
}

async function createBlogCategory(data: CreateBlogCategoryInput) {
  const res = await fetch('/api/cms/blog-categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Failed to create');
  }
  return res.json();
}

async function updateBlogCategory({ id, ...data }: UpdateBlogCategoryInput) {
  const res = await fetch(`/api/cms/blog-categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Failed to update');
  }
  return res.json();
}

async function deleteBlogCategory(id: string) {
  const res = await fetch(`/api/cms/blog-categories/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Failed to delete');
  }
  return res.json();
}

export function useBlogCategories() {
  return useQuery({
    queryKey: cmsQueryKeys.blogCategories.list(),
    queryFn: fetchBlogCategories,
  });
}

export function useBlogCategory(id: string) {
  return useQuery({
    queryKey: cmsQueryKeys.blogCategories.detail(id),
    queryFn: () => fetchBlogCategory(id),
    enabled: !!id,
  });
}

export function useCreateBlogCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBlogCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.blogCategories.all });
      toast.success('Blog category created');
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : 'Failed'),
  });
}

export function useUpdateBlogCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBlogCategory,
    onSuccess: (_, v) => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.blogCategories.all });
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.blogCategories.detail(v.id) });
      toast.success('Blog category updated');
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : 'Failed'),
  });
}

export function useDeleteBlogCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlogCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.blogCategories.all });
      toast.success('Blog category deleted');
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : 'Failed'),
  });
}