// components/cms/modules/venues/venue-form.tsx
// Reusable venue form for create/edit
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
import { ImageUpload } from "@/components/cms/forms/image-upload";
import {
  createVenueSchema,
  type CreateVenueInput,
} from "@/lib/schemas/venue.schema";
import { generateSlug } from "@/lib/utils/slug";

interface VenueFormProps {
  initialData?: Partial<CreateVenueInput> & { id?: string };
  onSubmit: (data: CreateVenueInput) => Promise<void>;
  isSubmitting?: boolean;
  isEdit?: boolean;
}

export function VenueForm({
  initialData,
  onSubmit,
  isSubmitting,
  isEdit,
}: VenueFormProps) {
  const router = useRouter();

  const form = useForm<CreateVenueInput>({
    resolver: zodResolver(createVenueSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      location: initialData?.location || undefined,
      city: initialData?.city || undefined,
      thumbnail_url: initialData?.thumbnail_url || undefined,
      description: initialData?.description || undefined,
      capacity_min: initialData?.capacity_min || undefined,
      capacity_max: initialData?.capacity_max || undefined,
      is_managed: initialData?.is_managed ?? false,
      external_link: initialData?.external_link || undefined,
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
    formState: { errors },
  } = form;

  // Auto-generate slug from name
  const nameValue = watch("name");
  useEffect(() => {
    if (!isEdit && nameValue && !initialData?.slug) {
      setValue("slug", generateSlug(nameValue));
    }
  }, [nameValue, isEdit, setValue, initialData?.slug]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-6xl space-y-8"
    >
      {/* Basic Information */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Basic Information</h2>
        <div className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="after:ml-0.5 after:text-red-500 after:content-['*']"
            >
              Name
            </Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Grand Ballroom"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
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
              <span className="text-sm text-muted-foreground">/venues/</span>
              <Input
                id="slug"
                {...register("slug")}
                placeholder="grand-ballroom"
                className="font-mono"
              />
            </div>
            {errors.slug && (
              <p className="text-sm text-red-500">{errors.slug.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe the venue..."
              rows={5}
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Location</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Location/Address */}
          <div className="space-y-2">
            <Label htmlFor="location">Address</Label>
            <Input
              id="location"
              {...register("location")}
              placeholder="123 Main Street"
            />
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" {...register("city")} placeholder="New York" />
          </div>
        </div>
      </div>

      {/* Capacity */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Capacity</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Minimum Capacity */}
          <div className="space-y-2">
            <Label htmlFor="capacity_min">Minimum Capacity</Label>
            <Input
              id="capacity_min"
              type="number"
              {...register("capacity_min", { valueAsNumber: true })}
              placeholder="50"
            />
          </div>

          {/* Maximum Capacity */}
          <div className="space-y-2">
            <Label htmlFor="capacity_max">Maximum Capacity</Label>
            <Input
              id="capacity_max"
              type="number"
              {...register("capacity_max", { valueAsNumber: true })}
              placeholder="500"
            />
          </div>
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
            folder="venues"
            aspectRatio="video"
          />
        </div>
      </div>

      {/* External Link */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">External Link</h2>
        <div className="space-y-2">
          <Label htmlFor="external_link">Venue Website</Label>
          <Input
            id="external_link"
            {...register("external_link")}
            placeholder="https://venue-website.com"
          />
          <p className="text-xs text-muted-foreground">
            Link to the venue's official website
          </p>
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
                <Label htmlFor="is_managed">Managed by Pavilion360</Label>
                <p className="text-sm text-muted-foreground">
                  This venue is managed by us
                </p>
              </div>
              <Switch
                id="is_managed"
                checked={watch("is_managed")}
                onCheckedChange={(checked) => setValue("is_managed", checked)}
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
              Leave empty to use the venue name
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
          {isEdit ? "Update Venue" : "Create Venue"}
        </Button>
      </div>
    </form>
  );
}
