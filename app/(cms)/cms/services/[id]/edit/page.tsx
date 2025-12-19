// app/(cms)/cms/services/[id]/edit/page.tsx
// CMS Edit Service page
"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/cms/shared/page-header";
import { LoadingSkeleton } from "@/components/cms/shared/loading-skeleton";
import { ServiceForm } from "@/components/cms/modules/services/service-form";
import { useService, useUpdateService } from "@/hooks/cms/use-services";
import { toast } from "sonner";
import type { CreateServiceInput } from "@/lib/schemas/service.schema";

interface EditServicePageProps {
  params: Promise<{ id: string }>;
}

export default function EditServicePage({ params }: EditServicePageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data, isLoading, error } = useService(id);
  const updateMutation = useUpdateService();

  const handleSubmit = async (formData: CreateServiceInput) => {
    try {
      await updateMutation.mutateAsync({ ...formData, id });
      toast.success("Service updated successfully");
      router.push(`/cms/services/${id}`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update service"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Edit Service"
          breadcrumbs={[
            { label: "Services", href: "/cms/services" },
            { label: "Edit" },
          ]}
        />
        <LoadingSkeleton type="form" />
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Service Not Found"
          breadcrumbs={[
            { label: "Services", href: "/cms/services" },
            { label: "Not Found" },
          ]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">
            {error?.message || "Service not found"}
          </p>
        </div>
      </div>
    );
  }

  const service = data.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Edit: ${service.name}`}
        description="Update service details"
        breadcrumbs={[
          { label: "Services", href: "/cms/services" },
          { label: service.name, href: `/cms/services/${id}` },
          { label: "Edit" },
        ]}
      />
      <div className="flex justify-center">
        <ServiceForm
          initialData={service}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
          isEdit
        />
      </div>
    </div>
  );
}
