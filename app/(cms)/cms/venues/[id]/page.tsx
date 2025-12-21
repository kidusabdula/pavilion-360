// app/(cms)/cms/venues/[id]/page.tsx
// CMS Venue Detail page
"use client";
import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, ExternalLink, ArrowLeft, MapPin, Users, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/cms/shared/page-header";
import { LoadingSkeleton } from "@/components/cms/shared/loading-skeleton";
import { StatusBadge } from "@/components/cms/shared/status-badge";
import { useVenue } from "@/hooks/cms/use-venues";

interface VenuePageProps {
  params: Promise<{ id: string }>;
}

export default function VenueDetailPage({ params }: VenuePageProps) {
  const { id } = use(params);
  const { data, isLoading, error } = useVenue(id);
  
  const venue = data?.data;
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Loading..."
          breadcrumbs={[
            { label: "Venues", href: "/cms/venues" },
            { label: "Detail" },
          ]}
        />
        <LoadingSkeleton type="detail" />
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
            { label: "Detail" },
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
  
  return (
    <div className="space-y-6">
      <PageHeader
        title={venue.name}
        description={venue.description ? venue.description.substring(0, 150) + '...' : undefined}
        breadcrumbs={[
          { label: "Venues", href: "/cms/venues" },
          { label: venue.name },
        ]}
        actions={
          <div className="flex gap-2">
            {venue.external_link && (
              <Button asChild variant="outline">
                <Link href={venue.external_link} target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Website
                </Link>
              </Button>
            )}
            <Button asChild>
              <Link href={`/cms/venues/${venue.id}/edit`}>
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
          {venue.thumbnail_url && (
            <div className="relative aspect-video overflow-hidden rounded-xl border border-border">
              <Image
                src={venue.thumbnail_url}
                alt={venue.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          {/* Description */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Description</h2>
            <p className="whitespace-pre-wrap text-muted-foreground">
              {venue.description || "No description provided."}
            </p>
          </div>
          
          {/* Location */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location
            </h2>
            <div className="space-y-2">
              {venue.location && (
                <p className="text-muted-foreground">{venue.location}</p>
              )}
              {venue.city && (
                <p className="text-muted-foreground">{venue.city}</p>
              )}
            </div>
          </div>
          
          {/* Capacity */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5" />
              Capacity
            </h2>
            <div className="text-muted-foreground">
              {venue.capacity_min && venue.capacity_max 
                ? `${venue.capacity_min} - ${venue.capacity_max} guests`
                : venue.capacity_max 
                  ? `Up to ${venue.capacity_max} guests` 
                  : 'Capacity not specified'}
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Visibility</span>
                <StatusBadge status={venue.is_active ? "active" : "inactive"} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Managed</span>
                <StatusBadge status={venue.is_managed ? "featured" : "draft"} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Display Order</span>
                <span className="font-medium">{venue.display_order}</span>
              </div>
            </div>
          </div>
          
          {/* Managed by Pavilion360 */}
          {venue.is_managed && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
                <Building className="h-5 w-5" />
                Managed by Pavilion360
              </h2>
              <p className="text-muted-foreground">
                This venue is managed by Pavilion360
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
                  {new Date(venue.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated</span>
                <span>
                  {new Date(venue.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}