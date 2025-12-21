// app/(cms)/cms/rentals/[id]/page.tsx
// CMS Rental Detail page
"use client";
import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/cms/shared/page-header";
import { LoadingSkeleton } from "@/components/cms/shared/loading-skeleton";
import { StatusBadge } from "@/components/cms/shared/status-badge";
import { useRental } from "@/hooks/cms/use-rentals";

interface RentalPageProps {
  params: Promise<{ id: string }>;
}

export default function RentalDetailPage({ params }: RentalPageProps) {
  const { id } = use(params);
  const { data, isLoading, error } = useRental(id);

  const rental = data?.data;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Loading..."
          breadcrumbs={[
            { label: "Rentals", href: "/cms/rentals" },
            { label: "Detail" },
          ]}
        />
        <LoadingSkeleton type="detail" />
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
            { label: "Detail" },
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

  return (
    <div className="space-y-6">
      <PageHeader
        title={rental.name}
        description={rental.short_description || undefined}
        breadcrumbs={[
          { label: "Rentals", href: "/cms/rentals" },
          { label: rental.name },
        ]}
        actions={
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href={`/rentals/${rental.slug}`} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Live
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/cms/rentals/${rental.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Thumbnail */}
          {rental.thumbnail_url && (
            <div className="relative aspect-video overflow-hidden rounded-xl border border-border">
              <Image
                src={rental.thumbnail_url}
                alt={rental.name}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Description */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Description</h2>
            <p className="whitespace-pre-wrap text-muted-foreground">
              {rental.details ||
                rental.short_description ||
                "No description provided."}
            </p>
          </div>

          {/* Specifications */}
          {rental.specs && Object.keys(rental.specs).length > 0 && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Specifications</h2>
              <div className="grid gap-2">
                {Object.entries(rental.specs as Record<string, string>).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between border-b border-border py-2 last:border-0"
                    >
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Gallery */}
          {rental.images && rental.images.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Gallery</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {(rental.images as string[]).map((url, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-lg border border-border"
                  >
                    <Image
                      src={url}
                      alt={`${rental.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Visibility</span>
                <StatusBadge
                  status={rental.is_active ? "active" : "inactive"}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Popular</span>
                <StatusBadge
                  status={rental.is_popular ? "featured" : "draft"}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Display Order</span>
                <span className="font-medium">{rental.display_order}</span>
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Category</h2>
            <p className="font-medium">
              {(rental as any).rental_categories?.name || "Uncategorized"}
            </p>
          </div>

          {/* Metadata */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Metadata</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">SKU</span>
                <span className="font-mono">{rental.sku || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Views</span>
                <span>{rental.view_count?.toLocaleString() || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>
                  {rental.created_at
                    ? new Date(rental.created_at).toLocaleDateString()
                    : "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated</span>
                <span>
                  {rental.updated_at
                    ? new Date(rental.updated_at).toLocaleDateString()
                    : "—"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
