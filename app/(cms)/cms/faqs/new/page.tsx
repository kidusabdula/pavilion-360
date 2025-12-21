// app/(cms)/cms/faqs/new/page.tsx
// CMS Create FAQ page
"use client";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/cms/shared/page-header";
import { FaqForm } from "@/components/cms/modules/faqs/faq-form";
import { useCreateFaq } from "@/hooks/cms/use-faqs";
import { toast } from "sonner";
import type { CreateFaqInput } from "@/lib/schemas/faq.schema";

export default function NewFaqPage() {
  const router = useRouter();
  const createMutation = useCreateFaq();
  
  const handleSubmit = async (data: CreateFaqInput) => {
    try {
      await createMutation.mutateAsync(data);
      toast.success("FAQ created successfully");
      router.push("/cms/faqs");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create FAQ"
      );
    }
  };
  
  return (
    <div className="space-y-8">
      <PageHeader
        title="New FAQ"
        description="Add a new frequently asked question"
        breadcrumbs={[
          { label: "FAQs", href: "/cms/faqs" },
          { label: "New" },
        ]}
      />
      <div className="flex justify-center">
        <FaqForm
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending}
        />
      </div>
    </div>
  );
}