'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cmsQueryKeys, type ListParams } from '@/lib/constants/query-keys';
import { toast } from 'sonner';
import type { Tables } from '@/lib/supabase/types';
import type { CreateTeamMemberInput, UpdateTeamMemberInput } from '@/lib/schemas/team-member.schema';

type TeamMember = Tables<'team_members'>;

// Fetch functions
async function fetchTeamMembers(params?: ListParams) {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set('page', String(params.page));
  if (params?.search) searchParams.set('search', params.search);
  
  const res = await fetch(`/api/cms/team-members?${searchParams}`);
  if (!res.ok) throw new Error('Failed to fetch team members');
  return res.json();
}

async function fetchTeamMember(id: string) {
  const res = await fetch(`/api/cms/team-members/${id}`);
  if (!res.ok) throw new Error('Failed to fetch team member');
  return res.json();
}

async function createTeamMember(data: CreateTeamMemberInput) {
  const res = await fetch('/api/cms/team-members', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Failed to create team member');
  }
  return res.json();
}

async function updateTeamMember({ id, ...data }: UpdateTeamMemberInput) {
  const res = await fetch(`/api/cms/team-members/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Failed to update team member');
  }
  return res.json();
}

async function deleteTeamMember(id: string) {
  const res = await fetch(`/api/cms/team-members/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || 'Failed to delete team member');
  }
  return res.json();
}

// Hooks
export function useTeamMembers(params?: ListParams) {
  return useQuery({
    queryKey: cmsQueryKeys.teamMembers.list(params),
    queryFn: () => fetchTeamMembers(params),
  });
}

export function useTeamMember(id: string) {
  return useQuery({
    queryKey: cmsQueryKeys.teamMembers.detail(id),
    queryFn: () => fetchTeamMember(id),
    enabled: !!id,
  });
}

export function useCreateTeamMember() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.teamMembers.all });
      toast.success('Team member created successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to create team member');
    },
  });
}

export function useUpdateTeamMember() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateTeamMember,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.teamMembers.all });
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.teamMembers.detail(variables.id) });
      toast.success('Team member updated successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update team member');
    },
  });
}

export function useDeleteTeamMember() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.teamMembers.all });
      toast.success('Team member deleted successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to delete team member');
    },
  });
}