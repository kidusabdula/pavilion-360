// lib/utils/rental-adapter.ts
import type {
  RentalItem,
  RentalCategory,
  EventType,
} from "@/lib/types/rentals";

interface DbRentalItem {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  subcategory: string | null;
  thumbnail_url: string | null;
  images?: string[] | null;
  short_description: string | null;
  details: string | null;
  specs: any; // JSONB
  is_popular: boolean | null;
  display_order: number | null;
  rental_categories: {
    id: string;
    name: string;
    slug: string;
  } | null;
  rental_item_event_types?: Array<{
    event_types: {
      id: string;
      name: string;
      slug: string;
    } | null;
  }>;
  rental_item_tags?: Array<{
    tags: {
      id: string;
      name: string;
      slug: string;
    } | null;
  }>;
  relatedItems?: any[];
}

export function adaptDbRentalToRental(dbItem: DbRentalItem): RentalItem {
  // Extract event types
  const eventTypes = (dbItem.rental_item_event_types || [])
    .map((riet) => riet.event_types?.name)
    .filter(Boolean) as EventType[];

  // Extract tags
  const tags = (dbItem.rental_item_tags || [])
    .map((rit) => rit.tags?.name)
    .filter(Boolean) as string[];

  // Parse specs - could be array or object
  let specs: string[] = [];
  if (dbItem.specs) {
    if (Array.isArray(dbItem.specs)) {
      specs = dbItem.specs;
    } else if (typeof dbItem.specs === "object") {
      specs = Object.entries(dbItem.specs).map(
        ([key, value]) => `${key}: ${value}`
      );
    }
  }

  return {
    id: dbItem.id,
    name: dbItem.name,
    slug: dbItem.slug,
    sku: dbItem.sku || "",
    category: (dbItem.rental_categories?.name ||
      "Uncategorized") as RentalCategory,
    subcategory: dbItem.subcategory || undefined,
    thumbnail: dbItem.thumbnail_url || "/placeholder.svg",
    images: dbItem.images || undefined,
    shortDescription: dbItem.short_description || "",
    specs,
    tags,
    recommendedEventTypes: eventTypes,
    details: dbItem.details || undefined,
    popular: dbItem.is_popular ?? false,
  };
}

export function adaptDbRentalsToRentals(dbItems: DbRentalItem[]): RentalItem[] {
  return dbItems.map(adaptDbRentalToRental);
}
