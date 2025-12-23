import type { Testimonial } from "@/lib/data/testimonials";

interface DbTestimonial {
  id: string;
  quote: string;
  author_name: string;
  author_role: string | null;
  company: string | null;
  author_image_url: string | null;
  is_featured: boolean | null;
  display_order: number | null;
}

export function adaptDbTestimonialToTestimonial(
  db: DbTestimonial
): Testimonial {
  return {
    id: db.id,
    quote: db.quote,
    author: db.author_name,
    role: db.author_role || "",
    company: db.company || undefined,
    image: db.author_image_url || undefined,
  };
}

export function adaptDbTestimonialsToTestimonials(
  dbTestimonials: DbTestimonial[]
): Testimonial[] {
  return dbTestimonials.map(adaptDbTestimonialToTestimonial);
}
