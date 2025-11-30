import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
})

// Updated metadata for Pavilion360 branding
export const metadata: Metadata = {
  title: {
    default: "Pavilion360 - Event Production, AV & Rentals in Indianapolis",
    template: "%s | Pavilion360",
  },
  description:
    "Full-service event production company in Indianapolis providing AV equipment rentals, lighting, staging, event planning, and technical direction for corporate events, weddings, galas, and festivals.",
  keywords: [
    "event production Indianapolis",
    "AV rentals",
    "event planning",
    "lighting rentals",
    "staging",
    "corporate events",
    "wedding production",
    "Indianapolis",
  ],
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

// Import header and footer components
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { QuoteBasketProvider } from "@/lib/context/quote-basket-context"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_geist.className} ${_inter.variable}`}>
      <body className={`font-sans antialiased ${_geistMono.className}`}>
        <QuoteBasketProvider>
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          <SiteHeader />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <SiteFooter />
        </QuoteBasketProvider>
      </body>
    </html>
  )
}
