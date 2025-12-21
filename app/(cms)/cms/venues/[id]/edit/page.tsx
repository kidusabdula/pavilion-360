// app/(cms)/cms/venues/[id]/edit/page.tsx
// CMS Edit Venue page
"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/cms/shared/page-header";
import { LoadingSkeleton } from "@/components/cms/shared/loading-skeleton";
import { VenueForm } from "@/components/cms/modules/venues/venue-form";
import { useVenue, useUpdateVenue } from "@/hooks/cms/use-venues";
import { toast } from "sonner";
import type { CreateVenueInput } from "@/lib/schemas/venue.schema";

interface EditVenuePageProps {
  params: Promise<{ id: string }>;
}

export default function EditVenuePage({ params }: EditVenuePageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data, isLoading, error } = useVenue(id);
  const updateMutation = useUpdateVenue();
  
  const venue = data?.data;
  
  const handleSubmit = async (formData: CreateVenueInput) => {
    try {
      await updateMutation.mutateAsync({ id, ...formData });
      toast.success("Venue updated successfully");
      router.push(`/cms/venues/${id}`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update venue"
      );
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Loading..."
          breadcrumbs={[
            { label: "Venues", href: "/cms/venues" },
            { label: "Edit" },
          ]}
        />
        <LoadingSkeleton type="form" />
      </div>
    );
  }
  
  if (error || !venue) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Error"
          breadcrumbs={[
            { label: "Venues", href: "/cms/venues" },
            { label: "Edit" },
          ]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">
            {error?.message || "Venue not found"}
          </p>
          <Button asChild className="mt-4" variant="outline">
            <Link href="/cms/venues">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Venues
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // Transform venue data for form
  const initialData: Partial<CreateVenueInput> = {
    name: venue.name,
    slug: venue.slug,
    location: venue.location ?? undefined,        // null → undefined
    city: venue.city ?? undefined,
    thumbnail_url: venue.thumbnail_url ?? undefined,
    description: venue.description ?? undefined,
    capacity_min: venue.capacity_min ?? undefined,
    capacity_max: venue.capacity_max ?? undefined,
    is_managed: venue.is_managed ?? false,
    external_link: venue.external_link ?? undefined,
    is_active: venue.is_active ?? true,
    display_order: venue.display_order ?? 0,
    seo_title: venue.seo_title ?? undefined,
    seo_description: venue.seo_description ?? undefined,
  };
  
  return (
    <div className="space-y-8">
      <PageHeader
        title={`Edit: ${venue.name}`}
        description="Update venue details"
        breadcrumbs={[
          { label: "Venues", href: "/cms/venues" },
          { label: venue.name, href: `/cms/venues/${id}` },
          { label: "Edit" },
        ]}
      />
      <div className="flex justify-center">
        <VenueForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
          isEdit
        />
      </div>
    </div>
  );
}