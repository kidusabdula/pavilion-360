// app/(cms)/cms/venues/page.tsx
// CMS Venues list page
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Plus, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/cms/shared/page-header';
import { DataTable, TableThumbnail } from '@/components/cms/shared/data-table';
import { EmptyState } from '@/components/cms/shared/empty-state';
import { LoadingSkeleton } from '@/components/cms/shared/loading-skeleton';
import { ConfirmDialog } from '@/components/cms/shared/confirm-dialog';
import { StatusBadge } from '@/components/cms/shared/status-badge';
import { useVenues, useDeleteVenue } from '@/hooks/cms/use-venues';
import { toast } from 'sonner';
import type { Tables } from '@/lib/supabase/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Venue = Tables<'venues'>;

export default function VenuesPage() {
  const [deleteTarget, setDeleteTarget] = useState<Venue | null>(null);
  const [cityFilter, setCityFilter] = useState<string>('all');
  
  const { data, isLoading, error } = useVenues({ city: cityFilter });
  const deleteMutation = useDeleteVenue();
  
  const venues = (data?.data || []) as Venue[];
  
  // Extract unique cities for filter
  const cities = [...new Set(venues.map(venue => venue.city).filter(Boolean))];
  
  const handleDelete = async () => {
    if (!deleteTarget) return;
    
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('Venue deleted successfully');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete venue');
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Venues"
          description="Manage your venue portfolio"
          breadcrumbs={[{ label: 'Venues' }]}
        />
        <LoadingSkeleton type="table" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Venues"
          description="Manage your venue portfolio"
          breadcrumbs={[{ label: 'Venues' }]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">Failed to load venues: {error.message}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Venues"
        description="Manage your venue portfolio"
        breadcrumbs={[{ label: 'Venues' }]}
        actions={
          <Button asChild>
            <Link href="/cms/venues/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Venue
            </Link>
          </Button>
        }
      />
      
      {/* City Filter */}
      <div className="flex items-center gap-4">
        <Select value={cityFilter} onValueChange={setCityFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {cityFilter !== 'all' && (
          <Button variant="ghost" size="sm" onClick={() => setCityFilter('all')}>
            Clear filter
          </Button>
        )}
      </div>
      
      {venues.length === 0 ? (
        <EmptyState
          icon={Building}
          title="No venues yet"
          description="Get started by adding your first venue."
          action={{ label: 'Add Venue', href: '/cms/venues/new' }}
        />
      ) : (
        <DataTable
          data={venues}
          baseUrl="/cms/venues"
          searchPlaceholder="Search venues..."
          searchKey="name"
          showViewButton
          viewUrl={(venue) => `/venues/${venue.slug}`}
          onDelete={(venue) => setDeleteTarget(venue)}
          columns={[
            {
              key: 'thumbnail',
              label: '',
              className: 'w-16',
              render: (venue) => (
                <TableThumbnail
                  src={venue.thumbnail_url}
                  alt={venue.name}
                  fallback={venue.name.charAt(0)}
                />
              ),
            },
            {
              key: 'name',
              label: 'Name',
              render: (venue) => (
                <div>
                  <p className="font-medium">{venue.name}</p>
                  <p className="text-xs text-muted-foreground">{venue.city || venue.slug}</p>
                </div>
              ),
            },
            {
              key: 'capacity',
              label: 'Capacity',
              className: 'hidden md:table-cell',
              render: (venue) => (
                <span className="text-muted-foreground">
                  {venue.capacity_min && venue.capacity_max 
                    ? `${venue.capacity_min} - ${venue.capacity_max}`
                    : venue.capacity_max ? `Up to ${venue.capacity_max}` : '—'}
                </span>
              ),
            },
            {
              key: 'is_managed',
              label: 'Managed',
              className: 'hidden lg:table-cell',
              render: (venue) => (
                <StatusBadge
                  status={venue.is_managed ? 'featured' : 'draft'}
                />
              ),
            },
            {
              key: 'is_active',
              label: 'Status',
              className: 'hidden sm:table-cell',
              render: (venue) => (
                <StatusBadge
                  status={venue.is_active ? 'active' : 'inactive'}
                />
              ),
            },
          ]}
        />
      )}
      
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Venue?"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}