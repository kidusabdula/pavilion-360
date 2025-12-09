/**
 * SEO Utilities for Pavilion360
 * Generates structured data (JSON-LD) for various content types
 */

import type { Service } from "@/lib/types/services";
import type { PortfolioProject } from "@/lib/types/portfolio";
import type { Venue } from "@/lib/types/venues";

const BASE_URL = "https://pavilion360.events";

/**
 * Generate Service structured data
 */
export function generateServiceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/services/${service.slug}#service`,
    name: service.name,
    description: service.description,
    provider: {
      "@type": "EventPlanner",
      name: "Pavilion360",
      url: BASE_URL,
    },
    areaServed: {
      "@type": "City",
      name: "Indianapolis",
      "@id": "https://www.wikidata.org/wiki/Q6346",
    },
    serviceType: service.name,
    url: `${BASE_URL}/services/${service.slug}`,
  };
}

/**
 * Generate Event (Portfolio Project) structured data
 */
export function generateEventSchema(project: PortfolioProject) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${BASE_URL}/portfolio/${project.slug}#event`,
    name: project.title,
    description: project.description,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: project.venue
      ? {
          "@type": "Place",
          name: project.venue,
          address: {
            "@type": "PostalAddress",
            addressLocality: project.venue,
          },
        }
      : undefined,
    image: project.thumbnail ? `${BASE_URL}${project.thumbnail}` : undefined,
    organizer: {
      "@type": "EventPlanner",
      name: "Pavilion360",
      url: BASE_URL,
    },
  };
}

/**
 * Generate Place (Venue) structured data
 */
export function generateVenueSchema(venue: Venue) {
  return {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    "@id": `${BASE_URL}/venues/${venue.slug}#venue`,
    name: venue.name,
    description: venue.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: venue.location,
      addressLocality: venue.city.split(",")[0].trim(),
      addressRegion: "IN",
      addressCountry: "US",
    },
    maximumAttendeeCapacity: venue.capacityRange.max,
    image: venue.thumbnail ? `${BASE_URL}${venue.thumbnail}` : undefined,
    url: venue.externalLink || `${BASE_URL}/venues/${venue.slug}`,
  };
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Product (Rental Item) structured data
 */
export function generateProductSchema(item: {
  name: string;
  description: string;
  sku: string;
  category: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description: item.description,
    sku: item.sku,
    category: item.category,
    image: item.image ? `${BASE_URL}${item.image}` : undefined,
    brand: {
      "@type": "Brand",
      name: "Pavilion360",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      seller: {
        "@type": "EventPlanner",
        name: "Pavilion360",
      },
    },
  };
}

/**
 * Generate Article (Blog Post) structured data
 */
export function generateArticleSchema(article: {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  category: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: "Pavilion360",
    },
    publisher: {
      "@type": "Organization",
      name: "Pavilion360",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    image: article.image ? `${BASE_URL}${article.image}` : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${article.slug}`,
    },
  };
}

/**
 * Generate LocalBusiness structured data for contact page
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#localbusiness`,
    name: "Pavilion360",
    image: `${BASE_URL}/modern-event-venue-with-stage-lighting-and-audio-e.jpg`,
    telephone: "+1-317-456-9100",
    email: "info@pavilion360.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "6002 Corporate Drive",
      addressLocality: "Indianapolis",
      addressRegion: "IN",
      postalCode: "46278",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "39.8904",
      longitude: "-86.2714",
    },
    url: BASE_URL,
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "16:00",
      },
    ],
  };
}
