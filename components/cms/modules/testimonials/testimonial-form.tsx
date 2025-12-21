// components/cms/modules/testimonials/testimonial-form.tsx
// Reusable testimonial form for create/edit
"use client";

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
import { ImageUpload } from "@/components/cms/forms";
import {
  createTestimonialSchema,
  type CreateTestimonialInput,
} from "@/lib/schemas/testimonial.schema";
import { usePortfolio } from "@/hooks/cms/use-portfolio";
import type { Tables } from "@/lib/supabase/types";

interface TestimonialFormProps {
  initialData?: Partial<CreateTestimonialInput> & { id?: string };
  onSubmit: (data: CreateTestimonialInput) => Promise<void>;
  isSubmitting?: boolean;
  isEdit?: boolean;
}

export function TestimonialForm({
  initialData,
  onSubmit,
  isSubmitting,
  isEdit,
}: TestimonialFormProps) {
  const router = useRouter();
  const { data: portfolioData } = usePortfolio();
  const portfolioProjects = portfolioData?.data || [];

  const form = useForm<CreateTestimonialInput>({
    resolver: zodResolver(createTestimonialSchema),
    defaultValues: {
      quote: initialData?.quote || "",
      author_name: initialData?.author_name || "",
      author_role: initialData?.author_role || undefined,
      company: initialData?.company || undefined,
      author_image_url: initialData?.author_image_url || undefined,
      portfolio_project_id: initialData?.portfolio_project_id || undefined,
      is_featured: initialData?.is_featured ?? false,
      is_active: initialData?.is_active ?? true,
      display_order: initialData?.display_order ?? 0,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-6xl space-y-8"
    >
      {/* Testimonial Content */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Testimonial Content</h2>
        <div className="space-y-4">
          {/* Quote */}
          <div className="space-y-2">
            <Label
              htmlFor="quote"
              className="after:ml-0.5 after:text-red-500 after:content-['*']"
            >
              Quote
            </Label>
            <Textarea
              id="quote"
              {...register("quote")}
              placeholder="Enter the testimonial quote..."
              rows={6}
            />
            {errors.quote && (
              <p className="text-sm text-red-500">{errors.quote.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Author Information */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Author Information</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Author Name */}
          <div className="space-y-2">
            <Label
              htmlFor="author_name"
              className="after:ml-0.5 after:text-red-500 after:content-['*']"
            >
              Author Name
            </Label>
            <Input
              id="author_name"
              {...register("author_name")}
              placeholder="John Doe"
            />
            {errors.author_name && (
              <p className="text-sm text-red-500">
                {errors.author_name.message}
              </p>
            )}
          </div>

          {/* Author Role */}
          <div className="space-y-2">
            <Label htmlFor="author_role">Author Role</Label>
            <Input
              id="author_role"
              {...register("author_role")}
              placeholder="CEO"
            />
          </div>

          {/* Company */}
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              {...register("company")}
              placeholder="Company Name"
            />
          </div>
        </div>
      </div>

      {/* Author Image */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Author Image</h2>
        <div className="space-y-2">
          <Label>Author Photo</Label>
          <ImageUpload
            value={watch("author_image_url")}
            onChange={(url) => setValue("author_image_url", url)}
            folder="testimonials"
            aspectRatio="square"
          />
          <p className="text-xs text-muted-foreground">
            Recommended aspect ratio: 1:1 (square)
          </p>
        </div>
      </div>

      {/* Portfolio Project Link */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Portfolio Project</h2>
        <div className="space-y-2">
          <Label htmlFor="portfolio_project_id">Related Project</Label>
          <Select
            value={watch("portfolio_project_id") || undefined}
            onValueChange={(value) =>
              setValue(
                "portfolio_project_id",
                value === "none" ? undefined : value
              )
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a project (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {portfolioProjects.map(
                (project: Tables<"portfolio_projects">) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.title}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Link this testimonial to a portfolio project
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
          {isEdit ? "Update Testimonial" : "Create Testimonial"}
        </Button>
      </div>
    </form>
  );
}
