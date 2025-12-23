// components/portfolio/portfolio-content.tsx
import { PortfolioClientView } from "./portfolio-client-view";
import { adaptDbProjectsToProjects } from "@/lib/utils/portfolio-adapter";
import { createClient } from "@/lib/supabase/server";

async function getProjects() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("portfolio_projects")
      .select(
        `
        *,
        event_types(id, name, slug),
        portfolio_project_services(
          services(id, name, slug)
        )
      `
      )
      .eq("is_active", true)
      .is("deleted_at", null)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Failed to fetch portfolio projects:", error);
      return [];
    }

    return adaptDbProjectsToProjects(data || []);
  } catch (error) {
    console.error("Error fetching portfolio projects:", error);
    return [];
  }
}

async function getEventTypes() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("event_types")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Failed to fetch event types:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching event types:", error);
    return [];
  }
}

export async function PortfolioContent() {
  const [projects, eventTypes] = await Promise.all([
    getProjects(),
    getEventTypes(),
  ]);

  // Filter to event types that actually have projects
  const usedEventTypes = new Set(projects.map((p) => p.eventType));
  const relevantEventTypes = eventTypes.filter((et: any) =>
    usedEventTypes.has(et.name)
  );

  return (
    <PortfolioClientView
      initialProjects={projects}
      eventTypes={relevantEventTypes}
    />
  );
}
