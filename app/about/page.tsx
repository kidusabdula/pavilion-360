"use client";

import { HeroSection } from "@/components/shared/hero-section";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { testimonials } from "@/lib/data/testimonials";
import { CtaButton } from "@/components/shared/cta-button";
import { motion } from "framer-motion";
import {
  Award,
  Lightbulb,
  Users,
  Check,
  Sparkles,
  MapPin,
  ArrowRight,
} from "@/components/icons";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col overflow-hidden">
      <HeroSection
        title="About Pavilion360"
        subtitle="Elevating events through creativity, expertise, and unwavering dedication to excellence."
        backgroundImage="/professional-event-production-team-setup.jpg"
        size="large"
      />

      {/* Intro Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
                Our Story
              </h2>
              <h3 className="mb-8 text-4xl lg:text-5xl font-bold leading-tight">
                From Humble Beginnings to <br />
                <span className="text-accent">Event Production Powerhouse</span>
              </h3>
              <p className="text-xl leading-relaxed text-muted-foreground mb-12">
                Founded in Indianapolis over 15 years ago, Pavilion360 has grown
                from a small AV rental company into a full-service event
                production powerhouse. We've produced over 500 events annually,
                from intimate corporate gatherings to large-scale festivals.
              </p>
              <div className="grid sm:grid-cols-3 gap-8 border-t border-border pt-12">
                <div>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    15+
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wide">
                    Years Experience
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    500+
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wide">
                    Annual Events
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    30+
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wide">
                    Experts
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-muted/30 py-24 lg:py-32 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-background/50" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="mx-auto max-w-4xl text-center bg-card p-12 rounded-3xl border border-border/50 shadow-2xl shadow-accent/5 backdrop-blur-sm"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-8 text-3xl font-bold">Our Mission</h2>
            <p className="text-2xl lg:text-3xl font-light leading-relaxed text-foreground/90 italic">
              &ldquo;To deliver exceptional event experiences through innovative
              technology, creative design, and unparalleled service—transforming
              visions into unforgettable moments that exceed
              expectations.&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Why We Do It
            </h2>
            <h3 className="text-4xl font-bold">Our Core Values</h3>
          </motion.div>

          <motion.div
            className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                title: "Excellence",
                icon: Award,
                desc: "We hold ourselves to the highest standards in every aspect of event production.",
              },
              {
                title: "Innovation",
                icon: Lightbulb,
                desc: "We stay ahead of industry trends to deliver cutting-edge experiences.",
              },
              {
                title: "Partnership",
                icon: Users,
                desc: "We collaborate closely with clients to understand and exceed their vision.",
              },
              {
                title: "Reliability",
                icon: Check,
                desc: "Our clients trust us to deliver flawless execution, every single time.",
              },
              {
                title: "Creativity",
                icon: Sparkles,
                desc: "We bring fresh ideas and artistic vision to make every event unique.",
              },
              {
                title: "Community",
                icon: MapPin,
                desc: "Proud to serve Indianapolis and contribute to our vibrant local events scene.",
              },
            ].map((value, idx) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-accent/40 hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold group-hover:text-accent transition-colors">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-muted/20 py-24 lg:py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Growth & Evolution
            </h2>
            <h3 className="text-4xl font-bold">Our Journey</h3>
          </motion.div>

          <div className="mx-auto max-w-4xl relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            <div className="space-y-12">
              {[
                {
                  year: "2009",
                  title: "Founded",
                  desc: "Started as a small AV rental company with 2 employees and a passion for great events.",
                },
                {
                  year: "2012",
                  title: "Expanded Services",
                  desc: "Added event production, staging, and lighting to become a full-service provider.",
                },
                {
                  year: "2016",
                  title: "The Pavilion Opens",
                  desc: "Opened our flagship venue at Pan Am Plaza, serving as our headquarters and premier event space.",
                },
                {
                  year: "2020",
                  title: "Adapted & Innovated",
                  desc: "Pioneered hybrid event solutions, helping clients navigate the new landscape of virtual experiences.",
                },
                {
                  year: "2024",
                  title: "500+ Events Annually",
                  desc: "Now serving over 500 events per year with a team of 30+ professionals and state-of-the-art equipment.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${
                    idx % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1 w-full md:w-auto pl-8 md:pl-0 md:text-right">
                    {idx % 2 === 0 && (
                      <div className="hidden md:block">
                        <h3 className="text-2xl font-bold text-accent">
                          {item.year}
                        </h3>
                        <h4 className="text-lg font-semibold mb-2">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    )}
                    {idx % 2 !== 0 && (
                      <div className="md:hidden pl-8 border-l border-accent/20">
                        <h3 className="text-2xl font-bold text-accent">
                          {item.year}
                        </h3>
                        <h4 className="text-lg font-semibold mb-2">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    )}
                    {idx % 2 === 0 && (
                      <div className="md:hidden pl-8 border-l border-accent/20">
                        <h3 className="text-2xl font-bold text-accent">
                          {item.year}
                        </h3>
                        <h4 className="text-lg font-semibold mb-2">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    )}
                  </div>

                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-background border-4 border-accent rounded-full -translate-x-[7px] md:-translate-x-1/2 z-10" />

                  <div className="flex-1 w-full md:w-auto pl-8 md:pl-0 md:text-left">
                    {idx % 2 !== 0 && (
                      <div className="hidden md:block">
                        <h3 className="text-2xl font-bold text-accent">
                          {item.year}
                        </h3>
                        <h4 className="text-lg font-semibold mb-2">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don&apos;t just take our word for it. Hear from the partners we
              work with.
            </p>
          </motion.div>
          <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-accent" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2" />

        <div className="container mx-auto px-4 relative z-10 text-center text-accent-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Ready to Work Together?
            </h2>
            <p className="mb-10 text-xl text-white/90 max-w-2xl mx-auto">
              Let&apos;s create something extraordinary for your next event.
              Contact us for a custom proposal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CtaButton
                href="/contact"
                variant="secondary"
                size="lg"
                className="bg-white text-accent hover:bg-white/90"
              >
                Get Started Today
              </CtaButton>
              <Link
                href="/portfolio"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/30 bg-transparent px-8 text-sm font-medium text-white shadow-xs transition-colors hover:bg-white/10 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
