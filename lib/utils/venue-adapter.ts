// lib/utils/venue-adapter.ts
import type { Venue } from "@/lib/types/venues";
import type { EventType } from "@/lib/types/rentals";

interface DbVenue {
  id: string;
  name: string;
  slug: string;
  location: string | null;
  thumbnail_url: string | null;
  description: string | null;
  capacity_min: number | null;
  capacity_max: number | null;
  is_managed: boolean | null;
  external_link: string | null;
  display_order: number | null;
  venue_event_types?: Array<{
    event_types: {
      id: string;
      name: string;
      slug: string;
    } | null;
  }>;
}

export function adaptDbVenueToVenue(dbVenue: DbVenue): Venue {
  // Extract event types
  const eventTypes = (dbVenue.venue_event_types || [])
    .map((vet) => vet.event_types?.name)
    .filter(Boolean) as EventType[];

  // Parse location to extract city (assuming format "Address, City, State")
  const locationParts = (dbVenue.location || "")
    .split(",")
    .map((s) => s.trim());
  const city =
    locationParts.length >= 2
      ? locationParts.slice(1).join(", ")
      : "Indianapolis, IN";

  return {
    id: dbVenue.id,
    name: dbVenue.name,
    slug: dbVenue.slug,
    location: dbVenue.location || "",
    city,
    thumbnail: dbVenue.thumbnail_url || "/placeholder.svg",
    description: dbVenue.description || "",
    capacityRange: {
      min: dbVenue.capacity_min || 0,
      max: dbVenue.capacity_max || 0,
    },
    eventTypes,
    externalLink: dbVenue.external_link || undefined,
    managed: dbVenue.is_managed ?? false,
  };
}

export function adaptDbVenuesToVenues(dbVenues: DbVenue[]): Venue[] {
  return dbVenues.map(adaptDbVenueToVenue);
}
