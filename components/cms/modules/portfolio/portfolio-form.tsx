// components/cms/modules/portfolio/portfolio-form.tsx
// Reusable portfolio form for create/edit
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash2, X } from "lucide-react";
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
import { ImageUpload } from "@/components/cms/forms/image-upload";
import {
  createPortfolioSchema,
  type CreatePortfolioInput,
} from "@/lib/schemas/portfolio.schema";
import { generateSlug } from "@/lib/utils/slug";
import { useEventTypes } from "@/hooks/cms/use-portfolio";

interface PortfolioFormProps {
  initialData?: Partial<CreatePortfolioInput> & { id?: string };
  onSubmit: (data: CreatePortfolioInput) => Promise<void>;
  isSubmitting?: boolean;
  isEdit?: boolean;
}

export function PortfolioForm({
  initialData,
  onSubmit,
  isSubmitting,
  isEdit,
}: PortfolioFormProps) {
  const router = useRouter();
  const { data: eventTypesData } = useEventTypes();
  const eventTypes = eventTypesData?.data || [];

  const form = useForm<CreatePortfolioInput>({
    resolver: zodResolver(createPortfolioSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      event_type_id: initialData?.event_type_id || undefined,
      venue: initialData?.venue || undefined,
      event_date: initialData?.event_date || undefined,
      thumbnail_url: initialData?.thumbnail_url || undefined,
      gallery: initialData?.gallery || [],
      description: initialData?.description || "",
      goals: initialData?.goals || undefined,
      technical_highlights: initialData?.technical_highlights || [],
      attendee_count: initialData?.attendee_count || undefined,
      client_quote_text: initialData?.client_quote_text || undefined,
      client_quote_author: initialData?.client_quote_author || undefined,
      client_quote_role: initialData?.client_quote_role || undefined,
      is_featured: initialData?.is_featured ?? false,
      is_active: initialData?.is_active ?? true,
      display_order: initialData?.display_order || 0,
      seo_title: initialData?.seo_title || undefined,
      seo_description: initialData?.seo_description || undefined,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = form;

  // Field arrays
  const {
    fields: galleryFields,
    append: appendGallery,
    remove: removeGallery,
  } = useFieldArray({ control, name: "gallery" });

  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({ control, name: "technical_highlights" });

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
              placeholder="Annual Corporate Gala"
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
              <span className="text-sm text-muted-foreground">/portfolio/</span>
              <Input
                id="slug"
                {...register("slug")}
                placeholder="annual-corporate-gala"
                className="font-mono"
              />
            </div>
            {errors.slug && (
              <p className="text-sm text-red-500">{errors.slug.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="after:ml-0.5 after:text-red-500 after:content-['*']"
            >
              Description
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Full description of the project..."
              rows={5}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Event Details</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Event Type */}
          <div className="space-y-2">
            <Label htmlFor="event_type_id">Event Type</Label>
            <Select
              value={watch("event_type_id") || undefined}
              onValueChange={(value) => setValue("event_type_id", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((eventType) => (
                  <SelectItem key={eventType.id} value={eventType.id}>
                    {eventType.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Venue */}
          <div className="space-y-2">
            <Label htmlFor="venue">Venue</Label>
            <Input
              id="venue"
              {...register("venue")}
              placeholder="Grand Ballroom"
            />
          </div>

          {/* Event Date */}
          <div className="space-y-2">
            <Label htmlFor="event_date">Event Date</Label>
            <Input id="event_date" type="date" {...register("event_date")} />
          </div>

          {/* Attendee Count */}
          <div className="space-y-2">
            <Label htmlFor="attendee_count">Attendee Count</Label>
            <Input
              id="attendee_count"
              type="number"
              {...register("attendee_count", { valueAsNumber: true })}
              placeholder="500"
            />
          </div>
        </div>
      </div>

      {/* Media */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Media</h2>
        <div className="space-y-6">
          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <Label>Thumbnail Image</Label>
            <ImageUpload
              value={watch("thumbnail_url")}
              onChange={(url) => setValue("thumbnail_url", url)}
              folder="portfolio/thumbnails"
              aspectRatio="video"
            />
          </div>

          {/* Gallery Images */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Gallery Images</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendGallery("")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Image
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {galleryFields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative group rounded-xl border border-border p-2"
                >
                  <ImageUpload
                    value={watch(`gallery.${index}`)}
                    onChange={(url) => setValue(`gallery.${index}`, url || "")}
                    folder="portfolio/gallery"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-4 right-4 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeGallery(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Content</h2>
        <div className="space-y-4">
          {/* Goals */}
          <div className="space-y-2">
            <Label htmlFor="goals">Goals</Label>
            <Textarea
              id="goals"
              {...register("goals")}
              placeholder="What were the goals of this project?"
              rows={3}
            />
          </div>

          {/* Technical Highlights */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Technical Highlights</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendHighlight("")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Highlight
              </Button>
            </div>
            <div className="space-y-3">
              {highlightFields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
                  <Input
                    {...register(`technical_highlights.${index}` as const)}
                    placeholder="Technical highlight..."
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeHighlight(index)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Client Testimonial */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Client Testimonial</h2>
        <div className="space-y-4">
          {/* Quote Text */}
          <div className="space-y-2">
            <Label htmlFor="client_quote_text">Quote</Label>
            <Textarea
              id="client_quote_text"
              {...register("client_quote_text")}
              placeholder="Client testimonial..."
              rows={3}
            />
          </div>

          {/* Author Details */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="client_quote_author">Author Name</Label>
              <Input
                id="client_quote_author"
                {...register("client_quote_author")}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client_quote_role">Author Role/Company</Label>
              <Input
                id="client_quote_role"
                {...register("client_quote_role")}
                placeholder="CEO, Company Name"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Settings</h2>
        <div className="space-y-4">
          {/* Display Order */}
          <div className="space-y-2">
            <Label htmlFor="display_order">Display Order</Label>
            <Input
              id="display_order"
              type="number"
              {...register("display_order", { valueAsNumber: true })}
              min={0}
            />
            <p className="text-xs text-muted-foreground">
              Lower numbers appear first
            </p>
          </div>

          {/* Toggles */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <Label htmlFor="is_featured">Featured</Label>
                <p className="text-sm text-muted-foreground">
                  Highlight this project
                </p>
              </div>
              <Switch
                id="is_featured"
                checked={watch("is_featured")}
                onCheckedChange={(checked) => setValue("is_featured", checked)}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <Label htmlFor="is_active">Active</Label>
                <p className="text-sm text-muted-foreground">Visible on site</p>
              </div>
              <Switch
                id="is_active"
                checked={watch("is_active")}
                onCheckedChange={(checked) => setValue("is_active", checked)}
              />
            </div>
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
              Leave empty to use the project title
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
              Leave empty to use a generated description
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
          {isEdit ? "Update Portfolio" : "Create Portfolio"}
        </Button>
      </div>
    </form>
  );
}
