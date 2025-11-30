import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Equipment Rentals | Pavilion360",
  description:
    "Professional event equipment rentals in Indianapolis. AV, lighting, staging, furniture, and more. Browse our complete catalogue of 112+ rental items.",
  keywords:
    "event equipment rentals, AV rentals, lighting rentals, staging rentals, furniture rentals, Indianapolis events",
}

export default function RentalsLayout({ children }: { children: React.ReactNode }) {
  return children
}
