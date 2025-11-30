import type { Metadata } from "next"
import { HeroSection } from "@/components/shared/hero-section"
import { venues } from "@/lib/data/venues"
import { VenueCard } from "@/components/venues/venue-card"

export const metadata: Metadata = {
  title: "Event Venues",
  description: "Explore Pavilion360 venues in Indianapolis for corporate events, weddings, and private gatherings.",
}

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
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
