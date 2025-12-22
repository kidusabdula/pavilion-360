// components/skeletons/testimonials-skeleton.tsx
export function TestimonialsSkeleton() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="h-10 w-64 bg-muted animate-pulse rounded-lg mx-auto mb-4" />
          <div className="h-5 w-96 bg-muted animate-pulse rounded mx-auto max-w-full" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-card border border-border/50 animate-pulse"
            >
              <div className="h-4 w-full bg-muted rounded mb-2" />
              <div className="h-4 w-5/6 bg-muted rounded mb-2" />
              <div className="h-4 w-4/6 bg-muted rounded mb-6" />
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-muted rounded-full" />
                <div>
                  <div className="h-4 w-24 bg-muted rounded mb-2" />
                  <div className="h-3 w-32 bg-muted rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}