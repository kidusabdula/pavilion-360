// components/cms/modules/services/service-form.tsx
// Reusable service form for create/edit
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash2, GripVertical } from "lucide-react";
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
import { ImageUpload } from "@/components/cms/forms";
import {
  createServiceSchema,
  type CreateServiceInput,
} from "@/lib/schemas/service.schema";
import { generateSlug } from "@/lib/utils/slug";
import { cn } from "@/lib/utils/cn";

// Icon options for services
const iconOptions = [
  "calendar",
  "briefcase",
  "sparkles",
  "music",
  "video",
  "mic",
  "camera",
  "lightbulb",
  "heart",
  "star",
  "zap",
  "award",
];

interface ServiceFormProps {
  initialData?: Partial<CreateServiceInput> & { id?: string };
  onSubmit: (data: CreateServiceInput) => Promise<void>;
  isSubmitting?: boolean;
  isEdit?: boolean;
}

export function ServiceForm({
  initialData,
  onSubmit,
  isSubmitting,
  isEdit,
}: ServiceFormProps) {
  const router = useRouter();

  const form = useForm<CreateServiceInput>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      tagline: initialData?.tagline || "",
      description: initialData?.description || "",
      icon: initialData?.icon || "calendar",
      thumbnail_url: initialData?.thumbnail_url || "",
      what_we_do: initialData?.what_we_do || [],
      gallery: initialData?.gallery || [],
      seo_title: initialData?.seo_title || "",
      seo_description: initialData?.seo_description || "",
      display_order: initialData?.display_order || 0,
      is_active: initialData?.is_active ?? true,
      use_cases: initialData?.use_cases || [],
      process_steps: initialData?.process_steps || [],
      packages: initialData?.packages || [],
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  // Field arrays for nested data
  const {
    fields: whatWeDoFields,
    append: appendWhatWeDo,
    remove: removeWhatWeDo,
  } = useFieldArray({ control: form.control, name: "what_we_do" as never });

  const {
    fields: useCaseFields,
    append: appendUseCase,
    remove: removeUseCase,
  } = useFieldArray({ control: form.control, name: "use_cases" });

  const {
    fields: processStepFields,
    append: appendProcessStep,
    remove: removeProcessStep,
  } = useFieldArray({ control: form.control, name: "process_steps" });

  // Auto-generate slug from name
  const name = watch("name");
  useEffect(() => {
    if (!isEdit && name && !initialData?.slug) {
      setValue("slug", generateSlug(name));
    }
  }, [name, isEdit, setValue, initialData?.slug]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl space-y-8"
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
              placeholder="Event Planning & Management"
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
              <span className="text-sm text-muted-foreground">/services/</span>
              <Input
                id="slug"
                {...register("slug")}
                placeholder="event-planning"
                className="font-mono"
              />
            </div>
            {errors.slug && (
              <p className="text-sm text-red-500">{errors.slug.message}</p>
            )}
          </div>

          {/* Tagline */}
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              {...register("tagline")}
              placeholder="Making your events unforgettable"
            />
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
              placeholder="Full description of the service..."
              rows={5}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Icon */}
          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <Select
              value={watch("icon")}
              onValueChange={(value) => setValue("icon", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((icon) => (
                  <SelectItem key={icon} value={icon}>
                    {icon.charAt(0).toUpperCase() + icon.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Media */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Media</h2>
        <div className="space-y-4">
          {/* Thumbnail */}
          <ImageUpload
            label="Thumbnail Image"
            value={watch("thumbnail_url") || null}
            onChange={(url) => setValue("thumbnail_url", url || "")}
            folder="services"
            aspectRatio="video"
          />
        </div>
      </div>

      {/* What We Do */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">What We Do</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendWhatWeDo("" as never)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
        <div className="space-y-3">
          {whatWeDoFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
              <Input
                {...register(`what_we_do.${index}` as const)}
                placeholder="Describe what you do..."
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeWhatWeDo(index)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
          {whatWeDoFields.length === 0 && (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No items yet. Click "Add Item" to add one.
            </p>
          )}
        </div>
      </div>

      {/* Use Cases */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Use Cases</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              appendUseCase({
                title: "",
                description: "",
                display_order: useCaseFields.length,
              })
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Use Case
          </Button>
        </div>
        <div className="space-y-4">
          {useCaseFields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-lg border border-border bg-muted/20 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium">
                  Use Case {index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeUseCase(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="space-y-3">
                <Input
                  {...register(`use_cases.${index}.title`)}
                  placeholder="Use case title..."
                />
                <Textarea
                  {...register(`use_cases.${index}.description`)}
                  placeholder="Description..."
                  rows={2}
                />
              </div>
            </div>
          ))}
          {useCaseFields.length === 0 && (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No use cases yet. Click "Add Use Case" to add one.
            </p>
          )}
        </div>
      </div>

      {/* Process Steps */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Process Steps</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              appendProcessStep({
                step_number: processStepFields.length + 1,
                title: "",
                description: "",
              })
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Step
          </Button>
        </div>
        <div className="space-y-4">
          {processStepFields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-lg border border-border bg-muted/20 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium">Step {index + 1}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProcessStep(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="space-y-3">
                <Input
                  {...register(`process_steps.${index}.title`)}
                  placeholder="Step title..."
                />
                <Textarea
                  {...register(`process_steps.${index}.description`)}
                  placeholder="Step description..."
                  rows={2}
                />
                <input
                  type="hidden"
                  {...register(`process_steps.${index}.step_number`, {
                    valueAsNumber: true,
                  })}
                  value={index + 1}
                />
              </div>
            </div>
          ))}
          {processStepFields.length === 0 && (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No steps yet. Click "Add Step" to add one.
            </p>
          )}
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

          {/* Active Toggle */}
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <Label htmlFor="is_active">Active</Label>
              <p className="text-sm text-muted-foreground">
                When enabled, this service will be visible on the public site
              </p>
            </div>
            <Switch
              id="is_active"
              checked={watch("is_active") ?? true}
              onCheckedChange={(checked) => setValue("is_active", checked)}
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
              Leave empty to use the service name
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
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEdit ? "Update Service" : "Create Service"}
        </Button>
      </div>
    </form>
  );
}
