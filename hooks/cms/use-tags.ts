'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cmsQueryKeys } from '@/lib/constants/query-keys';
import { toast } from 'sonner';
import type { Tables } from '@/lib/supabase/types';
import type { CreateTagInput, UpdateTagInput } from '@/lib/schemas/tag.schema';

type Tag = Tables<'tags'>;

async function fetchTags() {
  const res = await fetch('/api/cms/tags');
  if (!res.ok) throw new Error('Failed to fetch tags');
  return res.json();
}

async function fetchTag(id: string) {
  const res = await fetch(`/api/cms/tags/${id}`);
  if (!res.ok) throw new Error('Failed to fetch tag');
  return res.json();
}

async function createTag(data: CreateTagInput) {
  const res = await fetch('/api/cms/tags', {
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

async function updateTag({ id, ...data }: UpdateTagInput) {
  const res = await fetch(`/api/cms/tags/${id}`, {
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

async function deleteTag(id: string) {
  const res = await fetch(`/api/cms/tags/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Failed to delete');
  }
  return res.json();
}

export function useTags() {
  return useQuery({
    queryKey: cmsQueryKeys.tags.list(),
    queryFn: fetchTags,
  });
}

export function useTag(id: string) {
  return useQuery({
    queryKey: cmsQueryKeys.tags.detail(id),
    queryFn: () => fetchTag(id),
    enabled: !!id,
  });
}

export function useCreateTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.tags.all });
      toast.success('Tag created');
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : 'Failed'),
  });
}

export function useUpdateTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTag,
    onSuccess: (_, v) => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.tags.all });
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.tags.detail(v.id) });
      toast.success('Tag updated');
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : 'Failed'),
  });
}

export function useDeleteTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.tags.all });
      toast.success('Tag deleted');
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : 'Failed'),
  });
}