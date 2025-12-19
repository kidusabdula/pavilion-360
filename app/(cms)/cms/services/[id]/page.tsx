// app/(cms)/cms/services/[id]/page.tsx
// CMS Service detail page
'use client';
import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pencil, ExternalLink, Eye, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/cms/shared/page-header';
import { LoadingSkeleton } from '@/components/cms/shared/loading-skeleton';
import { StatusBadge } from '@/components/cms/shared/status-badge';
import { useService } from '@/hooks/cms/use-services';
import { format } from 'date-fns';

interface ServiceDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { id } = use(params);
  const { data, isLoading, error } = useService(id);
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton type="detail" />
      </div>
    );
  }
  
  if (error || !data?.data) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Service Not Found"
          breadcrumbs={[
            { label: 'Services', href: '/cms/services' },
            { label: 'Not Found' },
          ]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">
            {error?.message || 'Service not found'}
          </p>
        </div>
      </div>
    );
  }
  
  const service = data.data;
  
  return (
    <div className="space-y-6">
      <PageHeader
        title={service.name}
        description={service.tagline || undefined}
        breadcrumbs={[
          { label: 'Services', href: '/cms/services' },
          { label: service.name },
        ]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/services/${service.slug}`} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Live
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/cms/services/${id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
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
          {service.thumbnail_url && (
            <div className="relative aspect-video overflow-hidden rounded-xl border border-border">
              <Image
                src={service.thumbnail_url}
                alt={service.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          {/* Description */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Description</h2>
            <p className="whitespace-pre-wrap text-muted-foreground">
              {service.description}
            </p>
          </div>
          
          {/* What We Do */}
          {service.what_we_do && service.what_we_do.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">What We Do</h2>
              <ul className="space-y-2">
                {service.what_we_do.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Use Cases */}
          {service.use_cases && service.use_cases.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Use Cases</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {service.use_cases.map((useCase) => (
                  <div
                    key={useCase.id}
                    className="rounded-lg border border-border bg-muted/30 p-4"
                  >
                    <h3 className="font-medium">{useCase.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {useCase.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Process Steps */}
          {service.process_steps && service.process_steps.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Process</h2>
              <div className="space-y-4">
                {service.process_steps.map((step) => (
                  <div key={step.id} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                      {step.step_number}
                    </div>
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
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
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <StatusBadge
                  status={service.is_active ? 'active' : 'inactive'}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Views</span>
                <div className="flex items-center gap-1 text-sm">
                  <Eye className="h-4 w-4" />
                  {service.view_count?.toLocaleString() || 0}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Order</span>
                <span className="text-sm">{service.display_order}</span>
              </div>
            </div>
          </div>
          
          {/* Meta Card */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Details</h2>
            <div className="space-y-4 text-sm">
              <div>
                <span className="text-muted-foreground">Slug</span>
                <p className="mt-1 font-mono text-xs">{service.slug}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Icon</span>
                <p className="mt-1">{service.icon}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Created</span>
                <div className="mt-1 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {service.created_at
                    ? format(new Date(service.created_at), 'MMM d, yyyy')
                    : '—'}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Updated</span>
                <div className="mt-1 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {service.updated_at
                    ? format(new Date(service.updated_at), 'MMM d, yyyy')
                    : '—'}
                </div>
              </div>
            </div>
          </div>
          
          {/* SEO Card */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">SEO</h2>
            <div className="space-y-4 text-sm">
              <div>
                <span className="text-muted-foreground">Title</span>
                <p className="mt-1">{service.seo_title || service.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Description</span>
                <p className="mt-1 text-muted-foreground">
                  {service.seo_description || 'Not set'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}