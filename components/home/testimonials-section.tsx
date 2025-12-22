// components/home/testimonials-section.tsx
import { TestimonialCard } from "@/components/shared/testimonial-card";
import type { Tables } from "@/lib/supabase/types";
import { getBaseUrl } from "@/lib/utils/url";

type Testimonial = Tables<"testimonials">;

async function getTestimonials(): Promise<Testimonial[]> {
  const baseUrl = getBaseUrl();

  const res = await fetch(
    `${baseUrl}/api/public/testimonials?featured=true&limit=3`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch testimonials");
    return [];
  }

  const { data } = await res.json();
  return data || [];
}

export async function TestimonialsSection() {
  const testimonials = await getTestimonials();

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-24 lg:py-32 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Hear from the partners we work
            with.
          </p>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={{
                id: testimonial.id,
                quote: testimonial.quote,
                author: testimonial.author_name,
                role: testimonial.author_role ?? "",
                company: testimonial.company ?? undefined,
                image: testimonial.author_image_url ?? undefined,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
