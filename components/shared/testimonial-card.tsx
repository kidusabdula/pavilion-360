import type { Testimonial } from "@/lib/data/testimonials"

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg">
      <div className="mb-4 text-lg leading-relaxed italic text-foreground">"{testimonial.quote}"</div>

      <div className="mt-auto flex items-center gap-4">
        {testimonial.image && (
          <img
            src={testimonial.image || "/placeholder.svg"}
            alt={`${testimonial.author}, ${testimonial.role}`}
            className="h-12 w-12 rounded-full object-cover"
          />
        )}
        <div>
          <div className="font-semibold text-foreground">{testimonial.author}</div>
          <div className="text-sm text-muted-foreground">
            {testimonial.role}
            {testimonial.company && ` • ${testimonial.company}`}
          </div>
        </div>
      </div>
    </div>
  )
}
