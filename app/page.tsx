"use client";

import { HeroSection } from "@/components/shared/hero-section";
import { CtaButton } from "@/components/shared/cta-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Check } from "@/components/icons";
import { InstagramFeed } from "@/components/shared/instagram-feed";
import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const coreServices = [
  {
    title: "Audio / Visual Production",
    abbr: "AV",
    color: "from-green-500 to-green-600",
    href: "/services/audio-visual-production",
    description:
      "State-of-the-art audio-visual event production services with cutting-edge technology and professional expertise.",
  },
  {
    title: "Event Management",
    abbr: "EM",
    color: "from-cyan-400 to-cyan-500",
    href: "/services/event-planning-management",
    description:
      "Comprehensive event management solutions from creative development to event production and beyond.",
  },
  {
    title: "Creative Services",
    abbr: "CS",
    color: "from-yellow-400 to-yellow-500",
    href: "/services/creative-design",
    description:
      "Innovative creative development crafting unique themes, designs, and branding elements for impactful events.",
  },
  {
    title: "Food & Beverage",
    abbr: "FB",
    color: "from-orange-500 to-orange-600",
    href: "/services/beverage-services",
    description:
      "Top-tier food and beverage coordination, partnering with renowned caterers for exceptional culinary experiences.",
  },
];

const stats = [
  { value: "500+", label: "Events Annually" },
  { value: "15+", label: "Years Experience" },
  { value: "200+", label: "Rental Items" },
  { value: "98%", label: "Client Satisfaction" },
];

const clientTypes = [
  {
    title: "Planners",
    icon: "📋",
    description:
      "Tailored solutions for corporate event planners, ensuring each event is meticulously designed and executed.",
  },
  {
    title: "Marketers",
    icon: "📢",
    description:
      "Robust event marketing strategies that amplify brand visibility and drive attendance.",
  },
  {
    title: "Venues",
    icon: "🏛️",
    description:
      "Partner with venues to optimize event spaces, ensuring efficient use of resources and seamless execution.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection
        title={
          <span>
            Crafting Unforgettable{" "}
            <span className="text-accent">Experiences</span> for Every Occasion
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
          <Button
            asChild
            size="lg"
            className="bg-yellow-400 text-black hover:bg-black hover:text-yellow-400 transition-colors duration-300 h-12 px-8 rounded-xl"
          >
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>
      </HeroSection>

      {/* Stats Bar */}
      <section className="bg-accent py-8 lg:py-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-accent-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-accent-foreground/80 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Services with Circular Icons */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">
              Core Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Full-spectrum event solutions tailored to your unique needs
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {coreServices.map((service) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link href={service.href} className="block">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br ${service.color} text-white shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105`}
                    >
                      <span className="text-3xl font-bold">{service.abbr}</span>
                    </div>
                    <h3 className="mb-3 text-lg font-semibold group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {service.description}
                    </p>
                    <span className="mt-4 text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Learn more <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild variant="outline" size="lg" className="rounded-xl">
              <Link href="/services">View All Services</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="border-y border-border bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">
              Who We Serve
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trusted by event professionals across the Midwest
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {clientTypes.map((client) => (
              <motion.div
                key={client.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="p-8 rounded-2xl bg-card border border-border/50 hover:border-accent/30 hover:shadow-lg transition-all duration-300"
              >
                <span className="text-4xl mb-4 block">{client.icon}</span>
                <h3 className="mb-4 text-2xl font-semibold">{client.title}</h3>
                <p className="text-muted-foreground">{client.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold sm:text-4xl mb-6">
                Why Choose Pavilion360?
              </h2>
              <p className="text-muted-foreground mb-8">
                With over 15 years of experience in Indianapolis event
                production, we bring expertise, creativity, and reliability to
                every project.
              </p>
              <ul className="space-y-4">
                {[
                  "Full-service event production under one roof",
                  "Extensive inventory of premium rental equipment",
                  "Experienced technical directors and designers",
                  "Local team with Midwest-wide service",
                  "Competitive pricing with transparent quotes",
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-accent" />
                    </div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8">
                <Button asChild size="lg" className="rounded-xl">
                  <Link href="/about">Learn About Us</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src="/professional-event-production-team-setup.jpg"
                alt="Pavilion360 team setting up event production equipment"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <InstagramFeed />

      {/* CTA Section */}
      <section className="bg-accent py-20 text-accent-foreground lg:py-32 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />

        <motion.div
          className="container mx-auto px-4 text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Ready to Create Something Amazing?
          </h2>
          <p className="mb-8 text-lg max-w-2xl mx-auto text-accent-foreground/90">
            Indy's premier creative event management, production, & planning
            solutions. Intentionally unique. Specially for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CtaButton href="/contact" variant="secondary" size="lg">
              Get Started Today
            </CtaButton>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10 rounded-xl"
            >
              <Link href="/rentals">Browse Equipment</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
