// lib/utils/portfolio-adapter.ts
import type { PortfolioProject } from "@/lib/types/portfolio";
import type { EventType } from "@/lib/types/rentals";

interface DbPortfolioProject {
  id: string;
  title: string;
  slug: string;
  venue: string | null;
  event_date: string | null;
  thumbnail_url: string | null;
  gallery: string[] | null;
  description: string | null;
  goals: string | null;
  technical_highlights: string[] | null;
  attendee_count: number | null;
  client_quote_text: string | null;
  client_quote_author: string | null;
  client_quote_role: string | null;
  is_featured: boolean;
  display_order: number;
  event_types: {
    id: string;
    name: string;
    slug: string;
  } | null;
  portfolio_project_services?: Array<{
    services: {
      id: string;
      name: string;
      slug: string;
      icon?: string;
    } | null;
  }>;
  relatedProjects?: any[];
}

export function adaptDbProjectToProject(
  dbProject: DbPortfolioProject
): PortfolioProject {
  // Extract service IDs from junction table
  const servicesProvided = (dbProject.portfolio_project_services || [])
    .map((pps) => pps.services?.id)
    .filter(Boolean) as string[];

  // Format date
  const formattedDate = dbProject.event_date
    ? new Date(dbProject.event_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return {
    id: dbProject.id,
    slug: dbProject.slug,
    title: dbProject.title,
    eventType: (dbProject.event_types?.name || "Corporate") as EventType,
    venue: dbProject.venue || undefined,
    date: formattedDate,
    thumbnail: dbProject.thumbnail_url || "/placeholder.svg",
    gallery: dbProject.gallery || [],
    description: dbProject.description || "",
    goals: dbProject.goals || undefined,
    servicesProvided,
    technicalHighlights: dbProject.technical_highlights || [],
    attendees: dbProject.attendee_count || undefined,
    clientQuote: dbProject.client_quote_text
      ? {
          text: dbProject.client_quote_text,
          author: dbProject.client_quote_author || "",
          role: dbProject.client_quote_role || "",
        }
      : undefined,
  };
}

export function adaptDbProjectsToProjects(
  dbProjects: DbPortfolioProject[]
): PortfolioProject[] {
  return dbProjects.map(adaptDbProjectToProject);
}

// Helper to get service objects (for detail page)
export function getServicesFromProject(
  dbProject: DbPortfolioProject
): Array<{ id: string; name: string; slug: string }> {
  return (dbProject.portfolio_project_services || [])
    .map((pps) => pps.services)
    .filter(Boolean) as Array<{ id: string; name: string; slug: string }>;
}
