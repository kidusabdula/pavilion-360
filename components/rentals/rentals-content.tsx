// components/rentals/rentals-content.tsx
import { RentalsClientView } from "./rentals-client-view";
import { adaptDbRentalsToRentals } from "@/lib/utils/rental-adapter";
import { createClient } from "@/lib/supabase/server";

async function getRentals() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("rental_items")
      .select(
        `
        *,
        rental_categories(id, name, slug),
        rental_item_event_types(
          event_types(id, name, slug)
        ),
        rental_item_tags(
          tags(id, name, slug)
        )
      `
      )
      .eq("is_active", true)
      .is("deleted_at", null)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Failed to fetch rentals:", error);
      return [];
    }

    return adaptDbRentalsToRentals(data || []);
  } catch (error) {
    console.error("Error fetching rentals:", error);
    return [];
  }
}

async function getCategories() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("rental_categories")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Failed to fetch rental categories:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching rental categories:", error);
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

async function getTags() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("tags")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Failed to fetch tags:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

export async function RentalsContent() {
  const [rentals, categories, eventTypes, tags] = await Promise.all([
    getRentals(),
    getCategories(),
    getEventTypes(),
    getTags(),
  ]);

  // Extract unique tags from rentals as fallback
  const allTags =
    tags.length > 0
      ? tags.map((t: any) => t.name).sort()
      : Array.from(new Set(rentals.flatMap((r) => r.tags))).sort();

  return (
    <RentalsClientView
      initialRentals={rentals}
      categories={categories}
      eventTypes={eventTypes}
      allTags={allTags}
    />
  );
}
