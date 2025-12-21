// components/cms/modules/blog/blog-form.tsx
// Reusable blog form for create/edit
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload, RichTextEditor } from "@/components/cms/forms";
import {
  createBlogSchema,
  type CreateBlogInput,
} from "@/lib/schemas/blog.schema";
import { useBlogCategories } from "@/hooks/cms/use-blog";
import { generateSlug } from "@/lib/utils/slug";
import type { Tables } from "@/lib/supabase/types";

interface BlogFormProps {
  initialData?: Partial<CreateBlogInput> & { id?: string };
  onSubmit: (data: CreateBlogInput) => Promise<void>;
  isSubmitting?: boolean;
  isEdit?: boolean;
}

export function BlogForm({
  initialData,
  onSubmit,
  isSubmitting,
  isEdit,
}: BlogFormProps) {
  const router = useRouter();
  const { data: categoriesData } = useBlogCategories();
  const categories = categoriesData?.data || [];

  const form = useForm<CreateBlogInput>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      excerpt: initialData?.excerpt || undefined,
      content: initialData?.content || {},
      thumbnail_url: initialData?.thumbnail_url || undefined,
      category_id: initialData?.category_id || undefined,
      author_name: initialData?.author_name || "Pavilion360 Team",
      read_time_minutes: initialData?.read_time_minutes || undefined,
      published_at: initialData?.published_at || undefined,
      is_published: initialData?.is_published ?? false,
      is_featured: initialData?.is_featured ?? false,
      seo_title: initialData?.seo_title || undefined,
      seo_description: initialData?.seo_description || undefined,
      seo_image_url: initialData?.seo_image_url || undefined,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  // Auto-generate slug from title
  const titleValue = watch("title");
  useEffect(() => {
    if (!isEdit && titleValue && !initialData?.slug) {
      setValue("slug", generateSlug(titleValue));
    }
  }, [titleValue, isEdit, setValue, initialData?.slug]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-6xl space-y-8"
    >
      {/* Basic Information */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Basic Information</h2>
        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="after:ml-0.5 after:text-red-500 after:content-['*']"
            >
              Title
            </Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="10 Tips for Planning the Perfect Event"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label
              htmlFor="slug"
              className="after:ml-0.5 after:text-red-500 after:content-['*']"
            >
              Slug
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">/blog/</span>
              <Input
                id="slug"
                {...register("slug")}
                placeholder="10-tips-perfect-event"
                className="font-mono"
              />
            </div>
            {errors.slug && (
              <p className="text-sm text-red-500">{errors.slug.message}</p>
            )}
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              {...register("excerpt")}
              placeholder="Brief summary of the post..."
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to auto-generate from content
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Content</h2>
        <div className="space-y-2">
          <Label>Post Content</Label>
          <RichTextEditor
            value={watch("content") || {}}
            onChange={(value) => setValue("content", value)}
            placeholder="Write your blog post..."
          />
        </div>
      </div>

      {/* Media */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Media</h2>
        <div className="space-y-2">
          <Label>Thumbnail Image</Label>
          <ImageUpload
            value={watch("thumbnail_url")}
            onChange={(url) => setValue("thumbnail_url", url)}
            folder="blog/thumbnails"
            aspectRatio="video"
          />
          <p className="text-xs text-muted-foreground">
            Recommended aspect ratio: 16:9
          </p>
        </div>
      </div>

      {/* Publication Settings */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Publication Settings</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category_id">Category</Label>
            <Select
              value={watch("category_id") || undefined}
              onValueChange={(value) => setValue("category_id", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category: Tables<"blog_categories">) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Author */}
          <div className="space-y-2">
            <Label htmlFor="author_name">Author</Label>
            <Input
              id="author_name"
              {...register("author_name")}
              placeholder="Pavilion360 Team"
            />
          </div>

          {/* Read Time */}
          <div className="space-y-2">
            <Label htmlFor="read_time_minutes">Read Time (minutes)</Label>
            <Input
              id="read_time_minutes"
              type="number"
              {...register("read_time_minutes", { valueAsNumber: true })}
              placeholder="5"
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to auto-calculate
            </p>
          </div>

          {/* Publication Date */}
          <div className="space-y-2">
            <Label htmlFor="published_at">Publication Date</Label>
            <Input
              id="published_at"
              type="date"
              {...register("published_at")}
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to use current date
            </p>
          </div>
        </div>

        {/* Toggles */}
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <Label htmlFor="is_published">Published</Label>
              <p className="text-sm text-muted-foreground">
                Visible on the public site
              </p>
            </div>
            <Switch
              id="is_published"
              checked={watch("is_published")}
              onCheckedChange={(checked) => setValue("is_published", checked)}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <Label htmlFor="is_featured">Featured</Label>
              <p className="text-sm text-muted-foreground">
                Show in featured sections
              </p>
            </div>
            <Switch
              id="is_featured"
              checked={watch("is_featured")}
              onCheckedChange={(checked) => setValue("is_featured", checked)}
            />
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">SEO</h2>
        <div className="space-y-4">
          {/* SEO Title */}
          <div className="space-y-2">
            <Label htmlFor="seo_title">SEO Title</Label>
            <Input
              id="seo_title"
              {...register("seo_title")}
              placeholder="Custom SEO title (optional)"
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to use the post title
            </p>
          </div>

          {/* SEO Description */}
          <div className="space-y-2">
            <Label htmlFor="seo_description">SEO Description</Label>
            <Textarea
              id="seo_description"
              {...register("seo_description")}
              placeholder="Custom SEO description (optional)"
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to use the excerpt
            </p>
          </div>

          {/* SEO Image */}
          <div className="space-y-2">
            <Label htmlFor="seo_image_url">SEO Image URL</Label>
            <Input
              id="seo_image_url"
              {...register("seo_image_url")}
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to use the thumbnail
            </p>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-border">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEdit ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}
