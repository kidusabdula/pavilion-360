'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SlugInput } from '@/components/cms/forms/slug-input';
import { createTagSchema, type CreateTagInput } from '@/lib/schemas/tag.schema';
import { generateSlug } from '@/lib/utils/slug';

interface TagFormProps {
  initialData?: Partial<CreateTagInput>;
  onSubmit: (data: CreateTagInput) => Promise<void>;
  isSubmitting?: boolean;
  isEdit?: boolean;
}

export function TagForm({ initialData, onSubmit, isSubmitting, isEdit }: TagFormProps) {
  const form = useForm<CreateTagInput>({
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      slug: initialData?.slug ?? '',
    },
  });

  const handleNameChange = (name: string) => {
    const slug = generateSlug(name);
    form.setValue('slug', slug);
  };

  return (
    <form className="w-full max-w-6xl space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="rounded-lg border border-border bg-card p-6 space-y-6">
        <h2 className="text-lg font-semibold">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e);
                      if (!isEdit) handleNameChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <SlugInput
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isEdit}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-3">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : isEdit ? 'Update Tag' : 'Create Tag'}
        </Button>
      </div>
    </form>
  );
}