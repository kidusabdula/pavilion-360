// components/skeletons/faqs-skeleton.tsx
export function FaqsSkeleton() {
  return (
    <div className="mx-auto max-w-3xl">
      {/* Search skeleton */}
      <div className="mb-8">
        <div className="h-12 bg-muted rounded-xl animate-pulse" />
      </div>
      
      {/* Category pills skeleton */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-9 w-20 bg-muted rounded-full animate-pulse"
          />
        ))}
      </div>
      
      {/* Results summary */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/30">
        <div className="h-4 w-32 bg-muted rounded animate-pulse" />
      </div>
      
      {/* FAQ items skeleton */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-border/50 bg-card px-6 py-5 animate-pulse"
          >
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 bg-muted rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-full bg-muted rounded" />
                <div className="h-5 w-3/4 bg-muted rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}