// components/cms/modules/rentals/rental-form.tsx
// Reusable rental form for create/edit
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash2, X } from "lucide-react";
import { z } from "zod";
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
  rentalFormSchema,
  type RentalFormInput,
} from "@/lib/schemas/rental.schema";
import { generateSlug } from "@/lib/utils/slug";
import { useRentalCategories } from "@/hooks/cms/use-rentals";

// Schema for the form state (with objects for field arrays)
const formSchema = rentalFormSchema.extend({
  images: z.array(z.object({ url: z.string().url() })).default([]),
  tags: z.array(z.object({ value: z.string() })).default([]),
  features: z.array(z.object({ value: z.string() })).default([]),
});

type FormValues = z.infer<typeof formSchema>;

interface RentalFormProps {
  initialData?: Partial<RentalFormInput> & { id?: string };
  onSubmit: (data: RentalFormInput) => Promise<void>;
  isSubmitting?: boolean;
  isEdit?: boolean;
}

export function RentalForm({
  initialData,
  onSubmit,
  isSubmitting,
  isEdit,
}: RentalFormProps) {
  const router = useRouter();
  const { data: categories } = useRentalCategories();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      category_id: initialData?.category_id || "",
      description: initialData?.description || "",
      short_description: initialData?.short_description || "",
      thumbnail_url: initialData?.thumbnail_url || "",
      images: initialData?.images?.map((url) => ({ url })) || [],
      daily_rate: initialData?.daily_rate || "",
      collection: initialData?.collection || "",
      color: initialData?.color || "",
      finish: initialData?.finish || "",
      quantity: initialData?.quantity || 0,
      specs: initialData?.specs || {},
      tags: initialData?.tags?.map((value) => ({ value })) || [],
      features: initialData?.features?.map((value) => ({ value })) || [],
      is_popular: initialData?.is_popular ?? false,
      is_active: initialData?.is_active ?? true,
      display_order: initialData?.display_order || 0,
    } as any, // Cast to any for defaultValues to avoid deep partial issues with initialData
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
    fields: imagesFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({ control, name: "images" });

  const {
    fields: tagsFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({ control, name: "tags" });

  const {
    fields: featuresFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({ control, name: "features" });

  // Auto-generate slug from name
  const nameValue = watch("name");
  useEffect(() => {
    if (!isEdit && nameValue && !initialData?.slug) {
      setValue("slug", generateSlug(nameValue));
    }
  }, [nameValue, isEdit, setValue, initialData?.slug]);

  const handleFormSubmit = async (data: FormValues) => {
    // Transform back to original schema format
    const transformedData: RentalFormInput = {
      ...data,
      images: data.images.map((img) => img.url),
      tags: data.tags.map((t) => t.value),
      features: data.features.map((f) => f.value),
    };
    await onSubmit(transformedData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full max-w-6xl space-y-8"
    >
      {/* Basic Information */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Basic Information</h2>
        <div className="grid gap-4 md:grid-cols-2">
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
              placeholder="LED Wall Rental"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label
              htmlFor="category_id"
              className="after:ml-0.5 after:text-red-500 after:content-['*']"
            >
              Category
            </Label>
            <Select
              value={watch("category_id") || undefined}
              onValueChange={(value) => setValue("category_id", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.data?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category_id && (
              <p className="text-sm text-red-500">
                {errors.category_id.message}
              </p>
            )}
          </div>
        </div>

        {/* Slug */}
        <div className="space-y-2 mt-4">
          <Label
            htmlFor="slug"
            className="after:ml-0.5 after:text-red-500 after:content-['*']"
          >
            Slug
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">/rentals/</span>
            <Input
              id="slug"
              {...register("slug")}
              placeholder="led-wall-rental"
              className="font-mono"
            />
          </div>
          {errors.slug && (
            <p className="text-sm text-red-500">{errors.slug.message}</p>
          )}
        </div>

        {/* Short Description */}
        <div className="space-y-2 mt-4">
          <Label htmlFor="short_description">Short Description</Label>
          <Textarea
            id="short_description"
            {...register("short_description")}
            placeholder="Brief description for listings..."
            rows={2}
          />
        </div>

        {/* Description */}
        <div className="space-y-2 mt-4">
          <Label
            htmlFor="description"
            className="after:ml-0.5 after:text-red-500 after:content-['*']"
          >
            Description
          </Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Full description of the rental item..."
            rows={5}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Daily Rate */}
        <div className="space-y-2 mt-4">
          <Label htmlFor="daily_rate">Daily Rate</Label>
          <Input
            id="daily_rate"
            {...register("daily_rate")}
            placeholder="$500/day"
          />
        </div>

        {/* Catalog Fields */}
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Catalog Details
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Collection */}
            <div className="space-y-2">
              <Label htmlFor="collection">Collection</Label>
              <Input
                id="collection"
                {...register("collection")}
                placeholder="e.g., Avenue, Hayworth"
              />
            </div>

            {/* Color */}
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                {...register("color")}
                placeholder="e.g., Black, White, Gold"
              />
            </div>

            {/* Finish */}
            <div className="space-y-2">
              <Label htmlFor="finish">Finish</Label>
              <Input
                id="finish"
                {...register("finish")}
                placeholder="e.g., Chrome, Stainless"
              />
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity in Stock</Label>
              <Input
                id="quantity"
                type="number"
                {...register("quantity", { valueAsNumber: true })}
                min={0}
                placeholder="0"
              />
            </div>
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
              folder="rentals/thumbnails"
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
                onClick={() =>
                  appendImage({ url: "https://placeholder.com/image.jpg" })
                } // Temporary placeholder to pass URL validation
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Image
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {imagesFields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative group rounded-xl border border-border p-2"
                >
                  <ImageUpload
                    value={watch(`images.${index}.url`)}
                    onChange={(url) =>
                      setValue(`images.${index}.url`, url || "")
                    }
                    folder="rentals/gallery"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-4 right-4 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Specifications</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const currentSpecs = watch("specs") || {};
              const newKey = `spec-${Date.now()}`;
              setValue("specs", { ...currentSpecs, [newKey]: "" });
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Spec
          </Button>
        </div>
        <div className="space-y-3">
          {Object.entries(watch("specs") || {}).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <Input
                defaultValue={key}
                placeholder="Specification name"
                className="flex-1"
                onBlur={(e) => {
                  const newKey = e.target.value;
                  if (newKey && newKey !== key) {
                    const currentSpecs = { ...watch("specs") };
                    const val = currentSpecs[key];
                    delete currentSpecs[key];
                    currentSpecs[newKey] = val;
                    setValue("specs", currentSpecs);
                  }
                }}
              />
              <Input
                value={value}
                onChange={(e) => {
                  const currentSpecs = { ...watch("specs") };
                  currentSpecs[key] = e.target.value;
                  setValue("specs", currentSpecs);
                }}
                placeholder="Specification value"
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  const currentSpecs = { ...watch("specs") };
                  delete currentSpecs[key];
                  setValue("specs", currentSpecs);
                }}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
          {Object.keys(watch("specs") || {}).length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No specifications added yet.
            </p>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Tags</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendTag({ value: "" })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Tag
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tagsFields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center gap-2 bg-muted/30 rounded-lg p-1 pr-2 border border-border"
            >
              <Input
                {...register(`tags.${index}.value` as const)}
                placeholder="Enter tag..."
                className="h-8 w-32 border-none bg-transparent focus-visible:ring-0"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => removeTag(index)}
              >
                <X className="h-3 w-3 text-muted-foreground" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Features</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendFeature({ value: "" })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Feature
          </Button>
        </div>
        <div className="space-y-3">
          {featuresFields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2">
              <Textarea
                {...register(`features.${index}.value` as const)}
                placeholder="Feature description..."
                rows={2}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="mt-2"
                onClick={() => removeFeature(index)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
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
                <Label htmlFor="is_popular">Popular</Label>
                <p className="text-sm text-muted-foreground">
                  Mark as popular item
                </p>
              </div>
              <Switch
                id="is_popular"
                checked={watch("is_popular")}
                onCheckedChange={(checked) => setValue("is_popular", checked)}
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

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-border">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEdit ? "Update Rental" : "Create Rental"}
        </Button>
      </div>
    </form>
  );
}
