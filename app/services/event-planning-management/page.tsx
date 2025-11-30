import type { Metadata } from "next"
import { HeroSection } from "@/components/shared/hero-section"
import { ServiceProcessSteps } from "@/components/services/service-process-steps"
import { ServicePackages } from "@/components/services/service-packages"
import { ServiceUseCases } from "@/components/services/service-use-cases"
import { CtaButton } from "@/components/shared/cta-button"
import { services } from "@/lib/data/services"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Event Planning & Management",
  description: "Strategic event planning and seamless execution for corporate events, galas, and social gatherings.",
}

export default function ServicePage() {
  const service = services.find((s) => s.slug === "event-planning-management")
  if (!service) notFound()

  return (
    <div className="flex flex-col">
      <HeroSection
        title={service.name}
        subtitle={service.tagline}
        backgroundImage="/event-planning-management.jpg"
        size="medium"
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold">What We Do</h2>
            <ul className="mb-16 space-y-3">
              {service.whatWeDo.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-1 text-accent">•</span>
                  <span className="leading-relaxed text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="mb-6 text-3xl font-bold">Use Cases</h2>
            <div className="mb-16">
              <ServiceUseCases useCases={service.useCases} />
            </div>

            <h2 className="mb-6 text-3xl font-bold">Our Process</h2>
            <div className="mb-16">
              <ServiceProcessSteps steps={service.process} />
            </div>

            {service.packages && service.packages.length > 0 && (
              <>
                <h2 className="mb-6 text-3xl font-bold">Packages</h2>
                <div className="mb-16">
                  <ServicePackages packages={service.packages} />
                </div>
              </>
            )}

            <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-muted/30 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <h3 className="mb-2 text-xl font-bold">Ready to start planning?</h3>
                <p className="text-muted-foreground">Let's discuss your event goals and create a custom plan.</p>
              </div>
              <CtaButton href="/contact" variant="primary" size="lg">
                Get a Quote
              </CtaButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
