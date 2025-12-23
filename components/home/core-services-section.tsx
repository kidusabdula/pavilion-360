// components/home/core-services-section.tsx
"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M11 4.702a.705.705 0 0 0-.598-.698L7 3.5v13l3.402-.504a.705.705 0 0 0 .598-.698V4.702Z"></path>
        <path d="M17 3.5v13"></path>
        <path d="M14 5.5v11"></path>
      </svg>
    ),
    href: "/services/audio-visual-production",
    description:
      "State-of-the-art audio-visual event production services with cutting-edge technology and professional expertise.",
  },
  {
    title: "Event Management",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
    href: "/services/event-planning-management",
    description:
      "Comprehensive event management solutions from creative development to event production and beyond.",
  },
  {
    title: "Creative Services",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M2 17l10 5 10-5"></path>
        <path d="M2 12l10 5 10-5"></path>
      </svg>
    ),
    href: "/services/creative-design",
    description:
      "Innovative creative development crafting unique themes, designs, and branding elements for impactful events.",
  },
  {
    title: "Food & Beverage",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
        <line x1="6" y1="1" x2="6" y2="4"></line>
        <line x1="10" y1="1" x2="10" y2="4"></line>
        <line x1="14" y1="1" x2="14" y2="4"></line>
      </svg>
    ),
    href: "/services/beverage-services",
    description:
      "Top-tier food and beverage coordination, partnering with renowned caterers for exceptional culinary experiences.",
  },
];

export function CoreServicesSection() {
  return (
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
                  <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-neutral-950 text-accent shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-accent group-hover:text-white">
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
  );
}
