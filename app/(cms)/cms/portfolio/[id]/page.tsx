// app/(cms)/cms/portfolio/[id]/page.tsx
// CMS Portfolio Detail page
"use client";
import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, ExternalLink, ArrowLeft, Calendar, MapPin, Users, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/cms/shared/page-header";
import { LoadingSkeleton } from "@/components/cms/shared/loading-skeleton";
import { StatusBadge } from "@/components/cms/shared/status-badge";
import { usePortfolio } from "@/hooks/cms/use-portfolio";

interface PortfolioPageProps {
  params: Promise<{ id: string }>;
}

export default function PortfolioDetailPage({ params }: PortfolioPageProps) {
  const { id } = use(params);
  const { data, isLoading, error } = usePortfolioProject(id);
  
  const project = data?.data;
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Loading..."
          breadcrumbs={[
            { label: "Portfolio", href: "/cms/portfolio" },
            { label: "Detail" },
          ]}
        />
        <LoadingSkeleton type="detail" />
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
            { label: "Detail" },
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
  
  return (
    <div className="space-y-6">
      <PageHeader
        title={project.title}
        description={project.description ? project.description.substring(0, 150) + '...' : undefined}
        breadcrumbs={[
          { label: "Portfolio", href: "/cms/portfolio" },
          { label: project.title },
        ]}
        actions={
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href={`/portfolio/${project.slug}`} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Live
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/cms/portfolio/${project.id}/edit`}>
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
          {project.thumbnail_url && (
            <div className="relative aspect-video overflow-hidden rounded-xl border border-border">
              <Image
                src={project.thumbnail_url}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          {/* Description */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Description</h2>
            <p className="whitespace-pre-wrap text-muted-foreground">
              {project.description || "No description provided."}
            </p>
          </div>
          
          {/* Event Details */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Event Details</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {project.venue && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{project.venue}</span>
                </div>
              )}
              {project.event_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{new Date(project.event_date).toLocaleDateString()}</span>
                </div>
              )}
              {project.attendee_count && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{project.attendee_count} attendees</span>
                </div>
              )}
              {(project as any).event_types && (
                <div className="flex items-center gap-2">
                  <span className="text-sm">Type: {(project as any).event_types.name}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Goals */}
          {project.goals && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Goals</h2>
              <p className="whitespace-pre-wrap text-muted-foreground">{project.goals}</p>
            </div>
          )}
          
          {/* Technical Highlights */}
          {project.technical_highlights && project.technical_highlights.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Technical Highlights</h2>
              <ul className="space-y-2">
                {project.technical_highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                    <span className="text-sm">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Client Testimonial */}
          {project.client_quote_text && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
                <Quote className="h-5 w-5" />
                Client Testimonial
              </h2>
              <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground mb-4">
                "{project.client_quote_text}"
              </blockquote>
              {(project.client_quote_author || project.client_quote_role) && (
                <div className="text-right">
                  <p className="font-medium">{project.client_quote_author}</p>
                  {project.client_quote_role && (
                    <p className="text-sm text-muted-foreground">{project.client_quote_role}</p>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Gallery</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {(project.gallery as string[]).map((url, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-lg border border-border"
                  >
                    <Image
                      src={url}
                      alt={`${project.title} ${index + 1}`}
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
                <StatusBadge status={project.is_active ? "active" : "inactive"} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Featured</span>
                <StatusBadge status={project.is_featured ? "featured" : "draft"} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Display Order</span>
                <span className="font-medium">{project.display_order}</span>
              </div>
            </div>
          </div>
          
          {/* Event Type */}
          {(project as any).event_types && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Event Type</h2>
              <p className="font-medium">
                {(project as any).event_types.name}
              </p>
            </div>
          )}
          
          {/* Metadata */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Metadata</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Views</span>
                <span>{project.view_count?.toLocaleString() || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>
                  {new Date(project.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated</span>
                <span>
                  {new Date(project.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}