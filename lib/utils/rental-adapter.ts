// lib/utils/rental-adapter.ts
import type { RentalItem, EventType } from "@/lib/types/rentals";

interface DbRentalItem {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  subcategory: string | null;
  thumbnail_url: string | null;
  images?: string[] | null;
  short_description: string | null;
  description: string | null;
  details: string | null;
  specs: any; // JSONB
  is_popular: boolean | null;
  display_order: number | null;
  // New catalog fields
  collection: string | null;
  color: string | null;
  finish: string | null;
  quantity: number | null;
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

  // If no specs but we have collection/color/finish, create specs from those
  if (specs.length === 0) {
    if (dbItem.collection) specs.push(`Collection: ${dbItem.collection}`);
    if (dbItem.color) specs.push(`Color: ${dbItem.color}`);
    if (dbItem.finish) specs.push(`Finish: ${dbItem.finish}`);
  }

  return {
    id: dbItem.id,
    name: dbItem.name,
    slug: dbItem.slug,
    sku: dbItem.sku || "",
    category: dbItem.rental_categories?.name || "Uncategorized",
    subcategory: dbItem.subcategory || undefined,
    thumbnail: dbItem.thumbnail_url || "/placeholder.svg",
    images: dbItem.images || undefined,
    shortDescription: dbItem.short_description || "",
    description: dbItem.description || undefined,
    specs,
    tags,
    recommendedEventTypes: eventTypes,
    details: dbItem.details || undefined,
    popular: dbItem.is_popular ?? false,
    // New catalog fields
    collection: dbItem.collection || undefined,
    color: dbItem.color || undefined,
    finish: dbItem.finish || undefined,
    quantity: dbItem.quantity ?? undefined,
  };
}

export function adaptDbRentalsToRentals(dbItems: DbRentalItem[]): RentalItem[] {
  return dbItems.map(adaptDbRentalToRental);
}
