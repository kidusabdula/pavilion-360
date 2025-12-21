// app/(cms)/cms/testimonials/new/page.tsx
// CMS Create Testimonial page
"use client";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/cms/shared/page-header";
import { TestimonialForm } from "@/components/cms/modules/testimonials/testimonial-form";
import { useCreateTestimonial } from "@/hooks/cms/use-testimonials";
import { toast } from "sonner";
import type { CreateTestimonialInput } from "@/lib/schemas/testimonial.schema";

export default function NewTestimonialPage() {
  const router = useRouter();
  const createMutation = useCreateTestimonial();
  
  const handleSubmit = async (data: CreateTestimonialInput) => {
    try {
      await createMutation.mutateAsync(data);
      toast.success("Testimonial created successfully");
      router.push("/cms/testimonials");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create testimonial"
      );
    }
  };
  
  return (
    <div className="space-y-8">
      <PageHeader
        title="New Testimonial"
        description="Add a new customer testimonial"
        breadcrumbs={[
          { label: "Testimonials", href: "/cms/testimonials" },
          { label: "New" },
        ]}
      />
      <div className="flex justify-center">
        <TestimonialForm
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending}
        />
      </div>
    </div>
  );
}