// app/page.tsx
import { Suspense } from "react";
import { HeroSection } from "@/components/shared/hero-section";
import { InstagramFeed } from "@/components/shared/instagram-feed";
import {
  StatsBar,
  CoreServicesSection,
  WhoWeServeSection,
  WhyChooseUsSection,
  CtaSection,
} from "@/components/home";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { TestimonialsSkeleton } from "@/components/skeletons";
import { CtaButton } from "@/components/shared/cta-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export default function HomePage() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <HeroSection
        title={
          <span className="leading-tight">
            Crafting Unforgettable{" "}
            <span className="text-accent relative inline-block">
              Experiences
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-accent opacity-40"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                />
              </svg>
            </span>{" "}
            for Every Occasion
          </span>
        }
        subtitle="Pavilion 360 is more than just an event rental and production company. We transform any event into a lasting experience with high quality products, creative in-house design, and affordable solutions."
        backgroundImage="/modern-event-venue-with-stage-lighting-and-audio-e.jpg"
        size="large"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <CtaButton
            href="https://www.flipsnack.com/5FC9CCDD75E/indy-pavilion-2023-catalog-7tmyh1rqwd/full-view.html"
            variant="primary"
            icon={ArrowRight}
            size="lg"
            className="shadow-xl shadow-accent/20"
          >
            Check Out Our 2025 Catalog
          </CtaButton>
          <Button
            asChild
            size="lg"
            className="bg-yellow-400 text-black hover:bg-black hover:text-yellow-400 transition-all duration-300 h-12 px-8 rounded-xl font-bold shadow-lg"
          >
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>
      </HeroSection>

      {/* Stats Bar */}
      <StatsBar />

      {/* Core Services */}
      <CoreServicesSection />

      {/* Who We Serve */}
      <WhoWeServeSection />

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* Testimonials - Server Component with Suspense */}
      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsSection />
      </Suspense>

      {/* Instagram Feed */}
      <InstagramFeed />

      {/* CTA Section */}
      <CtaSection />
    </div>
  );
}
