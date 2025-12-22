'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Plus, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/cms/shared/page-header';
import { DataTable } from '@/components/cms/shared/data-table';
import { EmptyState } from '@/components/cms/shared/empty-state';
import { LoadingSkeleton } from '@/components/cms/shared/loading-skeleton';
import { ConfirmDialog } from '@/components/cms/shared/confirm-dialog';
import { useTags, useDeleteTag } from '@/hooks/cms/use-tags';
import type { Tables } from '@/lib/supabase/types';

type Tag = Tables<'tags'>;

export default function TagsPage() {
  const [deleteTarget, setDeleteTarget] = useState<Tag | null>(null);
  
  const { data, isLoading, error } = useTags();
  const deleteMutation = useDeleteTag();
  
  const tags = (data?.data || []) as Tag[];
  
  const handleDelete = async () => {
    if (!deleteTarget) return;
    
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Tags"
          description="Manage content tags"
          breadcrumbs={[{ label: 'Tags' }]}
        />
        <LoadingSkeleton type="table" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Tags"
          description="Manage content tags"
          breadcrumbs={[{ label: 'Tags' }]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">Failed to load tags: {error.message}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Tags"
        description="Manage content tags"
        breadcrumbs={[{ label: 'Tags' }]}
        actions={
          <Button asChild>
            <Link href="/cms/tags/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Tag
            </Link>
          </Button>
        }
      />
      
      {tags.length === 0 ? (
        <EmptyState
          icon={Tag}
          title="No tags yet"
          description="Get started by adding your first tag."
          action={{ label: 'Add Tag', href: '/cms/tags/new' }}
        />
      ) : (
        <DataTable
          data={tags}
          baseUrl="/cms/tags"
          searchPlaceholder="Search tags..."
          searchKey="name"
          onDelete={(tag) => setDeleteTarget(tag)}
          columns={[
            {
              key: 'name',
              label: 'Tag Name',
              render: (tag) => (
                <div>
                  <p className="font-medium">{tag.name}</p>
                  <p className="text-xs text-muted-foreground">{tag.slug}</p>
                </div>
              ),
            },
            {
              key: 'created_at',
              label: 'Created',
              className: 'hidden md:table-cell',
              render: (tag) => new Date(tag.created_at).toLocaleDateString(),
            },
          ]}
        />
      )}
      
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Tag?"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}