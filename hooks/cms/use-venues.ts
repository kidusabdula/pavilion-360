'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cmsQueryKeys, type ListParams } from '@/lib/constants/query-keys';
import { toast } from 'sonner';
import type { Tables } from '@/lib/supabase/types';
import type { CreateVenueInput, UpdateVenueInput } from '@/lib/schemas/venue.schema';

type Venue = Tables<'venues'>;

// Fetch functions
async function fetchVenues(params?: ListParams & { city?: string }) {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set('page', String(params.page));
  if (params?.search) searchParams.set('search', params.search);
  if (params?.city && params.city !== 'all') searchParams.set('city', params.city);
  
  const res = await fetch(`/api/cms/venues?${searchParams}`);
  if (!res.ok) throw new Error('Failed to fetch venues');
  return res.json();
}

async function fetchVenue(id: string) {
  const res = await fetch(`/api/cms/venues/${id}`);
  if (!res.ok) throw new Error('Failed to fetch venue');
  return res.json();
}

async function createVenue(data: CreateVenueInput) {
  const res = await fetch('/api/cms/venues', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Failed to create venue');
  }
  return res.json();
}

async function updateVenue({ id, ...data }: UpdateVenueInput) {
  const res = await fetch(`/api/cms/venues/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Failed to update venue');
  }
  return res.json();
}

async function deleteVenue(id: string) {
  const res = await fetch(`/api/cms/venues/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Failed to delete venue');
  }
  return res.json();
}

// Hooks
export function useVenues(params?: ListParams & { city?: string }) {
  return useQuery({
    queryKey: cmsQueryKeys.venues.list(params),
    queryFn: () => fetchVenues(params),
  });
}

export function useVenue(id: string) {
  return useQuery({
    queryKey: cmsQueryKeys.venues.detail(id),
    queryFn: () => fetchVenue(id),
    enabled: !!id,
  });
}

export function useCreateVenue() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createVenue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.venues.all });
      toast.success('Venue created successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to create venue');
    },
  });
}

export function useUpdateVenue() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateVenue,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.venues.all });
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.venues.detail(variables.id) });
      toast.success('Venue updated successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update venue');
    },
  });
}

export function useDeleteVenue() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteVenue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.venues.all });
      toast.success('Venue deleted successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to delete venue');
    },
  });
}