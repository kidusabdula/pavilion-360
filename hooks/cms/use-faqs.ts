'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cmsQueryKeys, type ListParams } from '@/lib/constants/query-keys';
import { toast } from 'sonner';
import type { Tables } from '@/lib/supabase/types';
import type { CreateFaqInput, UpdateFaqInput } from '@/lib/schemas/faq.schema';

type Faq = Tables<'faqs'>;
type FaqWithCategory = Faq & {
  faq_categories: Tables<'faq_categories'> | null;
};

// Fetch functions
async function fetchFaqs(params?: ListParams & { category?: string }) {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set('page', String(params.page));
  if (params?.search) searchParams.set('search', params.search);
  if (params?.category && params.category !== 'all') searchParams.set('category', params.category);
  
  const res = await fetch(`/api/cms/faqs?${searchParams}`);
  if (!res.ok) throw new Error('Failed to fetch FAQs');
  return res.json();
}

async function fetchFaq(id: string) {
  const res = await fetch(`/api/cms/faqs/${id}`);
  if (!res.ok) throw new Error('Failed to fetch FAQ');
  return res.json();
}

async function createFaq(data: CreateFaqInput) {
  const res = await fetch('/api/cms/faqs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Failed to create FAQ');
  }
  return res.json();
}

async function updateFaq({ id, ...data }: UpdateFaqInput) {
  const res = await fetch(`/api/cms/faqs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Failed to update FAQ');
  }
  return res.json();
}

async function deleteFaq(id: string) {
  const res = await fetch(`/api/cms/faqs/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Failed to delete FAQ');
  }
  return res.json();
}

// Hooks
export function useFaqs(params?: ListParams & { category?: string }) {
  return useQuery({
    queryKey: cmsQueryKeys.faqs.list(params),
    queryFn: () => fetchFaqs(params),
  });
}

export function useFaq(id: string) {
  return useQuery({
    queryKey: cmsQueryKeys.faqs.detail(id),
    queryFn: () => fetchFaq(id),
    enabled: !!id,
  });
}

export function useCreateFaq() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createFaq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.faqs.all });
      toast.success('FAQ created successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to create FAQ');
    },
  });
}

export function useUpdateFaq() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateFaq,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.faqs.all });
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.faqs.detail(variables.id) });
      toast.success('FAQ updated successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update FAQ');
    },
  });
}

export function useDeleteFaq() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteFaq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.faqs.all });
      toast.success('FAQ deleted successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to delete FAQ');
    },
  });
}

export function useFaqCategories() {
  return useQuery({
    queryKey: cmsQueryKeys.faqCategories.list(),
    queryFn: async () => {
      const res = await fetch('/api/cms/faqs/categories');
      if (!res.ok) throw new Error('Failed to fetch categories');
      return res.json();
    },
  });
}