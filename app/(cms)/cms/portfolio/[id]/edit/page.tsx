// app/(cms)/cms/portfolio/[id]/edit/page.tsx
// CMS Edit Portfolio page
"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/cms/shared/page-header";
import { LoadingSkeleton } from "@/components/cms/shared/loading-skeleton";
import { PortfolioForm } from "@/components/cms/modules/portfolio/portfolio-form";
import { usePortfolioProject, useUpdatePortfolio } from "@/hooks/cms/use-portfolio";
import { toast } from "sonner";
import type { CreatePortfolioInput } from "@/lib/schemas/portfolio.schema";

interface EditPortfolioPageProps {
  params: Promise<{ id: string }>;
}

export default function EditPortfolioPage({ params }: EditPortfolioPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data, isLoading, error } = usePortfolioProject(id);
  const updateMutation = useUpdatePortfolio();
  
  const project = data?.data;
  
  const handleSubmit = async (formData: CreatePortfolioInput) => {
    try {
      await updateMutation.mutateAsync({ id, ...formData });
      toast.success("Portfolio project updated successfully");
      router.push(`/cms/portfolio/${id}`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update portfolio project"
      );
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Loading..."
          breadcrumbs={[
            { label: "Portfolio", href: "/cms/portfolio" },
            { label: "Edit" },
          ]}
        />
        <LoadingSkeleton type="form" />
      </div>
    );
  }
  
  if (error || !project) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Error"
          breadcrumbs={[
            { label: "Portfolio", href: "/cms/portfolio" },
            { label: "Edit" },
          ]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">
            {error?.message || "Portfolio project not found"}
          </p>
          <Button asChild className="mt-4" variant="outline">
            <Link href="/cms/portfolio">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // Transform project data for form
  const initialData: Partial<CreatePortfolioInput> = {
    title: project.title,
    slug: project.slug,
    event_type_id: project.event_type_id ?? undefined,
    venue: project.venue ?? undefined,
    event_date: project.event_date ?? undefined, // Already string in DB
    thumbnail_url: project.thumbnail_url ?? undefined,
    gallery: project.gallery ?? [], // null → empty array
    description: project.description,
    goals: project.goals ?? undefined,
    technical_highlights: project.technical_highlights ?? [],
    attendee_count: project.attendee_count ?? undefined,
    client_quote_text: project.client_quote_text ?? undefined,
    client_quote_author: project.client_quote_author ?? undefined,
    client_quote_role: project.client_quote_role ?? undefined,
    is_featured: project.is_featured ?? false,
    is_active: project.is_active ?? true,
    display_order: project.display_order ?? 0,
    seo_title: project.seo_title ?? undefined,
    seo_description: project.seo_description ?? undefined,
  };
  
  return (
    <div className="space-y-8">
      <PageHeader
        title={`Edit: ${project.title}`}
        description="Update portfolio project details"
        breadcrumbs={[
          { label: "Portfolio", href: "/cms/portfolio" },
          { label: project.title, href: `/cms/portfolio/${id}` },
          { label: "Edit" },
        ]}
      />
      <div className="flex justify-center">
        <PortfolioForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
          isEdit
        />
      </div>
    </div>
  );
}