import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio | Pavilion360",
  description:
    "Explore Pavilion360's portfolio of successful event productions in Indianapolis. Corporate events, weddings, galas, festivals, and more.",
  keywords: "event portfolio, Indianapolis events, corporate events, wedding production, event management",
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children
}
