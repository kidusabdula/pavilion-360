// app/(cms)/cms/rentals/new/page.tsx
// CMS Create Rental page
"use client";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/cms/shared/page-header";
import { RentalForm } from "@/components/cms/modules/rentals/rental-form";
import { useCreateRental } from "@/hooks/cms/use-rentals";
import { toast } from "sonner";
import type { CreateRentalInput } from "@/lib/schemas/rental.schema";

export default function NewRentalPage() {
  const router = useRouter();
  const createMutation = useCreateRental();
  
  const handleSubmit = async (data: CreateRentalInput) => {
    try {
      await createMutation.mutateAsync(data);
      toast.success("Rental item created successfully");
      router.push("/cms/rentals");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create rental"
      );
    }
  };
  
  return (
    <div className="space-y-8">
      <PageHeader
        title="New Rental"
        description="Add a new rental item to your inventory"
        breadcrumbs={[
          { label: "Rentals", href: "/cms/rentals" },
          { label: "New" },
        ]}
      />
      <div className="flex justify-center">
        <RentalForm
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending}
        />
      </div>
    </div>
  );
}