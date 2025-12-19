// hooks/cms/use-services.ts
// TanStack Query hooks for CMS Services module
'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cmsQueryKeys, type ListParams } from '@/lib/constants/query-keys';
import type { Tables } from '@/lib/supabase/types';
import type { CreateServiceInput, UpdateServiceInput } from '@/lib/schemas/service.schema';

// Types
type Service = Tables<'services'>;
type ServiceWithRelations = Service & {
  use_cases: Tables<'service_use_cases'>[];
  process_steps: Tables<'service_process_steps'>[];
  packages: Tables<'service_packages'>[];
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
async function fetchServices(params?: ListParams): Promise<ApiResponse<Service[]>> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set('page', params.page.toString());
  if (params?.limit) searchParams.set('limit', params.limit.toString());
  if (params?.search) searchParams.set('search', params.search);
  if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
  if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
  
  const response = await fetch(`/api/cms/services?${searchParams.toString()}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to fetch services');
  }
  return response.json();
}

async function fetchService(id: string): Promise<ApiResponse<ServiceWithRelations>> {
  const response = await fetch(`/api/cms/services/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to fetch service');
  }
  return response.json();
}

async function createService(data: CreateServiceInput): Promise<ApiResponse<Service>> {
  const response = await fetch('/api/cms/services', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to create service');
  }
  return response.json();
}

async function updateService({ id, ...data }: UpdateServiceInput): Promise<ApiResponse<Service>> {
  const response = await fetch(`/api/cms/services/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to update service');
  }
  return response.json();
}

async function deleteService(id: string): Promise<ApiResponse<{ deleted: boolean }>> {
  const response = await fetch(`/api/cms/services/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to delete service');
  }
  return response.json();
}

// Hooks
export function useServices(params?: ListParams) {
  return useQuery({
    queryKey: cmsQueryKeys.services.list(params),
    queryFn: () => fetchServices(params),
  });
}

export function useService(id: string) {
  return useQuery({
    queryKey: cmsQueryKeys.services.detail(id),
    queryFn: () => fetchService(id),
    enabled: !!id,
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.services.all });
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateService,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.services.all });
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.services.detail(variables.id) });
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.services.all });
    },
  });
}