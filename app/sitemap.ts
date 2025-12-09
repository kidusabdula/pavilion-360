import { MetadataRoute } from "next";
import { services } from "@/lib/data/services";
import { portfolioProjects } from "@/lib/data/portfolio";
import { venues } from "@/lib/data/venues";
import { rentalItems } from "@/lib/data/rentals";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pavilion360.events";
  const currentDate = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/rentals`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/venues`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Service pages
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Portfolio pages
  const portfolioPages: MetadataRoute.Sitemap = portfolioProjects.map(
    (project) => ({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  // Venue pages
  const venuePages: MetadataRoute.Sitemap = venues.map((venue) => ({
    url: `${baseUrl}/venues/${venue.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Rental item pages (if you have detail pages)
  const rentalPages: MetadataRoute.Sitemap = rentalItems.map((item) => ({
    url: `${baseUrl}/rentals/${item.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...portfolioPages,
    ...venuePages,
    ...rentalPages,
  ];
}
