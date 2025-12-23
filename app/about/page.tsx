import { Suspense } from "react";
import { HeroSection } from "@/components/shared/hero-section";
import { TestimonialsSkeleton } from "@/components/skeletons";
import { AboutTestimonialsSection } from "@/components/about/about-testimonials-section";
import {
  IntroSection,
  MissionSection,
  CoreValuesSection,
  TimelineSection,
  TestimonialsSectionHeader,
  CtaSection,
} from "@/components/about/about-client-sections";

export const metadata = {
  title: "About Pavilion360 | Indianapolis Event Production Company",
  description:
    "Elevating events through creativity, expertise, and unwavering dedication to excellence. Learn about our 15+ year journey in event production.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col overflow-hidden">
      <HeroSection
        title="About Pavilion360"
        subtitle="Elevating events through creativity, expertise, and unwavering dedication to excellence."
        backgroundImage="/professional-event-production-team-setup.jpg"
        size="large"
      />

      {/* Intro Section */}
      <IntroSection />

      {/* Mission Section */}
      <MissionSection />

      {/* Core Values */}
      <CoreValuesSection />

      {/* Timeline Section */}
      <TimelineSection />

      {/* Testimonials */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <TestimonialsSectionHeader />
          <Suspense fallback={<TestimonialsSkeleton />}>
            <AboutTestimonialsSection />
          </Suspense>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />
    </div>
  );
}
