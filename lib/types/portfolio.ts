import type { EventType } from "./rentals"

export interface PortfolioProject {
  id: string
  slug: string
  title: string
  eventType: EventType
  venue?: string
  date: string
  thumbnail: string
  gallery: string[]
  description: string
  goals?: string
  servicesProvided: string[]
  technicalHighlights: string[]
  attendees?: number
  clientQuote?: {
    text: string
    author: string
    role: string
  }
}
