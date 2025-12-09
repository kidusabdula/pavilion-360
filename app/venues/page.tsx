"use client";

import { useState, useMemo } from "react";
import { HeroSection } from "@/components/shared/hero-section";
import { venues } from "@/lib/data/venues";
import { VenueCard } from "@/components/venues/venue-card";
import { Input } from "@/components/ui/input";
import { Search, X, Users } from "@/components/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { EventType } from "@/lib/types/rentals";

// Capacity ranges for filtering
const capacityFilters = [
  { id: "all", label: "Any Size", min: 0, max: Infinity },
  { id: "small", label: "Up to 100", min: 0, max: 100 },
  { id: "medium", label: "100-300", min: 100, max: 300 },
  { id: "large", label: "300-1000", min: 300, max: 1000 },
  { id: "xlarge", label: "1000+", min: 1000, max: Infinity },
];

// Event types from venue data
const venueEventTypes: (EventType | "All")[] = [
  "All",
  "Corporate",
  "Wedding",
  "Gala",
  "Festival",
  "Social",
];

export default function VenuesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCapacity, setActiveCapacity] = useState("all");
  const [activeEventType, setActiveEventType] = useState<EventType | "All">(
    "All"
  );

  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          venue.name.toLowerCase().includes(query) ||
          venue.description.toLowerCase().includes(query) ||
          venue.city.toLowerCase().includes(query) ||
          venue.location.toLowerCase().includes(query);

        if (!matchesSearch) return false;
      }

      // Capacity filter
      if (activeCapacity !== "all") {
        const filter = capacityFilters.find((f) => f.id === activeCapacity);
        if (filter) {
          // Check if venue's capacity range overlaps with filter range
          const venueMin = venue.capacityRange.min;
          const venueMax = venue.capacityRange.max;
          if (venueMax < filter.min || venueMin > filter.max) return false;
        }
      }

      // Event type filter
      if (activeEventType !== "All") {
        if (!venue.eventTypes.includes(activeEventType)) return false;
      }

      return true;
    });
  }, [searchQuery, activeCapacity, activeEventType]);

  const hasFilters =
    searchQuery || activeCapacity !== "all" || activeEventType !== "All";

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCapacity("all");
    setActiveEventType("All");
  };

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
          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search venues by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-11 h-12 text-base rounded-xl border-border/50 focus:border-accent transition-all bg-card"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Filter Section */}
          <div className="space-y-4 mb-10">
            {/* Event Type Filter */}
            <div>
              <p className="text-xs text-muted-foreground mb-3 text-center uppercase tracking-wider">
                Event Type
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {venueEventTypes.map((type) => {
                  const isActive = activeEventType === type;
                  return (
                    <motion.button
                      key={type}
                      onClick={() => setActiveEventType(type)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25"
                          : "border border-border/50 bg-card/50 text-muted-foreground hover:border-accent/50 hover:text-foreground"
                      }`}
                    >
                      {type === "All" ? "All Events" : type}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Capacity Filter */}
            <div>
              <p className="text-xs text-muted-foreground mb-3 text-center uppercase tracking-wider flex items-center justify-center gap-1">
                <Users className="h-3 w-3" />
                Guest Capacity
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {capacityFilters.map((filter) => {
                  const isActive = activeCapacity === filter.id;
                  return (
                    <motion.button
                      key={filter.id}
                      onClick={() => setActiveCapacity(filter.id)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25"
                          : "border border-border/50 bg-card/50 text-muted-foreground hover:border-accent/50 hover:text-foreground"
                      }`}
                    >
                      {filter.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/30">
            <span className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filteredVenues.length}
              </span>{" "}
              {filteredVenues.length === 1 ? "venue" : "venues"}
            </span>
            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs text-muted-foreground hover:text-accent h-7"
              >
                Clear filters
              </Button>
            )}
          </div>

          {/* Venues Grid */}
          <AnimatePresence mode="wait">
            {filteredVenues.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 px-4"
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                  <Search className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No venues found</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Try adjusting your search or filters to find a venue that
                  matches your needs.
                </p>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="rounded-xl"
                >
                  Clear all filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredVenues.map((venue, index) => (
                  <motion.div
                    key={venue.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <VenueCard venue={venue} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 pt-16 border-t border-border/30 text-center"
          >
            <h3 className="text-xl font-semibold mb-3">
              Don't see the perfect venue?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              We work with venues throughout Indianapolis and the Midwest. Tell
              us about your event and we'll help you find the ideal space.
            </p>
            <Button asChild size="lg" className="rounded-xl">
              <a href="/contact">Get Venue Recommendations</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
