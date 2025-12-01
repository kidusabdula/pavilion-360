"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "@/components/icons"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const mainNav = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Rentals", href: "/rentals" },
  { name: "Venues", href: "/venues" },
  { name: "Portfolio", href: "/portfolio" },
]

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative h-10 w-40">
              <Image
                src="/logo.png"
                alt="Pavilion 360"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-6">
            {mainNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <Button asChild variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-border overflow-hidden md:hidden"
            >
              <nav className="flex flex-col gap-4 py-4">
                {mainNav.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button asChild variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90 mt-2">
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Contact
                  </Link>
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
