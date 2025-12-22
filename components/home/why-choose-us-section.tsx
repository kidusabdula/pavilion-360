// components/home/why-choose-us-section.tsx
'use client';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function WhyChooseUsSection() {
  return (
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
  );
}