// app/(cms)/cms/services/new/page.tsx
// CMS Create Service page
'use client';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/cms/shared/page-header';
import { ServiceForm } from '@/components/cms/modules/services/service-form';
import { useCreateService } from '@/hooks/cms/use-services';
import { toast } from 'sonner';
import type { CreateServiceInput } from '@/lib/schemas/service.schema';

export default function NewServicePage() {
  const router = useRouter();
  const createMutation = useCreateService();
  
  const handleSubmit = async (data: CreateServiceInput) => {
    try {
      await createMutation.mutateAsync(data);
      toast.success('Service created successfully');
      router.push('/cms/services');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create service');
    }
  };
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="New Service"
        description="Create a new service offering"
        breadcrumbs={[
          { label: 'Services', href: '/cms/services' },
          { label: 'New' },
        ]}
      />
      
      <ServiceForm
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending}
      />
    </div>
  );
}