// components/cms/modules/event-types/event-type-form.tsx
// Reusable event type form for create/edit
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
  createEventTypeSchema,
  type CreateEventTypeInput,
} from "@/lib/schemas/event-type.schema";
import { generateSlug } from "@/lib/utils/slug";

interface EventTypeFormProps {
  initialData?: Partial<CreateEventTypeInput> & { id?: string };
  onSubmit: (data: CreateEventTypeInput) => Promise<void>;
  isSubmitting?: boolean;
  isEdit?: boolean;
}

export function EventTypeForm({
  initialData,
  onSubmit,
  isSubmitting,
  isEdit,
}: EventTypeFormProps) {
  const router = useRouter();

  const form = useForm<CreateEventTypeInput>({
    resolver: zodResolver(createEventTypeSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      description: initialData?.description || undefined,
      display_order: initialData?.display_order ?? 0,
      is_active: initialData?.is_active ?? true,
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
          {/* Name & Slug */}
          <div className="grid gap-4 md:grid-cols-2">
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
                placeholder="Corporate Events"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="slug"
                className="after:ml-0.5 after:text-red-500 after:content-['*']"
              >
                Slug
              </Label>
              <Input
                id="slug"
                {...register("slug")}
                placeholder="corporate-events"
                className="font-mono"
                disabled={isEdit}
              />
              {errors.slug && (
                <p className="text-sm text-red-500">{errors.slug.message}</p>
              )}
              {isEdit && (
                <p className="text-xs text-muted-foreground">
                  Slug cannot be changed after creation
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Brief description of this event type..."
              rows={3}
            />
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

          {/* Active Toggle */}
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <Label htmlFor="is_active">Active</Label>
              <p className="text-sm text-muted-foreground">
                Visible on the public site
              </p>
            </div>
            <Switch
              id="is_active"
              checked={watch("is_active")}
              onCheckedChange={(checked) => setValue("is_active", checked)}
            />
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
          {isEdit ? "Update Event Type" : "Create Event Type"}
        </Button>
      </div>
    </form>
  );
}
