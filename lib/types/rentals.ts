export interface RentalItem {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: string;
  subcategory?: string;
  thumbnail: string;
  images?: string[];
  shortDescription: string;
  description?: string;
  specs: string[];
  tags: string[];
  recommendedEventTypes: EventType[];
  details?: string;
  popular?: boolean;
  // New catalog fields
  collection?: string;
  color?: string;
  finish?: string;
  quantity?: number;
}

export type RentalCategory =
  | "Audio"
  | "Barricades"
  | "Bars & Shelves"
  | "Decks & Staging"
  | "Effects"
  | "Food & Beverage"
  | "Lighting"
  | "Miscellaneous"
  | "Seating"
  | "Trussing"
  | "Video"
  | string; // Allow dynamic categories

export type EventType =
  | "Corporate"
  | "Wedding"
  | "Gala"
  | "Festival"
  | "Social"
  | "Concert"
  | "Outdoor"
  | string; // Allow dynamic event types
