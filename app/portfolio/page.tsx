// app/portfolio/page.tsx
import { Suspense } from 'react';
import { HeroSection } from '@/components/shared/hero-section';
import { PortfolioGridSkeleton } from '@/components/skeletons';
import { PortfolioContent } from '@/components/portfolio/portfolio-content';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Portfolio - Event Production Case Studies | Pavilion360',
  description: 'Real events, real results. Explore our portfolio of successful productions across Indianapolis and beyond.',
};

export default function PortfolioPage() {
  return (
    <div className="flex flex-col">
      <HeroSection
        title="Our Work"
        subtitle="Real events, real results. Explore our portfolio of successful productions across Indianapolis and beyond."
        backgroundImage="/event-portfolio-showcase.jpg"
        size="medium"
      />
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <Suspense fallback={<PortfolioGridSkeleton />}>
            <PortfolioContent />
          </Suspense>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-linear-to-b from-muted/30 to-background border-t border-border/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Create Your Own Success Story?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can bring your event vision to life with our
            full-service production capabilities.
          </p>
          <Button asChild size="lg" className="h-12 px-8 rounded-xl">
            <a href="/contact">Get a Quote</a>
          </Button>
        </div>
      </section>
    </div>
  );
}