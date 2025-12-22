// components/skeletons/services-grid-skeleton.tsx
export function ServicesGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="h-full rounded-xl border border-border/50 bg-card overflow-hidden animate-pulse"
        >
          {/* Image header skeleton */}
          <div className="h-32 bg-muted" />
          
          {/* Content skeleton */}
          <div className="p-6 space-y-4">
            <div className="h-5 w-3/4 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-2/3 bg-muted rounded" />
            
            {/* Tags skeleton */}
            <div className="flex gap-2">
              <div className="h-5 w-16 bg-muted rounded-full" />
              <div className="h-5 w-20 bg-muted rounded-full" />
            </div>
            
            {/* CTA skeleton */}
            <div className="h-4 w-24 bg-muted rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}