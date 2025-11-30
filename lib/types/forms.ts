import type { EventType } from "./rentals"

export interface ContactFormData {
  name: string
  company?: string
  email: string
  phone: string
  eventType: EventType
  eventDate?: string
  venue?: string
  guestCount?: number
  budgetRange?: BudgetRange
  servicesNeeded: string[]
  message: string
  rentalItems?: string[]
}

export type BudgetRange = "Under $5k" | "$5k-$10k" | "$10k-$25k" | "$25k-$50k" | "$50k-$100k" | "Over $100k"
