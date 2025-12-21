// app/(cms)/cms/testimonials/[id]/page.tsx
// CMS Testimonial Detail page
"use client";
import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, ArrowLeft, Quote, Building, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/cms/shared/page-header";
import { LoadingSkeleton } from "@/components/cms/shared/loading-skeleton";
import { StatusBadge } from "@/components/cms/shared/status-badge";
import { useTestimonial } from "@/hooks/cms/use-testimonials";

interface TestimonialPageProps {
  params: Promise<{ id: string }>;
}

export default function TestimonialDetailPage({ params }: TestimonialPageProps) {
  const { id } = use(params);
  const { data, isLoading, error } = useTestimonial(id);
  
  const testimonial = data?.data;
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Loading..."
          breadcrumbs={[
            { label: "Testimonials", href: "/cms/testimonials" },
            { label: "Detail" },
          ]}
        />
        <LoadingSkeleton type="detail" />
      </div>
    );
  }
  
  if (error || !testimonial) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Error"
          breadcrumbs={[
            { label: "Testimonials", href: "/cms/testimonials" },
            { label: "Detail" },
          ]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">
            {error?.message || "Testimonial not found"}
          </p>
          <Button asChild className="mt-4" variant="outline">
            <Link href="/cms/testimonials">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Testimonials
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Testimonial"
        description={testimonial.author_name}
        breadcrumbs={[
          { label: "Testimonials", href: "/cms/testimonials" },
          { label: "Detail" },
        ]}
        actions={
          <Button asChild>
            <Link href={`/cms/testimonials/${testimonial.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        }
      />
      
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Author Image */}
          {testimonial.author_image_url && (
            <div className="relative aspect-square w-32 h-32 overflow-hidden rounded-xl border border-border mx-auto">
              <Image
                src={testimonial.author_image_url}
                alt={testimonial.author_name}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          {/* Quote */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
              <Quote className="h-5 w-5" />
              Testimonial
            </h2>
            <blockquote className="text-lg italic text-muted-foreground">
              "{testimonial.quote}"
            </blockquote>
          </div>
          
          {/* Author Information */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Author Information
            </h2>
            <div className="space-y-2">
              <p className="font-medium text-lg">{testimonial.author_name}</p>
              {testimonial.author_role && (
                <p className="text-muted-foreground">{testimonial.author_role}</p>
              )}
              {testimonial.company && (
                <p className="text-muted-foreground flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  {testimonial.company}
                </p>
              )}
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
                <span className="text-muted-foreground">Featured</span>
                <StatusBadge status={testimonial.is_featured ? "featured" : "draft"} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Active</span>
                <StatusBadge status={testimonial.is_active ? "active" : "inactive"} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Display Order</span>
                <span className="font-medium">{testimonial.display_order}</span>
              </div>
            </div>
          </div>
          
          {/* Portfolio Project */}
          {(testimonial as any).portfolio_projects && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Related Project</h2>
              <p className="font-medium">
                {(testimonial as any).portfolio_projects.title}
              </p>
              <Button asChild className="mt-2" variant="outline" size="sm">
                <Link href={`/cms/portfolio/${(testimonial as any).portfolio_projects.id}`}>
                  View Project
                </Link>
              </Button>
            </div>
          )}
          
          {/* Metadata */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Metadata</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>
                  {new Date(testimonial.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated</span>
                <span>
                  {new Date(testimonial.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}