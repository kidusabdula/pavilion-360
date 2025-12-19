// app/(cms)/cms/services/page.tsx
// CMS Services list page
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
import { useServices, useDeleteService } from '@/hooks/cms/use-services';
import { toast } from 'sonner';
import type { Tables } from '@/lib/supabase/types';

type Service = Tables<'services'>;

export default function ServicesPage() {
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
  const { data, isLoading, error } = useServices();
  const deleteMutation = useDeleteService();
  
  const services = data?.data || [];
  
  const handleDelete = async () => {
    if (!deleteTarget) return;
    
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('Service deleted successfully');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete service');
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Services"
          description="Manage your service offerings"
          breadcrumbs={[{ label: 'Services' }]}
        />
        <LoadingSkeleton type="table" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Services"
          description="Manage your service offerings"
          breadcrumbs={[{ label: 'Services' }]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">Failed to load services: {error.message}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Services"
        description="Manage your service offerings"
        breadcrumbs={[{ label: 'Services' }]}
        actions={
          <Button asChild>
            <Link href="/cms/services/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Link>
          </Button>
        }
      />
      
      {services.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No services yet"
          description="Get started by creating your first service."
          action={{ label: 'Add Service', href: '/cms/services/new' }}
        />
      ) : (
        <DataTable
          data={services}
          baseUrl="/cms/services"
          searchPlaceholder="Search services..."
          searchKey="name"
          showViewButton
          viewUrl={(service) => `/services/${service.slug}`}
          onDelete={(service) => setDeleteTarget(service)}
          columns={[
            {
              key: 'thumbnail',
              label: '',
              className: 'w-16',
              render: (service) => (
                <TableThumbnail
                  src={service.thumbnail_url}
                  alt={service.name}
                  fallback={service.name.charAt(0)}
                />
              ),
            },
            {
              key: 'name',
              label: 'Name',
              render: (service) => (
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-xs text-muted-foreground">{service.slug}</p>
                </div>
              ),
            },
            {
              key: 'tagline',
              label: 'Tagline',
              className: 'hidden md:table-cell max-w-xs',
              render: (service) => (
                <p className="truncate text-muted-foreground">
                  {service.tagline || '—'}
                </p>
              ),
            },
            {
              key: 'is_active',
              label: 'Status',
              className: 'hidden sm:table-cell',
              render: (service) => (
                <StatusBadge
                  status={service.is_active ? 'active' : 'inactive'}
                />
              ),
            },
            {
              key: 'view_count',
              label: 'Views',
              className: 'hidden lg:table-cell text-right',
              render: (service) => (
                <span className="text-muted-foreground">
                  {service.view_count?.toLocaleString() || 0}
                </span>
              ),
            },
          ]}
        />
      )}
      
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Service?"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}