'use client';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/cms/shared/page-header';
import { TagForm } from '@/components/cms/modules/tags/tag-form';
import { useCreateTag } from '@/hooks/cms/use-tags';
import type { CreateTagInput } from '@/lib/schemas/tag.schema';

export default function NewTagPage() {
  const router = useRouter();
  const createMutation = useCreateTag();
  
  const handleSubmit = async (data: CreateTagInput) => {
    try {
      await createMutation.mutateAsync(data);
      router.push('/cms/tags');
    } catch (err) {
      // Error is handled by the mutation
    }
  };
  
  return (
    <div className="space-y-8">
      <PageHeader
        title="New Tag"
        description="Add a new content tag"
        breadcrumbs={[
          { label: 'Tags', href: '/cms/tags' },
          { label: 'New' },
        ]}
      />
      
      <div className="flex justify-center">
        <TagForm
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending}
        />
      </div>
    </div>
  );
}