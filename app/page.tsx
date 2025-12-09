"use client";

import { HeroSection } from "@/components/shared/hero-section";
import { CtaButton } from "@/components/shared/cta-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Speaker,
  Calendar,
  Sparkles,
  Utensils,
  MapPin,
  Users,
} from "@/components/icons";
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
    icon: Speaker,
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-cyan-500/20",
    href: "/services/audio-visual-production",
    description:
      "State-of-the-art audio-visual event production services with cutting-edge technology and professional expertise.",
  },
  {
    title: "Event Management",
    icon: Calendar,
    color: "from-purple-500 to-indigo-400",
    shadow: "shadow-purple-500/20",
    href: "/services/event-planning-management",
    description:
      "Comprehensive event management solutions from creative development to event production and beyond.",
  },
  {
    title: "Creative Services",
    icon: Sparkles,
    color: "from-pink-500 to-rose-400",
    shadow: "shadow-pink-500/20",
    href: "/services/creative-design",
    description:
      "Innovative creative development crafting unique themes, designs, and branding elements for impactful events.",
  },
  {
    title: "Food & Beverage",
    icon: Utensils,
    color: "from-orange-500 to-amber-400",
    shadow: "shadow-orange-500/20",
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
    icon: Calendar, // Reusing Calendar but could use tailored icon
    description:
      "Tailored solutions for corporate event planners, ensuring each event is meticulously designed and executed.",
  },
  {
    title: "Marketers",
    icon: Speaker, // Reusing Speaker as 'Broadcast/Amplify' metaphor
    description:
      "Robust event marketing strategies that amplify brand visibility and drive attendance.",
  },
  {
    title: "Venues",
    icon: MapPin,
    description:
      "Partner with venues to optimize event spaces, ensuring efficient use of resources and seamless execution.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <HeroSection
        title={
          <span className="leading-tight">
            Crafting Unforgettable{" "}
            <span className="text-accent relative inline-block">
              Experiences
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-accent opacity-40"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                />
              </svg>
            </span>{" "}
            for Every Occasion
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
            className="shadow-xl shadow-accent/20"
          >
            Check Out Our 2025 Catalog
          </CtaButton>
          <Button
            asChild
            size="lg"
            className="bg-yellow-400 text-black hover:bg-black hover:text-yellow-400 transition-all duration-300 h-12 px-8 rounded-xl font-bold shadow-lg"
          >
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>
      </HeroSection>

      {/* Stats Bar */}
      <section className="bg-accent/5 border-y border-accent/10 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-background hidden md:block" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="grid grid-cols-2 gap-8 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-accent/20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className={`text-center p-4 ${
                  idx % 2 === 0
                    ? "border-r border-accent/10 md:border-none"
                    : ""
                }`}
              >
                <div className="text-4xl md:text-5xl font-extrabold text-accent mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Services with Real Icons */}
      <section className="py-24 lg:py-32 relative">
        {/* Background blobs */}
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-3 block">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Core Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Full-spectrum event solutions tailored to your unique needs,
              delivering excellence from concept to execution.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            {coreServices.map((service) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ y: -12 }}
                className="group"
              >
                <Link href={service.href} className="block h-full">
                  <div className="relative h-full flex flex-col items-center text-center p-8 rounded-3xl bg-card border border-border/50 transition-all duration-500 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5 group-hover:bg-accent/5">
                    {/* Icon Circle */}
                    <div
                      className={`mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-linear-to-br ${service.color} text-white shadow-lg ${service.shadow} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <service.icon className="h-10 w-10" />
                    </div>

                    <h3 className="mb-4 text-xl font-bold group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed mb-6 grow">
                      {service.description}
                    </p>

                    <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Learn more <ArrowRight className="h-4 w-4" />
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
            className="text-center mt-16"
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-2 border-accent/20 bg-background hover:bg-accent hover:text-white transition-all duration-300"
            >
              <Link href="/services">View All Services</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Who We Serve - Premium Cards */}
      <section className="py-24 lg:py-32 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Who We Serve
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Trusted by event professionals across the Midwest. We partner
                with planners, businesses, and venues to create seamless
                experiences.
              </p>

              <div className="grid gap-6">
                {clientTypes.map((client, idx) => (
                  <motion.div
                    key={client.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6 p-6 rounded-2xl bg-background border border-border/50 hover:border-accent/40 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="shrink-0 h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                      <client.icon className="h-8 w-8 text-accent group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                        {client.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {client.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/professional-event-production-team-setup.jpg"
                alt="Pavilion360 team collaborating with clients"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                  <p className="text-white text-lg font-medium leading-relaxed">
                    &ldquo;Pavilion360 is the gold standard for event production
                    in Indianapolis. Their attention to detail is
                    unmatched.&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">
                      JM
                    </div>
                    <div className="text-white/90 text-sm">
                      <span className="block font-bold">Jessica Miller</span>
                      <span className="opacity-80">
                        Corporate Event Director
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Animated List */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold sm:text-4xl mb-6">
              Why Choose Pavilion360?
            </h2>
            <p className="text-lg text-muted-foreground">
              With over 15 years of experience in Indianapolis event production,
              we bring expertise, creativity, and reliability to every project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "All-in-One Solution",
                desc: "Full-service event production under one roof.",
                icon: Check,
              },
              {
                title: "Massive Inventory",
                desc: "Extensive inventory of premium rental equipment.",
                icon: Check,
              },
              {
                title: "Expert Team",
                desc: "Experienced technical directors and designers.",
                icon: Check,
              },
              {
                title: "Local & Regional",
                desc: "Local team with Midwest-wide service area.",
                icon: Check,
              },
              {
                title: "Transparent Pricing",
                desc: "Competitive pricing with clear, detailed quotes.",
                icon: Check,
              },
              {
                title: "24/7 Support",
                desc: "Round-the-clock support for your peace of mind.",
                icon: Check,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-accent/40 shadow-xs hover:shadow-xl transition-all duration-300"
              >
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button
              asChild
              size="lg"
              className="rounded-full h-14 px-10 text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <InstagramFeed />

      {/* CTA Section - Premium Footer Lead-in */}
      <section className="bg-accent py-24 lg:py-32 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-white/5 translate-x-1/3 translate-y-1/3 blur-3xl" />

        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 bg-repeat mix-blend-overlay" />

        <motion.div
          className="container mx-auto px-4 text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
            Let&apos;s Work Together
          </span>
          <h2 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl text-white tracking-tight">
            Ready to Create Something <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-200 to-amber-100">
              Amazing?
            </span>
          </h2>
          <p className="mb-10 text-xl max-w-2xl mx-auto text-white/90 leading-relaxed font-light">
            Indy&apos;s premier creative event management, production, &
            planning solutions. Intentionally unique. Specially for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <CtaButton
              href="/contact"
              variant="secondary"
              size="lg"
              className="h-16 px-10 text-lg bg-white text-accent hover:bg-white/90 shadow-2xl shadow-black/20"
            >
              Get Started Today
            </CtaButton>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-16 px-10 text-lg border-2 border-white/30 text-white bg-transparent hover:bg-white/10 rounded-full transition-all duration-300"
            >
              <Link href="/rentals">Browse Equipment</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
