// hooks/cms/use-rentals.ts
// TanStack Query hooks for CMS Rentals module
'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cmsQueryKeys, type ListParams } from '@/lib/constants/query-keys';
import type { Tables } from '@/lib/supabase/types';
import type { CreateRentalInput, UpdateRentalInput } from '@/lib/schemas/rental.schema';

// Types
type Rental = Tables<'rental_items'>;
type RentalWithCategory = Rental & {
  rental_categories: Tables<'rental_categories'>;
};

interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  error?: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

// Fetch functions
async function fetchRentals(params?: ListParams): Promise<ApiResponse<RentalWithCategory[]>> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set('page', params.page.toString());
  if (params?.limit) searchParams.set('limit', params.limit.toString());
  if (params?.search) searchParams.set('search', params.search);
  if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
  if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
  if (params?.category) searchParams.set('category', params.category);
  if (params?.featured !== undefined) searchParams.set('featured', params.featured.toString());
  
  const response = await fetch(`/api/cms/rentals?${searchParams.toString()}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to fetch rentals');
  }
  return response.json();
}

async function fetchRental(id: string): Promise<ApiResponse<RentalWithCategory>> {
  const response = await fetch(`/api/cms/rentals/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to fetch rental');
  }
  return response.json();
}

async function createRental(data: CreateRentalInput): Promise<ApiResponse<Rental>> {
  const response = await fetch('/api/cms/rentals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to create rental');
  }
  return response.json();
}

async function updateRental({ id, ...data }: UpdateRentalInput): Promise<ApiResponse<Rental>> {
  const response = await fetch(`/api/cms/rentals/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to update rental');
  }
  return response.json();
}

async function deleteRental(id: string): Promise<ApiResponse<{ deleted: boolean }>> {
  const response = await fetch(`/api/cms/rentals/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to delete rental');
  }
  return response.json();
}

async function fetchCategories(): Promise<ApiResponse<Tables<'rental_categories'>[]>> {
  const response = await fetch('/api/cms/rentals/categories');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to fetch categories');
  }
  return response.json();
}

// Hooks
export function useRentals(params?: ListParams) {
  return useQuery({
    queryKey: cmsQueryKeys.rentals.list(params),
    queryFn: () => fetchRentals(params),
  });
}

export function useRental(id: string) {
  return useQuery({
    queryKey: cmsQueryKeys.rentals.detail(id),
    queryFn: () => fetchRental(id),
    enabled: !!id,
  });
}

export function useCreateRental() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createRental,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.rentals.all });
    },
  });
}

export function useUpdateRental() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateRental,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.rentals.all });
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.rentals.detail(variables.id) });
    },
  });
}

export function useDeleteRental() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteRental,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.rentals.all });
    },
  });
}

export function useRentalCategories() {
  return useQuery({
    queryKey: cmsQueryKeys.rentals.categories(),
    queryFn: fetchCategories,
  });
}