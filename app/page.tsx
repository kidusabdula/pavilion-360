"use client"

import { HeroSection } from "@/components/shared/hero-section"
import { CtaButton } from "@/components/shared/cta-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "@/components/icons"
import { InstagramFeed } from "@/components/shared/instagram-feed"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection
        title={
          <span>
            Crafting Unforgettable <span className="text-accent">Experiences</span> for Every Occasion
          </span>
        }
        subtitle="Pavilion 360 is more than just an event rental and production company. We transform any event into a lasting experience with high quality products, creative in-house design, and affordable solutions."
        backgroundImage="/modern-event-venue-with-stage-lighting-and-audio-e.jpg"
        size="large"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <CtaButton
            href="https://www.flipsnack.com/5FC9CCDD75E/indy-pavilion-2023-catalog-7tmyh1rqwd/full-view.html"
            variant="primary"
            icon={ArrowRight}
            size="lg"
          >
            Check Out Our 2025 Catalog
          </CtaButton>
          <Button asChild size="lg" className="bg-yellow-400 text-black hover:bg-black hover:text-yellow-400 transition-colors duration-300">
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </HeroSection>

      {/* Core Services with Circular Icons */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {[
              {
                title: "Audio / Visual Production",
                abbr: "AV",
                color: "bg-green-500",
                description:
                  "Pavilion 360 offers state-of-the-art audio-visual event production services, ensuring clear communication and immersive experiences through cutting-edge technology and professional expertise.",
              },
              {
                title: "Event Management",
                abbr: "EM",
                color: "bg-cyan-400",
                description:
                  "Pavilion 360 provides comprehensive event management solutions. Our 360 Solutions Team will expertly handle every detail from creative development, event planning to event production, management and more.",
              },
              {
                title: "Creative Services",
                abbr: "CS",
                color: "bg-yellow-400",
                description:
                  "Pavilion 360 delivers innovative creative development services, crafting unique themes, designs, and branding elements that enhance the visual and experiential impact of each event.",
              },
              {
                title: "Food & Beverage",
                abbr: "FB",
                color: "bg-orange-500",
                description:
                  "Pavilion 360 event management services coordinates top-tier food and beverage services, partnering with renowned caterers to provide exceptional culinary experiences that delight attendees and complement the event theme.",
              },
            ].map((service) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2"
              >
                <div
                  className={`mb-6 flex h-32 w-32 items-center justify-center rounded-full border-4 border-current ${service.color} text-white shadow-lg transition-shadow duration-300 hover:shadow-2xl`}
                >
                  <span className="text-4xl font-bold">{service.abbr}</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Clients */}
      <section className="border-y border-border bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center text-3xl font-bold sm:text-4xl"
          >
            Our Clients
          </motion.h2>
          <motion.div
            className="grid gap-8 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {[
              {
                title: "Planners",
                description:
                  "Pavilion 360 offers tailored solutions for corporate event planners, ensuring each event is meticulously designed and executed to meet the specific needs and objectives of the organization.",
              },
              {
                title: "Marketers",
                description:
                  "For marketers, we deliver robust event marketing strategies that amplify brand visibility and engagement. We collaborate closely with marketing teams to develop and execute innovative campaigns that drive attendance.",
              },
              {
                title: "Venues",
                description:
                  "Pavilion 360 partners with venues to optimize event spaces, ensuring efficient use of resources and seamless event execution. We work hand-in-hand with venue managers to coordinate all aspects of the event.",
              },
            ].map((client) => (
              <motion.div key={client.title} variants={itemVariants}>
                <h3 className="mb-4 text-2xl font-semibold">{client.title}</h3>
                <p className="text-muted-foreground">{client.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <InstagramFeed />

      {/* CTA Section */}
      <section className="bg-accent py-20 text-accent-foreground lg:py-32">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Indy's premier creative event management, production, & planning solutions
          </h2>
          <p className="mb-8 text-lg">Intentionally unique. Specially for you.</p>
          <CtaButton href="/contact" variant="secondary" size="lg">
            Get Started Today
          </CtaButton>
        </motion.div>
      </section>
    </div>
  )
}
