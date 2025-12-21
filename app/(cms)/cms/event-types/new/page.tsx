'use client';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/cms/shared/page-header';
import { EventTypeForm } from '@/components/cms/modules/event-types/event-type-form';
import { useCreateEventType } from '@/hooks/cms/use-event-types';
import type { CreateEventTypeInput } from '@/lib/schemas/event-type.schema';

export default function NewEventTypePage() {
  const router = useRouter();
  const createMutation = useCreateEventType();
  
  const handleSubmit = async (data: CreateEventTypeInput) => {
    try {
      await createMutation.mutateAsync(data);
      router.push('/cms/event-types');
    } catch (err) {
      // Error is handled by the mutation
    }
  };
  
  return (
    <div className="space-y-8">
      <PageHeader
        title="New Event Type"
        description="Add a new event type category"
        breadcrumbs={[
          { label: 'Event Types', href: '/cms/event-types' },
          { label: 'New' },
        ]}
      />
      
      <div className="flex justify-center">
        <EventTypeForm
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending}
        />
      </div>
    </div>
  );
}