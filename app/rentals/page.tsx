// app/rentals/page.tsx
import { Suspense } from 'react';
import { HeroSection } from '@/components/shared/hero-section';
import { RentalsGridSkeleton } from '@/components/skeletons';
import { RentalsContent } from '@/components/rentals/rentals-content';

export const metadata = {
  title: 'Equipment Rentals - AV, Lighting, Staging & Furniture | Pavilion360',
  description: 'Professional-grade AV, lighting, staging, and furniture rentals for any event. Browse our extensive inventory.',
};

export default function RentalsPage() {
  return (
    <div className="flex flex-col">
      <HeroSection
        title="Equipment Rentals"
        subtitle="Professional-grade AV, lighting, staging, and furniture rentals for any event."
        backgroundImage="/event-equipment-rentals.jpg"
        size="medium"
      />
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <Suspense fallback={<RentalsGridSkeleton />}>
            <RentalsContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
}