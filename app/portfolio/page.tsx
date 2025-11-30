"use client"

import { useState } from "react"
import { HeroSection } from "@/components/shared/hero-section"
import { PortfolioCard } from "@/components/portfolio/portfolio-card"
import { PortfolioFilter } from "@/components/portfolio/portfolio-filter"
import { portfolioProjects } from "@/lib/data/portfolio"
import type { EventType } from "@/lib/types/rentals"

export default function PortfolioPage() {
  const [filter, setFilter] = useState<EventType | "All">("All")

  const filteredProjects =
    filter === "All" ? portfolioProjects : portfolioProjects.filter((p) => p.eventType === filter)

  return (
    <div className="flex flex-col">
      <HeroSection
        title="Our Work"
        subtitle="Real events, real results. Explore our portfolio of successful productions."
        backgroundImage="/event-portfolio-showcase.jpg"
        size="medium"
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <PortfolioFilter onFilterChange={setFilter} />

          <div className="mb-4 text-sm text-muted-foreground">
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
