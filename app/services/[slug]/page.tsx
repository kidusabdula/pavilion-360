// app/services/[slug]/page.tsx
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ServiceDetailContent } from '@/components/services/service-detail-content';
import { ServiceDetailSkeleton } from '@/components/skeletons';
import { HeroSection } from '@/components/shared/hero-section';

type Props = {
  params: Promise<{ slug: string }>;
};

async function getService(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const res = await fetch(`${baseUrl}/api/public/services/${slug}`, {
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) {
    return null;
  }
  
  const { data } = await res.json();
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  
  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }
  
  return {
    title: `${service.name} - Event Production Services | Pavilion360`,
    description: service.description,
    openGraph: {
      title: `${service.name} | Pavilion360`,
      description: service.tagline,
      type: 'website',
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getService(slug);
  
  if (!service) {
    notFound();
  }
  
  // Get first use case image for hero if available
  const heroImage = service.service_use_cases?.[0]?.image_url || service.thumbnail_url;
  
  return (
    <div className="flex flex-col">
      <HeroSection
        title={service.name}
        subtitle={service.tagline}
        backgroundImage={heroImage}
        size="medium"
      />
      <Suspense fallback={<ServiceDetailSkeleton />}>
        <ServiceDetailContent service={service} />
      </Suspense>
    </div>
  );
}