"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from "@/components/icons";
import { motion } from "framer-motion";

const footerLinks = {
  services: [
    {
      name: "Event Planning & Management",
      href: "/services/event-planning-management",
    },
    {
      name: "Audio Visual Production",
      href: "/services/audio-visual-production",
    },
    {
      name: "Event Production & Technical Direction",
      href: "/services/event-production-technical-direction",
    },
    { name: "Creative Design", href: "/services/creative-design" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Venues", href: "/venues" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Rentals", href: "/rentals" },
  ],
  support: [
    { name: "Contact", href: "/contact" },
    { name: "FAQs", href: "/faqs" },
    { name: "Blog", href: "/blog" },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/pavilion360events",
    icon: Facebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/pavilion360events/",
    icon: Instagram,
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center space-x-2 inline-block group"
            >
              <div className="relative h-10 w-40 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Pavilion 360 - Indianapolis Event Production Company"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-md">
              Full-service event production company in Indianapolis providing AV
              equipment rentals, lighting, staging, and technical direction for
              unforgettable events throughout the Midwest.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a
                href="https://maps.app.goo.gl/CuwLzeA4ywMx98an9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                <MapPin className="h-4 w-4 text-accent" />
                <span>Indianapolis, IN</span>
              </a>
              <a
                href="tel:+13174569100"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                <Phone className="h-4 w-4 text-accent" />
                <span>(317) 456-9100</span>
              </a>
              <a
                href="mailto:info@pavilion360.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                <Mail className="h-4 w-4 text-accent" />
                <span>info@pavilion360.com</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border/50 text-muted-foreground hover:text-accent hover:border-accent/50 transition-colors"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-semibold text-sm mb-5 text-foreground">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-sm mb-5 text-foreground">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-sm mb-5 text-foreground">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-8 p-4 rounded-xl bg-accent/10 border border-accent/20">
              <p className="text-sm font-medium mb-2">
                Ready to plan your event?
              </p>
              <Link
                href="/contact"
                className="text-sm text-accent hover:underline inline-flex items-center gap-1"
              >
                Get a quote
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pavilion360. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>Indianapolis Event Production</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Serving the Midwest</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
