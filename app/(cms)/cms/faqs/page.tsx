// app/(cms)/cms/faqs/page.tsx
// CMS FAQs list page
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Plus, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/cms/shared/page-header';
import { DataTable } from '@/components/cms/shared/data-table';
import { EmptyState } from '@/components/cms/shared/empty-state';
import { LoadingSkeleton } from '@/components/cms/shared/loading-skeleton';
import { ConfirmDialog } from '@/components/cms/shared/confirm-dialog';
import { StatusBadge } from '@/components/cms/shared/status-badge';
import { useFaqs, useDeleteFaq, useFaqCategories } from '@/hooks/cms/use-faqs';
import { toast } from 'sonner';
import type { Tables } from '@/lib/supabase/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Faq = Tables<'faqs'>;
type FaqWithCategory = Faq & {
  faq_categories: Tables<'faq_categories'> | null;
};

export default function FaqsPage() {
  const [deleteTarget, setDeleteTarget] = useState<FaqWithCategory | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const { data, isLoading, error } = useFaqs({ category: categoryFilter });
  const { data: categoriesData } = useFaqCategories();
  const deleteMutation = useDeleteFaq();
  
  const faqs = (data?.data || []) as FaqWithCategory[];
  const categories = categoriesData?.data || [];
  
  const handleDelete = async () => {
    if (!deleteTarget) return;
    
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('FAQ deleted successfully');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete FAQ');
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="FAQs"
          description="Manage frequently asked questions"
          breadcrumbs={[{ label: 'FAQs' }]}
        />
        <LoadingSkeleton type="table" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="FAQs"
          description="Manage frequently asked questions"
          breadcrumbs={[{ label: 'FAQs' }]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">Failed to load FAQs: {error.message}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="FAQs"
        description="Manage frequently asked questions"
        breadcrumbs={[{ label: 'FAQs' }]}
        actions={
          <Button asChild>
            <Link href="/cms/faqs/new">
              <Plus className="mr-2 h-4 w-4" />
              Add FAQ
            </Link>
          </Button>
        }
      />
      
      {/* Category Filter */}
      <div className="flex items-center gap-4">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category: any) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {categoryFilter !== 'all' && (
          <Button variant="ghost" size="sm" onClick={() => setCategoryFilter('all')}>
            Clear filter
          </Button>
        )}
      </div>
      
      {faqs.length === 0 ? (
        <EmptyState
          icon={HelpCircle}
          title="No FAQs yet"
          description="Get started by adding your first FAQ."
          action={{ label: 'Add FAQ', href: '/cms/faqs/new' }}
        />
      ) : (
        <DataTable
          data={faqs}
          baseUrl="/cms/faqs"
          searchPlaceholder="Search FAQs..."
          searchKey="question"
          showViewButton
          viewUrl={(faq) => `/faqs/${faq.id}`}
          onDelete={(faq) => setDeleteTarget(faq)}
          columns={[
            {
              key: 'question',
              label: 'Question',
              render: (faq) => (
                <div>
                  <p className="font-medium line-clamp-1">{faq.question}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{faq.answer}</p>
                </div>
              ),
            },
            {
              key: 'category',
              label: 'Category',
              className: 'hidden md:table-cell',
              render: (faq) => (
                <span className="text-muted-foreground">
                  {faq.faq_categories?.name || '—'}
                </span>
              ),
            },
            {
              key: 'is_active',
              label: 'Status',
              className: 'hidden sm:table-cell',
              render: (faq) => (
                <StatusBadge
                  status={faq.is_active ? 'active' : 'inactive'}
                />
              ),
            },
          ]}
        />
      )}
      
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete FAQ?"
        description={`Are you sure you want to delete this FAQ? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}