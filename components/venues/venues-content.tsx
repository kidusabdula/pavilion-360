// components/venues/venues-content.tsx
import { VenuesClientView } from "./venues-client-view";
import { adaptDbVenuesToVenues } from "@/lib/utils/venue-adapter";
import { createClient } from "@/lib/supabase/server";

async function getVenues() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("venues")
      .select(
        `
        *,
        venue_event_types(
          event_types(id, name, slug)
        )
      `
      )
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Failed to fetch venues:", error);
      return [];
    }

    return adaptDbVenuesToVenues(data || []);
  } catch (error) {
    console.error("Error fetching venues:", error);
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

export async function VenuesContent() {
  const [venues, eventTypes] = await Promise.all([
    getVenues(),
    getEventTypes(),
  ]);

  // Filter to only venue-relevant event types
  const venueEventTypes = eventTypes.filter((et: any) =>
    [
      "Corporate",
      "Wedding",
      "Gala",
      "Festival",
      "Social",
      "Nonprofit",
    ].includes(et.name)
  );

  return (
    <VenuesClientView initialVenues={venues} eventTypes={venueEventTypes} />
  );
}
