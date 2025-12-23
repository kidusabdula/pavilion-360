// app/blog/page.tsx
import { Suspense } from "react";
import { HeroSection } from "@/components/shared/hero-section";
import { BlogGridSkeleton } from "@/components/skeletons";
import { BlogContent } from "@/components/blog/blog-content";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export const metadata = {
  title: "Blog & Insights | Pavilion360 Event Production Tips",
  description:
    "Event production tips, trends, and insights from the Pavilion360 team. Learn about AV equipment, lighting design, event planning, and more.",
};

export default function BlogPage() {
  return (
    <div className="flex flex-col">
      <HeroSection
        title="Blog & Insights"
        subtitle="Event production tips, trends, and insights from our team."
        backgroundImage="/event-planning-blog-header.jpg"
        size="medium"
      />
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <Suspense fallback={<BlogGridSkeleton />}>
            <BlogContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
