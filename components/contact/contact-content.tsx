// components/contact/contact-content.tsx
import { ContactForm } from "@/components/forms/contact-form";
import { createClient } from "@/lib/supabase/server";

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

async function getServices() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .is("deleted_at", null)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Failed to fetch services:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function ContactContent() {
  const [eventTypes, services] = await Promise.all([
    getEventTypes(),
    getServices(),
  ]);

  return <ContactForm eventTypes={eventTypes} services={services} />;
}
