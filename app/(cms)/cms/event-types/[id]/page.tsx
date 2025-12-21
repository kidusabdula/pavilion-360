'use client';
import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Edit, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/cms/shared/page-header';
import { LoadingSkeleton } from '@/components/cms/shared/loading-skeleton';
import { StatusBadge } from '@/components/cms/shared/status-badge';
import { useEventType } from '@/hooks/cms/use-event-types';

interface EventTypePageProps {
  params: Promise<{ id: string }>;
}

export default function EventTypePage({ params }: EventTypePageProps) {
  const { id } = use(params);
  const { data, isLoading, error } = useEventType(id);
  
  const eventType = data?.data;
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Loading..."
          breadcrumbs={[
            { label: 'Event Types', href: '/cms/event-types' },
            { label: 'Detail' },
          ]}
        />
        <LoadingSkeleton type="detail" />
      </div>
    );
  }
  
  if (error || !eventType) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Error"
          breadcrumbs={[
            { label: 'Event Types', href: '/cms/event-types' },
            { label: 'Detail' },
          ]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">
            {error?.message || 'Event type not found'}
          </p>
          <Button asChild className="mt-4" variant="outline">
            <Link href="/cms/event-types">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Event Types
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <PageHeader
        title={eventType.name}
        description={eventType.description || undefined}
        breadcrumbs={[
          { label: 'Event Types', href: '/cms/event-types' },
          { label: eventType.name },
        ]}
        actions={
          <Button asChild>
            <Link href={`/cms/event-types/${eventType.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        }
      />
      
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Description */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Description</h2>
            <p className="whitespace-pre-wrap text-muted-foreground">
              {eventType.description || 'No description provided.'}
            </p>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Visibility</span>
                <StatusBadge status={eventType.is_active ? 'active' : 'inactive'} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Display Order</span>
                <span className="font-medium">{eventType.display_order}</span>
              </div>
            </div>
          </div>
          
          {/* Metadata */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Metadata</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Slug</span>
                <span className="font-mono">{eventType.slug}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>
                  {new Date(eventType.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated</span>
                <span>
                  {new Date(eventType.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}