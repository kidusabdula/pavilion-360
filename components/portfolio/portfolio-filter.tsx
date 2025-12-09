"use client";

import { useState } from "react";
import type { EventType } from "@/lib/types/rentals";
import { motion } from "framer-motion";

const eventTypes: (EventType | "All")[] = [
  "All",
  "Corporate",
  "Wedding",
  "Gala",
  "Festival",
  "Concert",
  "Social",
];

interface PortfolioFilterProps {
  onFilterChange: (filter: EventType | "All") => void;
}

export function PortfolioFilter({ onFilterChange }: PortfolioFilterProps) {
  const [activeFilter, setActiveFilter] = useState<EventType | "All">("All");

  const handleFilterClick = (filter: EventType | "All") => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="mb-10">
      {/* Section heading */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Filter by Event Type
        </h2>
        {activeFilter !== "All" && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => handleFilterClick("All")}
            className="text-xs text-accent hover:underline"
          >
            Clear filter
          </motion.button>
        )}
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {eventTypes.map((type) => {
          const isActive = activeFilter === type;
          return (
            <motion.button
              key={type}
              onClick={() => handleFilterClick(type)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25"
                  : "border border-border/50 bg-card/50 text-muted-foreground hover:border-accent/50 hover:text-foreground hover:bg-card"
              }`}
            >
              {/* Active indicator glow */}
              {isActive && (
                <motion.span
                  layoutId="activeFilter"
                  className="absolute inset-0 rounded-full bg-accent -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {type === "All" ? "All Projects" : type}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
