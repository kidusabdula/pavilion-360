'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cmsQueryKeys } from '@/lib/constants/query-keys';
import { toast } from 'sonner';
import type { Tables } from '@/lib/supabase/types';
import type { CreateEventTypeInput, UpdateEventTypeInput } from '@/lib/schemas/event-type.schema';

type EventType = Tables<'event_types'>;

async function fetchEventTypes() {
  const res = await fetch('/api/cms/event-types');
  if (!res.ok) throw new Error('Failed to fetch event types');
  return res.json();
}

async function fetchEventType(id: string) {
  const res = await fetch(`/api/cms/event-types/${id}`);
  if (!res.ok) throw new Error('Failed to fetch event type');
  return res.json();
}

async function createEventType(data: CreateEventTypeInput) {
  const res = await fetch('/api/cms/event-types', {
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

async function updateEventType({ id, ...data }: UpdateEventTypeInput) {
  const res = await fetch(`/api/cms/event-types/${id}`, {
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

async function deleteEventType(id: string) {
  const res = await fetch(`/api/cms/event-types/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Failed to delete');
  }
  return res.json();
}

export function useEventTypes() {
  return useQuery({
    queryKey: cmsQueryKeys.eventTypes.list(),
    queryFn: fetchEventTypes,
  });
}

export function useEventType(id: string) {
  return useQuery({
    queryKey: cmsQueryKeys.eventTypes.detail(id),
    queryFn: () => fetchEventType(id),
    enabled: !!id,
  });
}

export function useCreateEventType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEventType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.eventTypes.all });
      toast.success('Event type created');
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : 'Failed'),
  });
}

export function useUpdateEventType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEventType,
    onSuccess: (_, v) => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.eventTypes.all });
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.eventTypes.detail(v.id) });
      toast.success('Event type updated');
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : 'Failed'),
  });
}

export function useDeleteEventType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEventType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.eventTypes.all });
      toast.success('Event type deleted');
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : 'Failed'),
  });
}