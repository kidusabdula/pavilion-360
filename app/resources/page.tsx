import type { Metadata } from "next";
import { HeroSection } from "@/components/shared/hero-section";
import Link from "next/link";
import { Book, HelpCircle, FileText } from "@/components/icons";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Event planning guides, FAQs, and blog articles from Pavilion360 in Indianapolis.",
};

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
            {[
              {
                title: "Blog",
                icon: Book,
                href: "/blog",
                desc: "Tips, trends, and insights from our event production experts.",
              },
              {
                title: "FAQs",
                icon: HelpCircle,
                href: "/faqs",
                desc: "Common questions about our services, rentals, and process.",
              },
              {
                title: "Guides",
                icon: FileText,
                href: null,
                desc: "Coming soon: Event planning checklists and guides.",
              },
            ].map((item, idx) => {
              const commonClasses = `block group rounded-xl border border-border/50 bg-linear-to-b from-card to-card/80 p-8 text-center transition-all duration-300 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 ${
                !item.href ? "opacity-80 cursor-default" : ""
              }`;

              const content = (
                <>
                  <div className="mb-6 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/10 transition-colors group-hover:bg-accent group-hover:text-white">
                      <item.icon className="h-10 w-10 text-accent group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </>
              );

              return item.href ? (
                <Link
                  key={item.title}
                  href={item.href}
                  className={commonClasses}
                >
                  {content}
                </Link>
              ) : (
                <div key={item.title} className={commonClasses}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
