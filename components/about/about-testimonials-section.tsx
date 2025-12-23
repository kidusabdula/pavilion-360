import { TestimonialCard } from "@/components/shared/testimonial-card";
import { adaptDbTestimonialsToTestimonials } from "@/lib/utils/testimonial-adapter";
import { createClient } from "@/lib/supabase/server";

async function getFeaturedTestimonials() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_featured", true)
      .eq("is_active", true)
      .is("deleted_at", null)
      .order("display_order", { ascending: true })
      .limit(3);

    if (error) {
      console.error("Failed to fetch testimonials:", error);
      return [];
    }

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
