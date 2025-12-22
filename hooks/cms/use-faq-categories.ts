'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cmsQueryKeys } from '@/lib/constants/query-keys';
import { toast } from 'sonner';
import type { Tables } from '@/lib/supabase/types';
import type { CreateFaqCategoryInput, UpdateFaqCategoryInput } from '@/lib/schemas/faq-category.schema';

type FaqCategory = Tables<'faq_categories'>;

async function fetchFaqCategories() {
  const res = await fetch('/api/cms/faq-categories');
  if (!res.ok) throw new Error('Failed to fetch FAQ categories');
  return res.json();
}

async function fetchFaqCategory(id: string) {
  const res = await fetch(`/api/cms/faq-categories/${id}`);
  if (!res.ok) throw new Error('Failed to fetch FAQ category');
  return res.json();
}

async function createFaqCategory(data: CreateFaqCategoryInput) {
  const res = await fetch('/api/cms/faq-categories', {
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

async function updateFaqCategory({ id, ...data }: UpdateFaqCategoryInput) {
  const res = await fetch(`/api/cms/faq-categories/${id}`, {
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

async function deleteFaqCategory(id: string) {
  const res = await fetch(`/api/cms/faq-categories/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Failed to delete');
  }
  return res.json();
}

export function useFaqCategories() {
  return useQuery({
    queryKey: cmsQueryKeys.faqCategories.list(),
    queryFn: fetchFaqCategories,
  });
}

export function useFaqCategory(id: string) {
  return useQuery({
    queryKey: cmsQueryKeys.faqCategories.detail(id),
    queryFn: () => fetchFaqCategory(id),
    enabled: !!id,
  });
}

export function useCreateFaqCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFaqCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.faqCategories.all });
      toast.success('FAQ category created');
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : 'Failed'),
  });
}

export function useUpdateFaqCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateFaqCategory,
    onSuccess: (_, v) => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.faqCategories.all });
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.faqCategories.detail(v.id) });
      toast.success('FAQ category updated');
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : 'Failed'),
  });
}

export function useDeleteFaqCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFaqCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.faqCategories.all });
      toast.success('FAQ category deleted');
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : 'Failed'),
  });
}