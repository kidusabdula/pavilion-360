// app/services/page.tsx
import { Suspense } from 'react';
import { HeroSection } from '@/components/shared/hero-section';
import { ServicesGridSkeleton } from '@/components/skeletons';
import { ServicesContent } from '@/components/services/services-content';

export const metadata = {
  title: 'Our Services - Event Production Services | Pavilion360',
  description: 'Comprehensive event solutions from concept to execution. Audio visual, event planning, creative design, and more.',
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      <HeroSection
        title="Our Services"
        subtitle="Comprehensive event solutions from concept to execution."
        backgroundImage="/professional-event-services-production.jpg"
        size="medium"
      />
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <Suspense fallback={<ServicesGridSkeleton />}>
            <ServicesContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
}