import type { Metadata } from "next"
import { HeroSection } from "@/components/shared/hero-section"
import { services } from "@/lib/data/services"
import { ServiceCard } from "@/components/services/service-card"

export const metadata: Metadata = {
  title: "Event Services",
  description:
    "Comprehensive event services including planning, AV production, staging, catering coordination, and more from Pavilion360 in Indianapolis.",
}

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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
