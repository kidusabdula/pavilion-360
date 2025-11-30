import type { Metadata } from "next"
import { HeroSection } from "@/components/shared/hero-section"
import { ContactForm } from "@/components/forms/contact-form"
import { Mail, Phone, MapPin } from "@/components/icons"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Pavilion360 for event planning, rentals, or general inquiries in Indianapolis.",
}

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <HeroSection
        title="Get in Touch"
        subtitle="Ready to bring your event vision to life? Contact us today."
        backgroundImage="/modern-event-venue-with-stage-lighting-and-audio-e.jpg"
        size="medium"
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="mb-1 font-semibold">Phone</p>
                    <p className="text-muted-foreground">(317) 456-9100</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="mb-1 font-semibold">Email</p>
                    <p className="text-muted-foreground">info@pavilion360.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="mb-1 font-semibold">Address</p>
                    <p className="text-muted-foreground">Indianapolis, IN</p>
                  </div>
                </div>

                <div className="mt-8 rounded-lg border border-border bg-muted/30 p-6">
                  <h3 className="mb-2 font-semibold">Business Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: By Appointment
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-8">
              <h2 className="mb-6 text-2xl font-bold">Request a Quote</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
