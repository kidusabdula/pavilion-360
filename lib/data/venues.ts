import type { Venue } from "@/lib/types/venues"

export const venues: Venue[] = [
  {
    id: "ven001",
    name: "The Pavilion at Pan Am",
    slug: "pavilion-at-pan-am",
    location: "201 S Capitol Ave",
    city: "Indianapolis, IN",
    thumbnail: "/modern-event-venue-with-stage-lighting-and-audio-e.jpg",
    description:
      "A stunning glass pavilion in the heart of downtown Indianapolis, offering flexible event space with panoramic city views. Perfect for corporate events, galas, and weddings.",
    capacityRange: { min: 50, max: 300 },
    eventTypes: ["Corporate", "Gala", "Wedding", "Social"],
    managed: true,
    externalLink: "https://pavilionatpanam.com",
  },
  {
    id: "ven002",
    name: "Indiana Roof Ballroom",
    slug: "indiana-roof-ballroom",
    location: "140 W Washington St",
    city: "Indianapolis, IN",
    thumbnail: "/ivory-velvet-sofa-elegant-event-seating.jpg",
    description:
      "Historic 1927 ballroom featuring ornate Spanish architecture, crystal chandeliers, and a spacious dance floor. Ideal for elegant galas, weddings, and large receptions.",
    capacityRange: { min: 200, max: 1000 },
    eventTypes: ["Gala", "Wedding", "Corporate", "Nonprofit"],
    managed: false,
    externalLink: "https://indianaroof.com",
  },
  {
    id: "ven003",
    name: "White River State Park",
    slug: "white-river-state-park",
    location: "801 W Washington St",
    city: "Indianapolis, IN",
    thumbnail: "/outdoor-music-festival-stage-crowd.jpg",
    description:
      "Downtown urban park with multiple outdoor venues including lawns, plazas, and amphitheaters. Perfect for festivals, outdoor concerts, and community gatherings.",
    capacityRange: { min: 100, max: 5000 },
    eventTypes: ["Festival", "Corporate", "Social", "Nonprofit"],
    managed: false,
    externalLink: "https://whiteriverstateparks.org",
  },
  {
    id: "ven004",
    name: "The Crane Bay",
    slug: "the-crane-bay",
    location: "635 Massachusetts Ave",
    city: "Indianapolis, IN",
    thumbnail: "/brand-activation-3d-display.jpg",
    description:
      "Industrial-chic venue in the Mass Ave Arts District with exposed brick, high ceilings, and modern amenities. Great for corporate events, product launches, and creative gatherings.",
    capacityRange: { min: 50, max: 250 },
    eventTypes: ["Corporate", "Social", "Wedding"],
    managed: true,
    externalLink: "https://cranebay.com",
  },
]
