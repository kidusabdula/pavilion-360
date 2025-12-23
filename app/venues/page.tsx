// app/venues/page.tsx
import { Suspense } from 'react';
import { HeroSection } from '@/components/shared/hero-section';
import { VenuesGridSkeleton } from '@/components/skeletons';
import { VenuesContent } from '@/components/venues/venues-content';

export const metadata = {
  title: 'Event Venues Indianapolis | Corporate, Wedding & Gala Venues | Pavilion360',
  description: 'Discover unique Indianapolis event venues managed and serviced by Pavilion360. From intimate gatherings to grand galas, find the perfect space for your event.',
};

export default function VenuesPage() {
  return (
    <div className="flex flex-col">
      <HeroSection
        title="Our Venues"
        subtitle="Unique Indianapolis event spaces managed and serviced by Pavilion360."
        backgroundImage="/elegant-event-venue-space.jpg"
        size="medium"
      />
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <Suspense fallback={<VenuesGridSkeleton />}>
            <VenuesContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
}