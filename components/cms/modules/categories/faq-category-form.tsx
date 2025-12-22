'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { createFaqCategorySchema, type CreateFaqCategoryInput } from '@/lib/schemas/faq-category.schema';
import { generateSlug } from '@/lib/utils/slug';

interface FaqCategoryFormProps {
  initialData?: Partial<CreateFaqCategoryInput>;
  onSubmit: (data: CreateFaqCategoryInput) => Promise<void>;
  isSubmitting?: boolean;
}

export function FaqCategoryForm({ initialData, onSubmit, isSubmitting }: FaqCategoryFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CreateFaqCategoryInput>({
    resolver: zodResolver(createFaqCategorySchema),
    defaultValues: {
      name: initialData?.name || '',
      slug: initialData?.slug || '',
      display_order: initialData?.display_order ?? 0,
      is_active: initialData?.is_active ?? true,
    },
  });
  
  const nameValue = watch('name');
  useEffect(() => {
    if (!initialData?.slug && nameValue) {
      setValue('slug', generateSlug(nameValue));
    }
  }, [nameValue, setValue, initialData?.slug]);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" {...register('name')} />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input id="slug" {...register('slug')} className="font-mono" />
          {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="display_order">Display Order</Label>
          <Input id="display_order" type="number" {...register('display_order', { valueAsNumber: true })} />
        </div>
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <Label htmlFor="is_active">Active</Label>
          <Switch id="is_active" checked={watch('is_active')} onCheckedChange={(c) => setValue('is_active', c)} />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
}