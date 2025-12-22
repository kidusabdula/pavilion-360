'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cmsQueryKeys, type ListParams } from '@/lib/constants/query-keys';
import { toast } from 'sonner';
import type { UpdateQuoteInput } from '@/lib/schemas/quote.schema';

interface QuoteFilters extends ListParams {
  status?: string;
}

async function fetchQuotes(params?: QuoteFilters) {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set('page', String(params.page));
  if (params?.search) searchParams.set('search', params.search);
  if (params?.status && params.status !== 'all') searchParams.set('status', params.status);
  
  const res = await fetch(`/api/cms/quotes?${searchParams}`);
  if (!res.ok) throw new Error('Failed to fetch quotes');
  return res.json();
}

async function fetchQuote(id: string) {
  const res = await fetch(`/api/cms/quotes/${id}`);
  if (!res.ok) throw new Error('Failed to fetch quote');
  return res.json();
}

async function updateQuote({ id, ...data }: UpdateQuoteInput) {
  const res = await fetch(`/api/cms/quotes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update quote');
  return res.json();
}

export function useQuotes(params?: QuoteFilters) {
  return useQuery({
    queryKey: cmsQueryKeys.quotes.list(params),
    queryFn: () => fetchQuotes(params),
  });
}

export function useQuote(id: string) {
  return useQuery({
    queryKey: cmsQueryKeys.quotes.detail(id),
    queryFn: () => fetchQuote(id),
    enabled: !!id,
  });
}

export function useUpdateQuote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateQuote,
    onSuccess: (_, v) => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.quotes.all });
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.quotes.detail(v.id) });
      toast.success('Quote updated');
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : 'Failed'),
  });
}