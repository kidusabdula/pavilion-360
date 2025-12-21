'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cmsQueryKeys, type ListParams } from '@/lib/constants/query-keys';
import { toast } from 'sonner';
import type { Tables } from '@/lib/supabase/types';
import type { CreateTestimonialInput, UpdateTestimonialInput } from '@/lib/schemas/testimonial.schema';

type Testimonial = Tables<'testimonials'>;
type TestimonialWithPortfolio = Testimonial & {
  portfolio_projects: Tables<'portfolio_projects'> | null;
};

// Fetch functions
async function fetchTestimonials(params?: ListParams) {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set('page', String(params.page));
  if (params?.search) searchParams.set('search', params.search);
  
  const res = await fetch(`/api/cms/testimonials?${searchParams}`);
  if (!res.ok) throw new Error('Failed to fetch testimonials');
  return res.json();
}

async function fetchTestimonial(id: string) {
  const res = await fetch(`/api/cms/testimonials/${id}`);
  if (!res.ok) throw new Error('Failed to fetch testimonial');
  return res.json();
}

async function createTestimonial(data: CreateTestimonialInput) {
  const res = await fetch('/api/cms/testimonials', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Failed to create testimonial');
  }
  return res.json();
}

async function updateTestimonial({ id, ...data }: UpdateTestimonialInput) {
  const res = await fetch(`/api/cms/testimonials/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Failed to update testimonial');
  }
  return res.json();
}

async function deleteTestimonial(id: string) {
  const res = await fetch(`/api/cms/testimonials/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Failed to delete testimonial');
  }
  return res.json();
}

// Hooks
export function useTestimonials(params?: ListParams) {
  return useQuery({
    queryKey: cmsQueryKeys.testimonials.list(params),
    queryFn: () => fetchTestimonials(params),
  });
}

export function useTestimonial(id: string) {
  return useQuery({
    queryKey: cmsQueryKeys.testimonials.detail(id),
    queryFn: () => fetchTestimonial(id),
    enabled: !!id,
  });
}

export function useCreateTestimonial() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.testimonials.all });
      toast.success('Testimonial created successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to create testimonial');
    },
  });
}

export function useUpdateTestimonial() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateTestimonial,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.testimonials.all });
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.testimonials.detail(variables.id) });
      toast.success('Testimonial updated successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update testimonial');
    },
  });
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.testimonials.all });
      toast.success('Testimonial deleted successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to delete testimonial');
    },
  });
}

export function usePortfolioProjects() {
  return useQuery({
    queryKey: ['portfolio-projects-dropdown'],
    queryFn: async () => {
      const res = await fetch('/api/cms/portfolio?limit=100');
      if (!res.ok) throw new Error('Failed to fetch projects');
      return res.json();
    },
  });
}