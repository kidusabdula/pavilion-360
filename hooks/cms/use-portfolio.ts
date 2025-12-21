import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cmsQueryKeys, type ListParams } from '@/lib/constants/query-keys';
import { toast } from 'sonner';
import type { Tables } from '@/lib/supabase/types';
import type { CreatePortfolioInput, UpdatePortfolioInput } from '@/lib/schemas/portfolio.schema';

type Portfolio = Tables<'portfolio_projects'>;
type PortfolioWithEventType = Portfolio & {
  event_types: Tables<'event_types'> | null;
};

// List all portfolio projects
export function usePortfolio(params?: ListParams & { event_type?: string }) {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set('page', String(params.page));
  if (params?.search) searchParams.set('search', params.search);
  if (params?.event_type && params.event_type !== 'all') searchParams.set('event_type', params.event_type);
  
  return useQuery({
    queryKey: cmsQueryKeys.portfolio.list(params),
    queryFn: async () => {
      const res = await fetch(`/api/cms/portfolio?${searchParams}`);
      if (!res.ok) throw new Error('Failed to fetch portfolio projects');
      return res.json();
    },
  });
}

// Get single portfolio project
export function usePortfolioProject(id: string) {
  return useQuery({
    queryKey: cmsQueryKeys.portfolio.detail(id),
    queryFn: async () => {
      const res = await fetch(`/api/cms/portfolio/${id}`);
      if (!res.ok) throw new Error('Failed to fetch portfolio project');
      return res.json();
    },
  });
}

// Create portfolio project
export function useCreatePortfolio() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreatePortfolioInput) => {
      const res = await fetch('/api/cms/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error?.message || 'Failed to create portfolio project');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.portfolio.all });
      toast.success('Portfolio project created successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to create portfolio project');
    },
  });
}

// Update portfolio project
export function useUpdatePortfolio() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: UpdatePortfolioInput) => {
      const res = await fetch(`/api/cms/portfolio/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error?.message || 'Failed to update portfolio project');
      }
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.portfolio.all });
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.portfolio.detail(data.id) });
      toast.success('Portfolio project updated successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update portfolio project');
    },
  });
}

// Delete portfolio project
export function useDeletePortfolio() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/cms/portfolio/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error?.message || 'Failed to delete portfolio project');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.portfolio.all });
      toast.success('Portfolio project deleted successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to delete portfolio project');
    },
  });
}

// Get event types for dropdown
export function useEventTypes() {
  return useQuery({
    queryKey: ['event-types'],
    queryFn: async () => {
      const res = await fetch('/api/cms/event-types');
      if (!res.ok) throw new Error('Failed to fetch event types');
      return res.json();
    },
  });
}