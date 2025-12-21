// app/(cms)/cms/venues/new/page.tsx
// CMS Create Venue page
"use client";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/cms/shared/page-header";
import { VenueForm } from "@/components/cms/modules/venues/venue-form";
import { useCreateVenue } from "@/hooks/cms/use-venues";
import { toast } from "sonner";
import type { CreateVenueInput } from "@/lib/schemas/venue.schema";

export default function NewVenuePage() {
  const router = useRouter();
  const createMutation = useCreateVenue();
  
  const handleSubmit = async (data: CreateVenueInput) => {
    try {
      await createMutation.mutateAsync(data);
      toast.success("Venue created successfully");
      router.push("/cms/venues");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create venue"
      );
    }
  };
  
  return (
    <div className="space-y-8">
      <PageHeader
        title="New Venue"
        description="Add a new venue to your portfolio"
        breadcrumbs={[
          { label: "Venues", href: "/cms/venues" },
          { label: "New" },
        ]}
      />
      <div className="flex justify-center">
        <VenueForm
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending}
        />
      </div>
    </div>
  );
}