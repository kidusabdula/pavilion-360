import type { EventType } from "./rentals"

export interface Venue {
  id: string
  name: string
  slug: string
  location: string
  city: string
  thumbnail: string
  description: string
  capacityRange: {
    min: number
    max: number
  }
  eventTypes: EventType[]
  externalLink?: string
  managed: boolean
}
