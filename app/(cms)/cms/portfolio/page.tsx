// app/(cms)/cms/portfolio/page.tsx
// CMS Portfolio list page
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Plus, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/cms/shared/page-header';
import { DataTable, TableThumbnail } from '@/components/cms/shared/data-table';
import { EmptyState } from '@/components/cms/shared/empty-state';
import { LoadingSkeleton } from '@/components/cms/shared/loading-skeleton';
import { ConfirmDialog } from '@/components/cms/shared/confirm-dialog';
import { StatusBadge } from '@/components/cms/shared/status-badge';
import { usePortfolio, useDeletePortfolio, useEventTypes } from '@/hooks/cms/use-portfolio';
import { toast } from 'sonner';
import type { Tables } from '@/lib/supabase/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Portfolio = Tables<'portfolio_projects'>;
type PortfolioWithEventType = Portfolio & {
  event_types: Tables<'event_types'> | null;
};

export default function PortfolioPage() {
  const [deleteTarget, setDeleteTarget] = useState<PortfolioWithEventType | null>(null);
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('all');
  
  const { data, isLoading, error } = usePortfolio({ event_type: eventTypeFilter });
  const { data: eventTypesData } = useEventTypes();
  const deleteMutation = useDeletePortfolio();
  
  const projects = (data?.data || []) as PortfolioWithEventType[];
  const eventTypes = eventTypesData?.data || [];
  
  const handleDelete = async () => {
    if (!deleteTarget) return;
    
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('Portfolio project deleted successfully');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete portfolio project');
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Portfolio"
          description="Manage your portfolio projects"
          breadcrumbs={[{ label: 'Portfolio' }]}
        />
        <LoadingSkeleton type="table" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Portfolio"
          description="Manage your portfolio projects"
          breadcrumbs={[{ label: 'Portfolio' }]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">Failed to load portfolio projects: {error.message}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Portfolio"
        description="Manage your portfolio projects"
        breadcrumbs={[{ label: 'Portfolio' }]}
        actions={
          <Button asChild>
            <Link href="/cms/portfolio/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Link>
          </Button>
        }
      />
      
      {/* Event Type Filter */}
      <div className="flex items-center gap-4">
        <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Event Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Event Types</SelectItem>
            {eventTypes.map((eventType) => (
              <SelectItem key={eventType.id} value={eventType.id}>
                {eventType.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {eventTypeFilter !== 'all' && (
          <Button variant="ghost" size="sm" onClick={() => setEventTypeFilter('all')}>
            Clear filter
          </Button>
        )}
      </div>
      
      {projects.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No portfolio projects yet"
          description="Get started by adding your first project."
          action={{ label: 'Add Project', href: '/cms/portfolio/new' }}
        />
      ) : (
        <DataTable
          data={projects}
          baseUrl="/cms/portfolio"
          searchPlaceholder="Search projects..."
          searchKey="title"
          showViewButton
          viewUrl={(project) => `/portfolio/${project.slug}`}
          onDelete={(project) => setDeleteTarget(project)}
          columns={[
            {
              key: 'thumbnail',
              label: '',
              className: 'w-16',
              render: (project) => (
                <TableThumbnail
                  src={project.thumbnail_url}
                  alt={project.title}
                  fallback={project.title.charAt(0)}
                />
              ),
            },
            {
              key: 'title',
              label: 'Title',
              render: (project) => (
                <div>
                  <p className="font-medium">{project.title}</p>
                  <p className="text-xs text-muted-foreground">{project.slug}</p>
                </div>
              ),
            },
            {
              key: 'event_type',
              label: 'Event Type',
              className: 'hidden md:table-cell',
              render: (project) => (
                <span className="text-muted-foreground">
                  {project.event_types?.name || '—'}
                </span>
              ),
            },
            {
              key: 'event_date',
              label: 'Date',
              className: 'hidden lg:table-cell',
              render: (project) => (
                <span className="text-muted-foreground">
                  {project.event_date ? new Date(project.event_date).toLocaleDateString() : '—'}
                </span>
              ),
            },
            {
              key: 'is_active',
              label: 'Status',
              className: 'hidden sm:table-cell',
              render: (project) => (
                <StatusBadge
                  status={project.is_active ? 'active' : 'inactive'}
                />
              ),
            },
            {
              key: 'is_featured',
              label: 'Featured',
              className: 'hidden lg:table-cell',
              render: (project) => (
                <StatusBadge
                  status={project.is_featured ? 'featured' : 'draft'}
                />
              ),
            },
          ]}
        />
      )}
      
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Project?"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}