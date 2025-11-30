import type { Metadata } from "next"
import { HeroSection } from "@/components/shared/hero-section"

export const metadata: Metadata = {
  title: "Blog",
  description: "Event production tips, trends, and insights from Pavilion360.",
}

const blogPosts = [
  {
    title: "How to Choose the Right AV Equipment for Your Corporate Event",
    date: "March 15, 2024",
    excerpt: "Learn which audio, video, and lighting gear makes the biggest impact for different event types.",
    slug: "choose-av-equipment-corporate-event",
    category: "Event Technology",
  },
  {
    title: "Top 5 Event Trends for 2024",
    date: "February 20, 2024",
    excerpt: "From immersive experiences to hybrid formats, discover what's shaping events this year.",
    slug: "top-event-trends-2024",
    category: "Industry Trends",
  },
  {
    title: "Planning a Wedding at The Pavilion: What to Know",
    date: "January 10, 2024",
    excerpt: "A comprehensive guide to hosting your dream wedding at our flagship venue.",
    slug: "wedding-planning-pavilion-guide",
    category: "Weddings",
  },
  {
    title: "Behind the Scenes: Setting Up a Large-Scale Festival",
    date: "December 5, 2023",
    excerpt: "Take a look at the planning, logistics, and execution that goes into producing a multi-day festival.",
    slug: "behind-scenes-festival-setup",
    category: "Event Production",
  },
  {
    title: "The Importance of Lighting Design in Events",
    date: "November 18, 2023",
    excerpt: "Discover how strategic lighting transforms atmosphere and enhances your event experience.",
    slug: "importance-lighting-design",
    category: "Event Technology",
  },
]

export default function BlogPage() {
  return (
    <div className="flex flex-col">
      <HeroSection
        title="Blog"
        subtitle="Event production tips, trends, and insights from our team."
        backgroundImage="/event-planning-blog-header.jpg"
        size="medium"
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-lg border border-border bg-card p-8 transition-all hover:border-accent hover:shadow-lg"
              >
                <div className="mb-3 flex items-center gap-4">
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    {post.category}
                  </span>
                  <time className="text-sm text-muted-foreground">{post.date}</time>
                </div>
                <h2 className="mb-3 text-2xl font-bold group-hover:text-accent">{post.title}</h2>
                <p className="mb-4 leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-sm font-medium text-accent">
                  <span>Read full article</span>
                  <span>→</span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center text-sm text-muted-foreground">Showing 5 of 5 articles</div>
        </div>
      </section>
    </div>
  )
}
