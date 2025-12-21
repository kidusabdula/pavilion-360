// app/(cms)/cms/portfolio/new/page.tsx
// CMS Create Portfolio page
"use client";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/cms/shared/page-header";
import { PortfolioForm } from "@/components/cms/modules/portfolio/portfolio-form";
import { useCreatePortfolio } from "@/hooks/cms/use-portfolio";
import { toast } from "sonner";
import type { CreatePortfolioInput } from "@/lib/schemas/portfolio.schema";

export default function NewPortfolioPage() {
  const router = useRouter();
  const createMutation = useCreatePortfolio();
  
  const handleSubmit = async (data: CreatePortfolioInput) => {
    try {
      await createMutation.mutateAsync(data);
      toast.success("Portfolio project created successfully");
      router.push("/cms/portfolio");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create portfolio project"
      );
    }
  };
  
  return (
    <div className="space-y-8">
      <PageHeader
        title="New Project"
        description="Add a new project to your portfolio"
        breadcrumbs={[
          { label: "Portfolio", href: "/cms/portfolio" },
          { label: "New" },
        ]}
      />
      <div className="flex justify-center">
        <PortfolioForm
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending}
        />
      </div>
    </div>
  );
}