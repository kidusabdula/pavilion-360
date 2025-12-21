// app/(cms)/cms/testimonials/page.tsx
// CMS Testimonials list page
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Plus, MessageSquareQuote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/cms/shared/page-header';
import { DataTable, TableThumbnail } from '@/components/cms/shared/data-table';
import { EmptyState } from '@/components/cms/shared/empty-state';
import { LoadingSkeleton } from '@/components/cms/shared/loading-skeleton';
import { ConfirmDialog } from '@/components/cms/shared/confirm-dialog';
import { StatusBadge } from '@/components/cms/shared/status-badge';
import { useTestimonials, useDeleteTestimonial } from '@/hooks/cms/use-testimonials';
import { toast } from 'sonner';
import type { Tables } from '@/lib/supabase/types';

type Testimonial = Tables<'testimonials'>;
type TestimonialWithPortfolio = Testimonial & {
  portfolio_projects: Tables<'portfolio_projects'> | null;
};

export default function TestimonialsPage() {
  const [deleteTarget, setDeleteTarget] = useState<TestimonialWithPortfolio | null>(null);
  
  const { data, isLoading, error } = useTestimonials();
  const deleteMutation = useDeleteTestimonial();
  
  const testimonials = (data?.data || []) as TestimonialWithPortfolio[];
  
  const handleDelete = async () => {
    if (!deleteTarget) return;
    
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('Testimonial deleted successfully');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete testimonial');
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Testimonials"
          description="Manage customer testimonials"
          breadcrumbs={[{ label: 'Testimonials' }]}
        />
        <LoadingSkeleton type="table" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Testimonials"
          description="Manage customer testimonials"
          breadcrumbs={[{ label: 'Testimonials' }]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">Failed to load testimonials: {error.message}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Testimonials"
        description="Manage customer testimonials"
        breadcrumbs={[{ label: 'Testimonials' }]}
        actions={
          <Button asChild>
            <Link href="/cms/testimonials/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Link>
          </Button>
        }
      />
      
      {testimonials.length === 0 ? (
        <EmptyState
          icon={MessageSquareQuote}
          title="No testimonials yet"
          description="Get started by adding your first testimonial."
          action={{ label: 'Add Testimonial', href: '/cms/testimonials/new' }}
        />
      ) : (
        <DataTable
          data={testimonials}
          baseUrl="/cms/testimonials"
          searchPlaceholder="Search testimonials..."
          searchKey="author_name"
          showViewButton
          viewUrl={(testimonial) => `/testimonials/${testimonial.id}`}
          onDelete={(testimonial) => setDeleteTarget(testimonial)}
          columns={[
            {
              key: 'author',
              label: '',
              className: 'w-16',
              render: (testimonial) => (
                <TableThumbnail 
                  src={testimonial.author_image_url} 
                  alt={testimonial.author_name} 
                  fallback={testimonial.author_name.charAt(0)} 
                />
              ),
            },
            {
              key: 'quote',
              label: 'Testimonial',
              render: (testimonial) => (
                <div>
                  <p className="font-medium line-clamp-1">"{testimonial.quote}"</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.author_name} • {testimonial.company || testimonial.author_role || '—'}
                  </p>
                </div>
              ),
            },
            {
              key: 'is_featured',
              label: 'Featured',
              className: 'hidden md:table-cell',
              render: (testimonial) => (
                <StatusBadge
                  status={testimonial.is_featured ? 'featured' : 'draft'}
                />
              ),
            },
            {
              key: 'is_active',
              label: 'Status',
              className: 'hidden sm:table-cell',
              render: (testimonial) => (
                <StatusBadge
                  status={testimonial.is_active ? 'active' : 'inactive'}
                />
              ),
            },
          ]}
        />
      )}
      
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Testimonial?"
        description={`Are you sure you want to delete this testimonial? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}