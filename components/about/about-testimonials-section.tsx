import { TestimonialCard } from "@/components/shared/testimonial-card";
import { adaptDbTestimonialsToTestimonials } from "@/lib/utils/testimonial-adapter";

async function getFeaturedTestimonials() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const res = await fetch(
      `${baseUrl}/api/public/testimonials?featured=true&limit=3`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch testimonials", res.statusText);
      return [];
    }

    const { data } = await res.json();
    return adaptDbTestimonialsToTestimonials(data || []);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

export async function AboutTestimonialsSection() {
  const testimonials = await getFeaturedTestimonials();

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial, idx) => (
        <div
          key={testimonial.id}
          className="opacity-100"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          <TestimonialCard testimonial={testimonial} />
        </div>
      ))}
    </div>
  );
}
