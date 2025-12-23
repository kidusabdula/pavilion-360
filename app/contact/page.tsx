// app/contact/page.tsx
import { Suspense } from "react";
import Script from "next/script";
import Link from "next/link";
import { HeroSection } from "@/components/shared/hero-section";
import { ContactFormSkeleton } from "@/components/skeletons";
import { ContactContent } from "@/components/contact/contact-content";
import { COMPANY_INFO } from "@/lib/constants/company";
import { generateLocalBusinessSchema } from "@/lib/utils/seo";
import { Mail, Phone, MapPin, Calendar } from "@/components/icons";

export const metadata = {
  title: "Contact Us | Pavilion360 Event Production Indianapolis",
  description:
    "Ready to bring your event vision to life? Contact Pavilion360 for a custom quote. Indianapolis event production, rentals, and planning services.",
};

export default function ContactPage() {
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <div className="flex flex-col">
      {/* LocalBusiness Structured Data */}
      <Script
        id="localbusiness-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      <HeroSection
        title="Get in Touch"
        subtitle="Ready to bring your event vision to life? Contact us today."
        backgroundImage="/modern-event-venue-with-stage-lighting-and-audio-e.jpg"
        size="medium"
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-5">
            {/* Contact Info - 2 columns */}
            <div className="lg:col-span-2">
              <h2 className="mb-8 text-2xl font-bold">Contact Information</h2>

              <div className="space-y-6">
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 hover:translate-x-1"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="mb-1 font-semibold">Phone</p>
                    <p className="text-muted-foreground hover:text-accent transition-colors">
                      {COMPANY_INFO.phone}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 hover:translate-x-1"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="mb-1 font-semibold">Email</p>
                    <p className="text-muted-foreground hover:text-accent transition-colors">
                      {COMPANY_INFO.email}
                    </p>
                  </div>
                </a>

                <a
                  href={COMPANY_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 hover:translate-x-1"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="mb-1 font-semibold">Address</p>
                    <p className="text-muted-foreground">
                      {COMPANY_INFO.address.street}
                      <br />
                      {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state}{" "}
                      {COMPANY_INFO.address.zip}
                    </p>
                    <p className="text-xs text-accent mt-1">
                      View on Google Maps →
                    </p>
                  </div>
                </a>

                {/* Business Hours */}
                <div className="mt-8 rounded-xl border border-accent/20 bg-accent/5 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold">Business Hours</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {COMPANY_INFO.hours.weekdays.days}
                      </span>
                      <span className="font-medium">
                        {COMPANY_INFO.hours.weekdays.hours}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {COMPANY_INFO.hours.saturday.days}
                      </span>
                      <span className="font-medium">
                        {COMPANY_INFO.hours.saturday.hours}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {COMPANY_INFO.hours.sunday.days}
                      </span>
                      <span className="font-medium">
                        {COMPANY_INFO.hours.sunday.hours}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick response note */}
                <p className="text-sm text-muted-foreground mt-6 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  We typically respond within {COMPANY_INFO.responseTime}
                </p>
              </div>
            </div>

            {/* Form - 3 columns */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border/50 bg-linear-to-b from-card to-card/80 p-8 lg:p-10 shadow-lg">
                <h2 className="mb-2 text-2xl font-bold">Request a Quote</h2>
                <p className="text-muted-foreground mb-8">
                  Tell us about your event and we'll get back to you with a
                  customized proposal.
                </p>

                <Suspense fallback={<ContactFormSkeleton />}>
                  <ContactContent />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="border-t border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3">Visit Our Location</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our facility is conveniently located in Indianapolis, serving
              events throughout the greater Indianapolis area and the Midwest
              region.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-border/50 shadow-lg">
            <iframe
              src={COMPANY_INFO.googleMapsEmbed}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${COMPANY_INFO.name} Location - ${COMPANY_INFO.address.full}`}
              className="w-full"
            />
          </div>

          <div className="mt-6 text-center">
            <a
              href={COMPANY_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:underline"
            >
              <MapPin className="h-4 w-4" />
              Get Directions on Google Maps
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
