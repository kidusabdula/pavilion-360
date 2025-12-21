// app/(cms)/cms/faqs/[id]/edit/page.tsx
// CMS Edit FAQ page
"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/cms/shared/page-header";
import { LoadingSkeleton } from "@/components/cms/shared/loading-skeleton";
import { FaqForm } from "@/components/cms/modules/faqs/faq-form";
import { useFaq, useUpdateFaq } from "@/hooks/cms/use-faqs";
import { toast } from "sonner";
import type { CreateFaqInput } from "@/lib/schemas/faq.schema";

interface EditFaqPageProps {
  params: Promise<{ id: string }>;
}

export default function EditFaqPage({ params }: EditFaqPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data, isLoading, error } = useFaq(id);
  const updateMutation = useUpdateFaq();
  
  const faq = data?.data;
  
  const handleSubmit = async (formData: CreateFaqInput) => {
    try {
      await updateMutation.mutateAsync({ id, ...formData });
      toast.success("FAQ updated successfully");
      router.push(`/cms/faqs/${id}`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update FAQ"
      );
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Loading..."
          breadcrumbs={[
            { label: "FAQs", href: "/cms/faqs" },
            { label: "Edit" },
          ]}
        />
        <LoadingSkeleton type="form" />
      </div>
    );
  }
  
  if (error || !faq) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Error"
          breadcrumbs={[
            { label: "FAQs", href: "/cms/faqs" },
            { label: "Edit" },
          ]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">
            {error?.message || "FAQ not found"}
          </p>
          <Button asChild className="mt-4" variant="outline">
            <Link href="/cms/faqs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to FAQs
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // Transform faq data for form
  const initialData: Partial<CreateFaqInput> = {
    question: faq.question,
    answer: faq.answer,
    category_id: faq.category_id,
    display_order: faq.display_order ?? 0,
    is_active: faq.is_active ?? true,
  };
  
  return (
    <div className="space-y-8">
      <PageHeader
        title={`Edit FAQ`}
        description="Update frequently asked question"
        breadcrumbs={[
          { label: "FAQs", href: "/cms/faqs" },
          { label: "Edit" },
        ]}
      />
      <div className="flex justify-center">
        <FaqForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
          isEdit
        />
      </div>
    </div>
  );
}