import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

// Enhanced metadata for Pavilion360 with OpenGraph and Twitter cards
export const metadata: Metadata = {
  metadataBase: new URL("https://pavilion360.events"),
  title: {
    default: "Pavilion360 - Event Production, AV & Rentals in Indianapolis",
    template: "%s | Pavilion360",
  },
  description:
    "Full-service event production company in Indianapolis providing AV equipment rentals, lighting, staging, event planning, and technical direction for corporate events, weddings, galas, and festivals.",
  keywords: [
    "event production Indianapolis",
    "AV rentals Indianapolis",
    "event planning Indianapolis",
    "lighting rentals",
    "staging rentals",
    "corporate events",
    "wedding production",
    "event equipment rental",
    "Indianapolis event company",
    "audio visual production",
    "event management",
    "Midwest event production",
  ],
  authors: [{ name: "Pavilion360" }],
  creator: "Pavilion360",
  publisher: "Pavilion360",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pavilion360.events",
    siteName: "Pavilion360",
    title: "Pavilion360 - Indianapolis Event Production & AV Rentals",
    description:
      "Full-service event production company providing AV equipment rentals, lighting, staging, and event planning in Indianapolis and the Midwest.",
    images: [
      {
        url: "/modern-event-venue-with-stage-lighting-and-audio-e.jpg",
        width: 1200,
        height: 630,
        alt: "Pavilion360 Event Production Setup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pavilion360 - Indianapolis Event Production & AV Rentals",
    description:
      "Full-service event production company providing AV equipment rentals, lighting, staging, and event planning.",
    images: ["/modern-event-venue-with-stage-lighting-and-audio-e.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

// Import header and footer components
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { QuoteBasketProvider } from "@/lib/context/quote-basket-context";

// Organization structured data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EventPlanner",
  "@id": "https://pavilion360.events/#organization",
  name: "Pavilion360",
  alternateName: "Pavilion 360",
  url: "https://pavilion360.events",
  logo: "https://pavilion360.events/logo.png",
  image:
    "https://pavilion360.events/modern-event-venue-with-stage-lighting-and-audio-e.jpg",
  description:
    "Full-service event production company in Indianapolis providing AV equipment rentals, lighting, staging, event planning, and technical direction.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "6002 Corporate Drive",
    addressLocality: "Indianapolis",
    addressRegion: "IN",
    postalCode: "46278",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "39.8904",
    longitude: "-86.2714",
  },
  telephone: "+1-317-456-9100",
  email: "info@pavilion360.com",
  sameAs: [
    "https://www.facebook.com/pavilion360events",
    "https://www.instagram.com/pavilion360events/",
  ],
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: "39.8904",
      longitude: "-86.2714",
    },
    geoRadius: "500000",
  },
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "16:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${_geist.className} ${_inter.variable}`}>
      <head>
        {/* Structured Data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
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
  );
}
