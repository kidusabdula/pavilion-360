// components/skeletons/portfolio-grid-skeleton.tsx
export function PortfolioGridSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="rounded-xl border border-border/50 bg-card overflow-hidden animate-pulse"
        >
          {/* Image skeleton */}
          <div className="relative aspect-[16/10] bg-muted">
            {/* Event type badge */}
            <div className="absolute top-4 left-4 h-6 w-20 bg-muted-foreground/20 rounded-full" />
          </div>
          
          {/* Content skeleton */}
          <div className="p-6 space-y-3">
            {/* Title */}
            <div className="h-6 w-3/4 bg-muted rounded" />
            
            {/* Description */}
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-2/3 bg-muted rounded" />
            
            {/* Meta info */}
            <div className="flex justify-between pt-2">
              <div className="h-3 w-24 bg-muted rounded" />
              <div className="h-3 w-20 bg-muted rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}