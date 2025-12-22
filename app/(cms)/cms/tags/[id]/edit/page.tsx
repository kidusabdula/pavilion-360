'use client';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/cms/shared/page-header';
import { LoadingSkeleton } from '@/components/cms/shared/loading-skeleton';
import { TagForm } from '@/components/cms/modules/tags/tag-form';
import { useTag, useUpdateTag } from '@/hooks/cms/use-tags';
import type { CreateTagInput } from '@/lib/schemas/tag.schema';

interface EditTagPageProps {
  params: Promise<{ id: string }>;
}

export default function EditTagPage({ params }: EditTagPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data, isLoading, error } = useTag(id);
  const updateMutation = useUpdateTag();
  
  const tag = data?.data;
  
  const handleSubmit = async (formData: CreateTagInput) => {
    try {
      await updateMutation.mutateAsync({ id, ...formData });
      router.push(`/cms/tags/${id}`);
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
            { label: 'Tags', href: '/cms/tags' },
            { label: 'Edit' },
          ]}
        />
        <LoadingSkeleton type="form" />
      </div>
    );
  }
  
  if (error || !tag) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Error"
          breadcrumbs={[
            { label: 'Tags', href: '/cms/tags' },
            { label: 'Edit' },
          ]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">
            {error?.message || 'Tag not found'}
          </p>
          <Button asChild className="mt-4" variant="outline">
            <Link href="/cms/tags">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tags
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <PageHeader
        title={`Edit: ${tag.name}`}
        description="Update tag details"
        breadcrumbs={[
          { label: 'Tags', href: '/cms/tags' },
          { label: tag.name, href: `/cms/tags/${id}` },
          { label: 'Edit' },
        ]}
      />
      
      <div className="flex justify-center">
        <TagForm
          initialData={tag}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
          isEdit
        />
      </div>
    </div>
  );
}