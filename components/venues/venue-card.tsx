"use client";

import Image from "next/image";
import type { Venue } from "@/lib/types/venues";
import { motion } from "framer-motion";
import { MapPin, Users, ArrowRight } from "@/components/icons";

interface VenueCardProps {
  venue: Venue;
}

export function VenueCard({ venue }: VenueCardProps) {
  // Generate SEO-friendly alt text
  const altText = `${venue.name} - Event venue in ${venue.city} - ${venue.capacityRange.min}-${venue.capacityRange.max} guests`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <div className="group h-full overflow-hidden rounded-xl border border-border/50 bg-linear-to-b from-card to-card/80 transition-all duration-500 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10">
        {/* Image Container */}
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={venue.thumbnail || "/placeholder.svg"}
            alt={altText}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-700 group-hover:scale-110"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent" />

          {/* Location badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium backdrop-blur-sm shadow-lg">
              <MapPin className="h-3 w-3 text-accent" />
              {venue.city}
            </span>
          </div>

          {/* Capacity badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/90 px-3 py-1.5 text-xs font-semibold text-accent-foreground backdrop-blur-sm shadow-lg">
              <Users className="h-3 w-3" />
              {venue.capacityRange.min}-{venue.capacityRange.max}
            </span>
          </div>

          {/* Title overlay on image */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg group-hover:text-accent transition-colors duration-300">
              {venue.name}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {venue.location}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2 mb-5">
            {venue.description}
          </p>

          {/* Action */}
          {venue.externalLink ? (
            <motion.a
              href={venue.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Learn more about ${venue.name} (opens in new tab)`}
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline group/link"
            >
              Explore Venue
              <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
            </motion.a>
          ) : (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
              Contact for details
            </span>
          )}
        </div>

        {/* Bottom accent line */}
        <div className="h-0.5 bg-linear-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent transition-all duration-500" />
      </div>
    </motion.div>
  );
}
