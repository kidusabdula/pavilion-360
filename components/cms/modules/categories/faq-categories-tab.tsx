'use client';
import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DataTable } from '@/components/cms/shared/data-table';
import { StatusBadge } from '@/components/cms/shared/status-badge';
import { ConfirmDialog } from '@/components/cms/shared/confirm-dialog';
import { useFaqCategories, useCreateFaqCategory, useUpdateFaqCategory, useDeleteFaqCategory } from '@/hooks/cms/use-faq-categories';
import { FaqCategoryForm } from './faq-category-form';
import type { Tables } from '@/lib/supabase/types';

type FaqCategory = Tables<'faq_categories'>;

export function FaqCategoriesTab() {
  const [editingCategory, setEditingCategory] = useState<FaqCategory | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<FaqCategory | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const { data, isLoading } = useFaqCategories();
  const createMutation = useCreateFaqCategory();
  const updateMutation = useUpdateFaqCategory();
  const deleteMutation = useDeleteFaqCategory();
  
  const categories = (data?.data || []) as FaqCategory[];
  
  const handleSubmit = async (formData: any) => {
    if (editingCategory) {
      await updateMutation.mutateAsync({ id: editingCategory.id, ...formData });
    } else {
      await createMutation.mutateAsync(formData);
    }
    setDialogOpen(false);
    setEditingCategory(null);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">FAQ Categories</h3>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingCategory(null);
        }}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="mr-2 h-4 w-4" />Add Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCategory ? 'Edit Category' : 'New Category'}</DialogTitle>
            </DialogHeader>
            <FaqCategoryForm
              initialData={editingCategory || undefined}
              onSubmit={handleSubmit}
              isSubmitting={createMutation.isPending || updateMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <DataTable
        data={categories}
        baseUrl="/cms/categories" // Not used for navigation since inline
        searchPlaceholder="Search categories..."
        searchKey="name"
        customActions={(cat) => (
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={() => { setEditingCategory(cat); setDialogOpen(true); }}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(cat)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        )}
        columns={[
          { key: 'name', label: 'Name', render: (c) => <span className="font-medium">{c.name}</span> },
          { key: 'slug', label: 'Slug', className: 'hidden md:table-cell', render: (c) => c.slug },
          { key: 'display_order', label: 'Order', className: 'hidden lg:table-cell', render: (c) => c.display_order },
          { key: 'is_active', label: 'Status', render: (c) => <StatusBadge status={c.is_active ? 'active' : 'inactive'} /> },
        ]}
      />
      
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Category?"
        description={`Delete "${deleteTarget?.name}"? FAQs using this category may be affected.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={() => { deleteMutation.mutateAsync(deleteTarget!.id); setDeleteTarget(null); }}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}