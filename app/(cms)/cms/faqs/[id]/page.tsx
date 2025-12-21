// app/(cms)/cms/faqs/[id]/page.tsx
// CMS FAQ Detail page
"use client";
import { use } from "react";
import Link from "next/link";
import { Edit, ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/cms/shared/page-header";
import { LoadingSkeleton } from "@/components/cms/shared/loading-skeleton";
import { StatusBadge } from "@/components/cms/shared/status-badge";
import { useFaq } from "@/hooks/cms/use-faqs";

interface FaqPageProps {
  params: Promise<{ id: string }>;
}

export default function FaqDetailPage({ params }: FaqPageProps) {
  const { id } = use(params);
  const { data, isLoading, error } = useFaq(id);
  
  const faq = data?.data;
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Loading..."
          breadcrumbs={[
            { label: "FAQs", href: "/cms/faqs" },
            { label: "Detail" },
          ]}
        />
        <LoadingSkeleton type="detail" />
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
            { label: "Detail" },
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
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="FAQ"
        description={faq.question ? faq.question.substring(0, 100) + '...' : undefined}
        breadcrumbs={[
          { label: "FAQs", href: "/cms/faqs" },
          { label: "Detail" },
        ]}
        actions={
          <Button asChild>
            <Link href={`/cms/faqs/${faq.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        }
      />
      
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Question */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Question
            </h2>
            <p className="text-muted-foreground">{faq.question}</p>
          </div>
          
          {/* Answer */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Answer</h2>
            <p className="whitespace-pre-wrap text-muted-foreground">{faq.answer}</p>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Active</span>
                <StatusBadge status={faq.is_active ? "active" : "inactive"} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Display Order</span>
                <span className="font-medium">{faq.display_order}</span>
              </div>
            </div>
          </div>
          
          {/* Category */}
          {(faq as any).faq_categories && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Category</h2>
              <p className="font-medium">
                {(faq as any).faq_categories.name}
              </p>
            </div>
          )}
          
          {/* Metadata */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Metadata</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>
                  {new Date(faq.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated</span>
                <span>
                  {new Date(faq.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}