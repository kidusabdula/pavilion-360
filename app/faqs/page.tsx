// app/faqs/page.tsx
import { Suspense } from 'react';
import { HeroSection } from '@/components/shared/hero-section';
import { FaqsSkeleton } from '@/components/skeletons';
import { FaqsContent } from '@/components/faqs/faqs-content';

export const metadata = {
  title: 'FAQs - Frequently Asked Questions | Pavilion360 Event Production',
  description: 'Quick answers to common questions about our services, rentals, pricing, and event production process.',
};

export default function FaqsPage() {
  return (
    <div className="flex flex-col">
      <HeroSection
        title="Frequently Asked Questions"
        subtitle="Quick answers to common questions about our services and process."
        backgroundImage="/event-planning-consultation.jpg"
        size="medium"
      />
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <Suspense fallback={<FaqsSkeleton />}>
            <FaqsContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
}