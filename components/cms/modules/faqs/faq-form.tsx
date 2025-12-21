// components/cms/modules/faqs/faq-form.tsx
// Reusable FAQ form for create/edit
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
import { createFaqSchema, type CreateFaqInput } from "@/lib/schemas/faq.schema";
import { useFaqCategories } from "@/hooks/cms/use-faqs";
import type { Tables } from "@/lib/supabase/types";

interface FaqFormProps {
  initialData?: Partial<CreateFaqInput> & { id?: string };
  onSubmit: (data: CreateFaqInput) => Promise<void>;
  isSubmitting?: boolean;
  isEdit?: boolean;
}

export function FaqForm({
  initialData,
  onSubmit,
  isSubmitting,
  isEdit,
}: FaqFormProps) {
  const router = useRouter();
  const { data: categoriesData } = useFaqCategories();
  const categories = categoriesData?.data || [];

  const form = useForm<CreateFaqInput>({
    resolver: zodResolver(createFaqSchema),
    defaultValues: {
      question: initialData?.question || "",
      answer: initialData?.answer || "",
      category_id: initialData?.category_id || "",
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-6xl space-y-8"
    >
      {/* FAQ Content */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">FAQ Content</h2>
        <div className="space-y-4">
          {/* Question */}
          <div className="space-y-2">
            <Label
              htmlFor="question"
              className="after:ml-0.5 after:text-red-500 after:content-['*']"
            >
              Question
            </Label>
            <Textarea
              id="question"
              {...register("question")}
              placeholder="What services do you offer?"
              rows={3}
            />
            {errors.question && (
              <p className="text-sm text-red-500">{errors.question.message}</p>
            )}
          </div>

          {/* Answer */}
          <div className="space-y-2">
            <Label
              htmlFor="answer"
              className="after:ml-0.5 after:text-red-500 after:content-['*']"
            >
              Answer
            </Label>
            <Textarea
              id="answer"
              {...register("answer")}
              placeholder="Provide a comprehensive answer..."
              rows={6}
            />
            {errors.answer && (
              <p className="text-sm text-red-500">{errors.answer.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Category & Settings */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Category & Settings</h2>
        <div className="grid gap-4 md:grid-cols-2">
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
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category: Tables<"faq_categories">) => (
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
        </div>

        {/* Active Toggle */}
        <div className="mt-4">
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
          {isEdit ? "Update FAQ" : "Create FAQ"}
        </Button>
      </div>
    </form>
  );
}
