export interface RentalItem {
  id: string
  name: string
  slug: string
  sku: string
  category: RentalCategory
  subcategory?: string
  thumbnail: string
  images?: string[]
  shortDescription: string
  specs: string[]
  tags: string[]
  recommendedEventTypes: EventType[]
  details?: string
  popular?: boolean
}

export type RentalCategory =
  | "Lounge Furniture"
  | "Bars & Shelves"
  | "Tables"
  | "Seating"
  | "Room Dividers"
  | "Pipe & Drape"
  | "Flooring"
  | "Staging"
  | "Trussing"
  | "Crowd Control"
  | "Audio Visual"
  | "Special Effects"
  | "Live Entertainment"
  | "Scenic Decor"
  | "Food & Beverage"

export type EventType = "Corporate" | "Wedding" | "Gala" | "Festival" | "Nonprofit" | "Social"
