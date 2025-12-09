"use client";

import { useState, useMemo } from "react";
import { HeroSection } from "@/components/shared/hero-section";
import { services } from "@/lib/data/services";
import { ServiceCard } from "@/components/services/service-card";
import { Input } from "@/components/ui/input";
import { Search, X } from "@/components/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

// Service categories based on the types of services offered
const serviceCategories = [
  { id: "all", label: "All Services" },
  { id: "production", label: "Production" },
  { id: "rentals", label: "Rentals" },
  { id: "planning", label: "Planning" },
  { id: "creative", label: "Creative" },
];

// Map service IDs to categories
const serviceCategoryMap: Record<string, string[]> = {
  svc001: ["planning"], // Event Planning & Management
  svc002: ["creative", "production"], // Creative Design & Custom Fabrication
  svc003: ["production"], // Audio Visual Production
  svc004: ["production"], // Staging, Rigging & Lighting
  svc005: ["creative"], // Entertainment Booking
  svc006: ["rentals"], // Beverage Services
  svc007: ["planning"], // Catering Coordination
  svc008: ["rentals"], // Furniture & Soft Seating Rentals
  svc009: ["production"], // Event Production & Technical Direction
};

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          service.name.toLowerCase().includes(query) ||
          service.tagline.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query) ||
          service.whatWeDo?.some((item) => item.toLowerCase().includes(query));

        if (!matchesSearch) return false;
      }

      // Category filter
      if (activeCategory !== "all") {
        const categories = serviceCategoryMap[service.id] || [];
        if (!categories.includes(activeCategory)) return false;
      }

      return true;
    });
  }, [searchQuery, activeCategory]);

  const hasFilters = searchQuery || activeCategory !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
  };

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
          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
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

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {serviceCategories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25"
                      : "border border-border/50 bg-card/50 text-muted-foreground hover:border-accent/50 hover:text-foreground hover:bg-card"
                  }`}
                >
                  {category.label}
                </motion.button>
              );
            })}
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/30">
            <span className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filteredServices.length}
              </span>{" "}
              {filteredServices.length === 1 ? "service" : "services"}
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

          {/* Services Grid */}
          <AnimatePresence mode="wait">
            {filteredServices.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 px-4"
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                  <Search className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  No services found
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Try adjusting your search or filter to find what you're
                  looking for.
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
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <ServiceCard service={service} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
