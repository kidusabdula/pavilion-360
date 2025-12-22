'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cmsQueryKeys, type ListParams } from '@/lib/constants/query-keys';
import { toast } from 'sonner';
import type { UpdateInquiryInput } from '@/lib/schemas/inquiry.schema';

interface InquiryFilters extends ListParams {
  status?: string;
}

async function fetchInquiries(params?: InquiryFilters) {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set('page', String(params.page));
  if (params?.search) searchParams.set('search', params.search);
  if (params?.status && params.status !== 'all') searchParams.set('status', params.status);
  
  const res = await fetch(`/api/cms/inquiries?${searchParams}`);
  if (!res.ok) throw new Error('Failed to fetch inquiries');
  return res.json();
}

async function fetchInquiry(id: string) {
  const res = await fetch(`/api/cms/inquiries/${id}`);
  if (!res.ok) throw new Error('Failed to fetch inquiry');
  return res.json();
}

async function updateInquiry({ id, ...data }: UpdateInquiryInput) {
  const res = await fetch(`/api/cms/inquiries/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update inquiry');
  return res.json();
}

export function useInquiries(params?: InquiryFilters) {
  return useQuery({
    queryKey: cmsQueryKeys.inquiries.list(params),
    queryFn: () => fetchInquiries(params),
  });
}

export function useInquiry(id: string) {
  return useQuery({
    queryKey: cmsQueryKeys.inquiries.detail(id),
    queryFn: () => fetchInquiry(id),
    enabled: !!id,
  });
}

export function useUpdateInquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateInquiry,
    onSuccess: (_, v) => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.inquiries.all });
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.inquiries.detail(v.id) });
      toast.success('Inquiry updated');
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : 'Failed'),
  });
}