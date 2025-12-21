// app/(cms)/cms/testimonials/[id]/edit/page.tsx
// CMS Edit Testimonial page
"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/cms/shared/page-header";
import { LoadingSkeleton } from "@/components/cms/shared/loading-skeleton";
import { TestimonialForm } from "@/components/cms/modules/testimonials/testimonial-form";
import { useTestimonial, useUpdateTestimonial } from "@/hooks/cms/use-testimonials";
import { toast } from "sonner";
import type { CreateTestimonialInput } from "@/lib/schemas/testimonial.schema";

interface EditTestimonialPageProps {
  params: Promise<{ id: string }>;
}

export default function EditTestimonialPage({ params }: EditTestimonialPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data, isLoading, error } = useTestimonial(id);
  const updateMutation = useUpdateTestimonial();
  
  const testimonial = data?.data;
  
  const handleSubmit = async (formData: CreateTestimonialInput) => {
    try {
      await updateMutation.mutateAsync({ id, ...formData });
      toast.success("Testimonial updated successfully");
      router.push(`/cms/testimonials/${id}`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update testimonial"
      );
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Loading..."
          breadcrumbs={[
            { label: "Testimonials", href: "/cms/testimonials" },
            { label: "Edit" },
          ]}
        />
        <LoadingSkeleton type="form" />
      </div>
    );
  }
  
  if (error || !testimonial) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Error"
          breadcrumbs={[
            { label: "Testimonials", href: "/cms/testimonials" },
            { label: "Edit" },
          ]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">
            {error?.message || "Testimonial not found"}
          </p>
          <Button asChild className="mt-4" variant="outline">
            <Link href="/cms/testimonials">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Testimonials
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // Transform testimonial data for form
  const initialData: Partial<CreateTestimonialInput> = {
    quote: testimonial.quote,
    author_name: testimonial.author_name,
    author_role: testimonial.author_role ?? undefined,
    company: testimonial.company ?? undefined,
    author_image_url: testimonial.author_image_url ?? undefined,
    portfolio_project_id: testimonial.portfolio_project_id ?? undefined,
    is_featured: testimonial.is_featured ?? false,
    is_active: testimonial.is_active ?? true,
    display_order: testimonial.display_order ?? 0,
  };
  
  return (
    <div className="space-y-8">
      <PageHeader
        title={`Edit Testimonial`}
        description="Update customer testimonial"
        breadcrumbs={[
          { label: "Testimonials", href: "/cms/testimonials" },
          { label: "Edit" },
        ]}
      />
      <div className="flex justify-center">
        <TestimonialForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
          isEdit
        />
      </div>
    </div>
  );
}