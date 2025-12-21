"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/cms/forms";
import { RichTextEditor } from "@/components/cms/forms";
import { createBlogSchema, type CreateBlogInput } from "@/lib/schemas/blog.schema";
import { useBlogCategories } from "@/hooks/cms/use-blog";
import { generateSlug } from "@/lib/utils/slug";

interface BlogFormProps {
  initialData?: Partial<CreateBlogInput>;
  onSubmit: (data: CreateBlogInput) => void;
  isSubmitting: boolean;
  isEdit?: boolean;
}

export function BlogForm({ initialData, onSubmit, isSubmitting, isEdit }: BlogFormProps) {
  const { data: categoriesData } = useBlogCategories();
  const categories = categoriesData?.data || [];
  
  const form = useForm<CreateBlogInput>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      excerpt: initialData?.excerpt || '',
      content: initialData?.content || {},
      thumbnail_url: initialData?.thumbnail_url || '',
      category_id: initialData?.category_id || '',
      author_name: initialData?.author_name || 'Pavilion360 Team',
      read_time_minutes: initialData?.read_time_minutes || undefined,
      published_at: initialData?.published_at || '',
      is_published: initialData?.is_published ?? false,
      is_featured: initialData?.is_featured ?? false,
      seo_title: initialData?.seo_title || '',
      seo_description: initialData?.seo_description || '',
      seo_image_url: initialData?.seo_image_url || '',
    },
  });
  
  // Auto-slug from title
  const titleValue = form.watch("title");
  useEffect(() => {
    if (!isEdit && titleValue && !initialData?.slug) {
      form.setValue("slug", generateSlug(titleValue));
    }
  }, [titleValue, isEdit, form, initialData?.slug]);
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-6xl space-y-8">
        {/* Basic Information */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Post title" {...field} />
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
                    <Input placeholder="post-slug" {...field} />
                  </FormControl>
                  <FormDescription>
                    URL-friendly identifier (lowercase with hyphens)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Textarea placeholder="Brief summary of the post" className="min-h-[120px]" {...field} />
                </FormControl>
                <FormDescription>
                  Leave empty to auto-generate from content
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Content */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Content</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Content</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value || {}}
                      onChange={(value) => field.onChange(value)}
                      placeholder="Write your blog post..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Media */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Media</h2>
          <FormField
            control={form.control}
            name="thumbnail_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value || null}
                    onChange={(url) => field.onChange(url || '')}
                    folder="blog/thumbnails"
                    aspectRatio="video"
                  />
                </FormControl>
                <FormDescription>
                  Recommended aspect ratio: 16:9
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Publication Settings */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Publication Settings</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category: any) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="read_time_minutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Read Time (minutes)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Estimated read time" 
                      {...field} 
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormDescription>
                    Leave empty to auto-calculate
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="published_at"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publication Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>
                    Leave empty to use current date
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="is_published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Published</FormLabel>
                    <FormDescription>
                      Visible on the public site
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Featured</FormLabel>
                    <FormDescription>
                      Show in featured sections
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* SEO */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">SEO</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="seo_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Title</FormLabel>
                  <FormControl>
                    <Input placeholder="SEO title" {...field} />
                  </FormControl>
                  <FormDescription>
                    Leave empty to use post title
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seo_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="SEO description" className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormDescription>
                    Leave empty to use excerpt
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seo_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Image</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormDescription>
                    Leave empty to use thumbnail
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => window.history.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  );
}