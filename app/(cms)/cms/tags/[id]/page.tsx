'use client';
import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/cms/shared/page-header';
import { LoadingSkeleton } from '@/components/cms/shared/loading-skeleton';
import { useTag } from '@/hooks/cms/use-tags';

interface TagPageProps {
  params: Promise<{ id: string }>;
}

export default function TagPage({ params }: TagPageProps) {
  const { id } = use(params);
  const { data, isLoading, error } = useTag(id);
  
  const tag = data?.data;
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Loading..."
          breadcrumbs={[
            { label: 'Tags', href: '/cms/tags' },
            { label: 'Detail' },
          ]}
        />
        <LoadingSkeleton type="detail" />
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
            { label: 'Detail' },
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
    <div className="space-y-6">
      <PageHeader
        title={tag.name}
        breadcrumbs={[
          { label: 'Tags', href: '/cms/tags' },
          { label: tag.name },
        ]}
        actions={
          <Button asChild>
            <Link href={`/cms/tags/${tag.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        }
      />
      
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Tag Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                <p className="font-medium">{tag.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Slug</h3>
                <p className="font-mono">{tag.slug}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Metadata */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Metadata</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>
                  {new Date(tag.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}