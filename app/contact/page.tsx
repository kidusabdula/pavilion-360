"use client";

import Script from "next/script";
import { HeroSection } from "@/components/shared/hero-section";
import { ContactForm } from "@/components/forms/contact-form";
import { Mail, Phone, MapPin, Calendar } from "@/components/icons";
import { motion } from "framer-motion";
import { generateLocalBusinessSchema } from "@/lib/utils/seo";

export default function ContactPage() {
  // Generate structured data
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
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-8 text-2xl font-bold">Contact Information</h2>
              <div className="space-y-6">
                <motion.a
                  href="tel:+13174569100"
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="mb-1 font-semibold">Phone</p>
                    <p className="text-muted-foreground hover:text-accent transition-colors">
                      (317) 456-9100
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href="mailto:info@pavilion360.com"
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="mb-1 font-semibold">Email</p>
                    <p className="text-muted-foreground hover:text-accent transition-colors">
                      info@pavilion360.com
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://maps.app.goo.gl/CuwLzeA4ywMx98an9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="mb-1 font-semibold">Address</p>
                    <p className="text-muted-foreground">
                      6002 Corporate Drive
                      <br />
                      Indianapolis, IN 46278
                    </p>
                    <p className="text-xs text-accent mt-1">
                      View on Google Maps →
                    </p>
                  </div>
                </motion.a>

                {/* Business Hours */}
                <motion.div
                  className="mt-8 rounded-xl border border-accent/20 bg-accent/5 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold">Business Hours</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Monday - Friday
                      </span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-medium">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-medium">By Appointment</span>
                    </div>
                  </div>
                </motion.div>

                {/* Quick response note */}
                <p className="text-sm text-muted-foreground mt-6 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  We typically respond within 24 hours
                </p>
              </div>
            </motion.div>

            {/* Form - 3 columns */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="rounded-2xl border border-border/50 bg-linear-to-b from-card to-card/80 p-8 lg:p-10 shadow-lg">
                <h2 className="mb-2 text-2xl font-bold">Request a Quote</h2>
                <p className="text-muted-foreground mb-8">
                  Tell us about your event and we'll get back to you with a
                  customized proposal.
                </p>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="border-t border-border">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-bold mb-3">Visit Our Location</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our facility is conveniently located in Indianapolis, serving
              events throughout the greater Indianapolis area and the Midwest
              region.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-border/50 shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3063.759841566882!2d-86.2714!3d39.8904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886b5744ba1e4f09%3A0x9a0d6c7c6e8b0d9f!2s6002%20Corporate%20Dr%2C%20Indianapolis%2C%20IN%2046278!5e0!3m2!1sen!2sus!4v1702149600000!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pavilion360 Location - 6002 Corporate Drive, Indianapolis, IN"
              className="w-full"
            />
          </motion.div>

          <div className="mt-6 text-center">
            <a
              href="https://maps.app.goo.gl/CuwLzeA4ywMx98an9"
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
