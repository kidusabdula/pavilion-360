// components/services/services-content.tsx
import { ServiceCard } from "./service-card";
import { adaptDbServicesToServices } from "@/lib/utils/service-adapter";
import type { Service } from "@/lib/types/services";
import { createClient } from "@/lib/supabase/server";

async function getServices(): Promise<Service[]> {
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

    return adaptDbServicesToServices(data || []);
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function ServicesContent() {
  const services = await getServices();

  if (services.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-lg font-semibold mb-2">No services found</h3>
        <p className="text-muted-foreground">Please check back later.</p>
      </div>
    );
  }

  return (
    <>
      {/* Results Summary */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/30">
        <span className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {services.length}
          </span>{" "}
          {services.length === 1 ? "service" : "services"}
        </span>
      </div>
      {/* Services Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </>
  );
}
