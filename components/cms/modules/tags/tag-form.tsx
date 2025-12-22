// components/cms/modules/tags/tag-form.tsx
// Reusable tag form for create/edit
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTagSchema, type CreateTagInput } from "@/lib/schemas/tag.schema";
import { generateSlug } from "@/lib/utils/slug";

interface TagFormProps {
  initialData?: Partial<CreateTagInput> & { id?: string };
  onSubmit: (data: CreateTagInput) => Promise<void>;
  isSubmitting?: boolean;
  isEdit?: boolean;
}

export function TagForm({
  initialData,
  onSubmit,
  isSubmitting,
  isEdit,
}: TagFormProps) {
  const router = useRouter();

  const form = useForm<CreateTagInput>({
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
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
        <div className="grid gap-4 md:grid-cols-2">
          {/* Name */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="after:ml-0.5 after:text-red-500 after:content-['*']"
            >
              Name
            </Label>
            <Input id="name" {...register("name")} placeholder="Technology" />
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
            <Input
              id="slug"
              {...register("slug")}
              placeholder="technology"
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
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-border">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEdit ? "Update Tag" : "Create Tag"}
        </Button>
      </div>
    </form>
  );
}
