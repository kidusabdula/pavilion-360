'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cmsQueryKeys } from '@/lib/constants/query-keys';
import { toast } from 'sonner';
import type { Tables } from '@/lib/supabase/types';
import type { CreateRentalCategoryInput, UpdateRentalCategoryInput } from '@/lib/schemas/rental-category.schema';

type RentalCategory = Tables<'rental_categories'>;

async function fetchRentalCategories() {
  const res = await fetch('/api/cms/rental-categories');
  if (!res.ok) throw new Error('Failed to fetch rental categories');
  return res.json();
}

async function fetchRentalCategory(id: string) {
  const res = await fetch(`/api/cms/rental-categories/${id}`);
  if (!res.ok) throw new Error('Failed to fetch rental category');
  return res.json();
}

async function createRentalCategory(data: CreateRentalCategoryInput) {
  const res = await fetch('/api/cms/rental-categories', {
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

async function updateRentalCategory({ id, ...data }: UpdateRentalCategoryInput) {
  const res = await fetch(`/api/cms/rental-categories/${id}`, {
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

async function deleteRentalCategory(id: string) {
  const res = await fetch(`/api/cms/rental-categories/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Failed to delete');
  }
  return res.json();
}

export function useRentalCategories() {
  return useQuery({
    queryKey: cmsQueryKeys.rentalCategories.list(),
    queryFn: fetchRentalCategories,
  });
}

export function useRentalCategory(id: string) {
  return useQuery({
    queryKey: cmsQueryKeys.rentalCategories.detail(id),
    queryFn: () => fetchRentalCategory(id),
    enabled: !!id,
  });
}

export function useCreateRentalCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRentalCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.rentalCategories.all });
      toast.success('Rental category created');
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : 'Failed'),
  });
}

export function useUpdateRentalCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRentalCategory,
    onSuccess: (_, v) => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.rentalCategories.all });
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.rentalCategories.detail(v.id) });
      toast.success('Rental category updated');
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : 'Failed'),
  });
}

export function useDeleteRentalCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRentalCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.rentalCategories.all });
      toast.success('Rental category deleted');
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : 'Failed'),
  });
}