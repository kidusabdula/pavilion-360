'use client';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/cms/shared/page-header';
import { LoadingSkeleton } from '@/components/cms/shared/loading-skeleton';
import { EventTypeForm } from '@/components/cms/modules/event-types/event-type-form';
import { useEventType, useUpdateEventType } from '@/hooks/cms/use-event-types';
import type { CreateEventTypeInput } from '@/lib/schemas/event-type.schema';

interface EditEventTypePageProps {
  params: Promise<{ id: string }>;
}

export default function EditEventTypePage({ params }: EditEventTypePageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data, isLoading, error } = useEventType(id);
  const updateMutation = useUpdateEventType();
  
  const eventType = data?.data;
  
  const handleSubmit = async (formData: CreateEventTypeInput) => {
    try {
      await updateMutation.mutateAsync({ id, ...formData });
      router.push(`/cms/event-types/${id}`);
    } catch (err) {
      // Error is handled by the mutation
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Loading..."
          breadcrumbs={[
            { label: 'Event Types', href: '/cms/event-types' },
            { label: 'Edit' },
          ]}
        />
        <LoadingSkeleton type="form" />
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
            { label: 'Edit' },
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
    <div className="space-y-8">
      <PageHeader
        title={`Edit: ${eventType.name}`}
        description="Update event type details"
        breadcrumbs={[
          { label: 'Event Types', href: '/cms/event-types' },
          { label: eventType.name, href: `/cms/event-types/${id}` },
          { label: 'Edit' },
        ]}
      />
      
      <div className="flex justify-center">
        <EventTypeForm
          initialData={eventType}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
          isEdit
        />
      </div>
    </div>
  );
}