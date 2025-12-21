// app/(cms)/cms/team-members/page.tsx
// CMS Team Members list page
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/cms/shared/page-header';
import { DataTable, TableThumbnail } from '@/components/cms/shared/data-table';
import { EmptyState } from '@/components/cms/shared/empty-state';
import { LoadingSkeleton } from '@/components/cms/shared/loading-skeleton';
import { ConfirmDialog } from '@/components/cms/shared/confirm-dialog';
import { StatusBadge } from '@/components/cms/shared/status-badge';
import { useTeamMembers, useDeleteTeamMember } from '@/hooks/cms/use-team-members';
import { toast } from 'sonner';
import type { Tables } from '@/lib/supabase/types';

type TeamMember = Tables<'team_members'>;

export default function TeamMembersPage() {
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);
  
  const { data, isLoading, error } = useTeamMembers();
  const deleteMutation = useDeleteTeamMember();
  
  const teamMembers = (data?.data || []) as TeamMember[];
  
  const handleDelete = async () => {
    if (!deleteTarget) return;
    
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('Team member deleted successfully');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete team member');
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Team Members"
          description="Manage your team"
          breadcrumbs={[{ label: 'Team Members' }]}
        />
        <LoadingSkeleton type="table" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Team Members"
          description="Manage your team"
          breadcrumbs={[{ label: 'Team Members' }]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">Failed to load team members: {error.message}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Members"
        description="Manage your team"
        breadcrumbs={[{ label: 'Team Members' }]}
        actions={
          <Button asChild>
            <Link href="/cms/team-members/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Team Member
            </Link>
          </Button>
        }
      />
      
      {teamMembers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No team members yet"
          description="Get started by adding your first team member."
          action={{ label: 'Add Team Member', href: '/cms/team-members/new' }}
        />
      ) : (
        <DataTable
          data={teamMembers}
          baseUrl="/cms/team-members"
          searchPlaceholder="Search team members..."
          searchKey="name"
          showViewButton
          viewUrl={(member) => `/team-members/${member.id}`}
          onDelete={(member) => setDeleteTarget(member)}
          columns={[
            {
              key: 'image',
              label: '',
              className: 'w-16',
              render: (member) => (
                <TableThumbnail 
                  src={member.image_url} 
                  alt={member.name} 
                  fallback={member.name.charAt(0)} 
                />
              ),
            },
            {
              key: 'name',
              label: 'Member',
              render: (member) => (
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              ),
            },
            {
              key: 'email',
              label: 'Email',
              className: 'hidden md:table-cell',
              render: (member) => (
                <span className="text-muted-foreground">
                  {member.email || '—'}
                </span>
              ),
            },
            {
              key: 'is_active',
              label: 'Status',
              className: 'hidden sm:table-cell',
              render: (member) => (
                <StatusBadge
                  status={member.is_active ? 'active' : 'inactive'}
                />
              ),
            },
          ]}
        />
      )}
      
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Team Member?"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}