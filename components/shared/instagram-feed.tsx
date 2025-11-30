"use client"

import { Instagram } from "@/components/icons"
import Image from "next/image"

const mockInstagramPosts = [
  {
    id: "1",
    image: "/tech-conference-stage-led-screens.jpg",
    alt: "Corporate tech conference with large LED screens and professional staging",
  },
  {
    id: "2",
    image: "/elegant-wedding-ballroom-uplighting.jpg",
    alt: "Elegant wedding ballroom with romantic uplighting and decor",
  },
  {
    id: "3",
    image: "/outdoor-festival-dual-stage-setup.jpg",
    alt: "Outdoor music festival with dual stage setup and crowd",
  },
  {
    id: "4",
    image: "/modern-event-venue-with-stage-lighting-and-audio-e.jpg",
    alt: "Modern event venue with professional stage lighting and audio equipment",
  },
  {
    id: "5",
    image: "/museum-gala-fundraising-event.jpg",
    alt: "Elegant museum gala fundraising event with sophisticated decor",
  },
  {
    id: "6",
    image: "/corporate-town-hall-hybrid-event.jpg",
    alt: "Corporate town hall hybrid event with live streaming setup",
  },
]

export function InstagramFeed() {
  return (
    <section className="border-y border-border py-20 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">Latest Events</h2>
          <p className="mb-6 text-lg text-muted-foreground">Follow us on Instagram to see our latest work</p>
          <a
            href="https://www.instagram.com/pavilion360events/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-all hover:scale-105 hover:shadow-lg"
          >
            <Instagram className="h-5 w-5" />
            Follow @pavilion360events
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockInstagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/pavilion360events/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
            >
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Instagram className="h-12 w-12 text-white" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
