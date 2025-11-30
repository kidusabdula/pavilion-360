import type { Metadata } from "next"
import { HeroSection } from "@/components/shared/hero-section"
import Link from "next/link"
import { Book, HelpCircle, FileText } from "@/components/icons"

export const metadata: Metadata = {
  title: "Resources",
  description: "Event planning guides, FAQs, and blog articles from Pavilion360 in Indianapolis.",
}

export default function ResourcesPage() {
  return (
    <div className="flex flex-col">
      <HeroSection
        title="Resources"
        subtitle="Event planning guides, FAQs, and insights from our team."
        backgroundImage="/event-planning-resources.jpg"
        size="medium"
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-3">
            <Link
              href="/blog"
              className="group rounded-lg border border-border bg-card p-8 text-center transition-all hover:border-accent hover:shadow-lg"
            >
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <Book className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold group-hover:text-accent">Blog</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Tips, trends, and insights from our event production experts.
              </p>
            </Link>

            <Link
              href="/faqs"
              className="group rounded-lg border border-border bg-card p-8 text-center transition-all hover:border-accent hover:shadow-lg"
            >
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <HelpCircle className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold group-hover:text-accent">FAQs</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Common questions about our services, rentals, and process.
              </p>
            </Link>

            <div className="group rounded-lg border border-border bg-card p-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <FileText className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Guides</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Coming soon: Event planning checklists and guides.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
