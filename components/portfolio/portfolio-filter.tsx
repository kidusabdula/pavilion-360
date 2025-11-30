"use client"

import { useState } from "react"
import type { EventType } from "@/lib/types/rentals"

const eventTypes: (EventType | "All")[] = ["All", "Corporate", "Wedding", "Gala", "Festival", "Nonprofit", "Social"]

interface PortfolioFilterProps {
  onFilterChange: (filter: EventType | "All") => void
}

export function PortfolioFilter({ onFilterChange }: PortfolioFilterProps) {
  const [activeFilter, setActiveFilter] = useState<EventType | "All">("All")

  const handleFilterClick = (filter: EventType | "All") => {
    setActiveFilter(filter)
    onFilterChange(filter)
  }

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {eventTypes.map((type) => (
        <button
          key={type}
          onClick={() => handleFilterClick(type)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            activeFilter === type
              ? "bg-accent text-accent-foreground"
              : "border border-border bg-card text-muted-foreground hover:border-accent hover:text-accent"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  )
}
