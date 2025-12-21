// app/(cms)/cms/rentals/[id]/edit/page.tsx
// CMS Edit Rental page
"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/cms/shared/page-header";
import { LoadingSkeleton } from "@/components/cms/shared/loading-skeleton";
import { RentalForm } from "@/components/cms/modules/rentals/rental-form";
import { useRental, useUpdateRental } from "@/hooks/cms/use-rentals";
import { toast } from "sonner";
import type { CreateRentalInput } from "@/lib/schemas/rental.schema";

interface EditRentalPageProps {
  params: Promise<{ id: string }>;
}

export default function EditRentalPage({ params }: EditRentalPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data, isLoading, error } = useRental(id);
  const updateMutation = useUpdateRental();
  
  const rental = data?.data;
  
  const handleSubmit = async (formData: CreateRentalInput) => {
    try {
      await updateMutation.mutateAsync({ id, ...formData });
      toast.success("Rental item updated successfully");
      router.push(`/cms/rentals/${id}`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update rental"
      );
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Loading..."
          breadcrumbs={[
            { label: "Rentals", href: "/cms/rentals" },
            { label: "Edit" },
          ]}
        />
        <LoadingSkeleton type="form" />
      </div>
    );
  }
  
  if (error || !rental) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Error"
          breadcrumbs={[
            { label: "Rentals", href: "/cms/rentals" },
            { label: "Edit" },
          ]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">
            {error?.message || "Rental item not found"}
          </p>
          <Button asChild className="mt-4" variant="outline">
            <Link href="/cms/rentals">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Rentals
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // Transform rental data for form
  const initialData = {
    ...rental,
    tags: [], // Will be populated from junction table if needed
    features: [], // Will be populated from specs if needed
  };
  
  return (
    <div className="space-y-8">
      <PageHeader
        title={`Edit: ${rental.name}`}
        description="Update rental item details"
        breadcrumbs={[
          { label: "Rentals", href: "/cms/rentals" },
          { label: rental.name, href: `/cms/rentals/${id}` },
          { label: "Edit" },
        ]}
      />
      <div className="flex justify-center">
        <RentalForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
          isEdit
        />
      </div>
    </div>
  );
}