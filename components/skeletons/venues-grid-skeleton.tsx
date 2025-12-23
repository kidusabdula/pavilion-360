// components/skeletons/venues-grid-skeleton.tsx
export function VenuesGridSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="rounded-xl border border-border/50 bg-card overflow-hidden animate-pulse"
        >
          {/* Image skeleton */}
          <div className="relative aspect-[16/10] bg-muted">
            {/* Location badge */}
            <div className="absolute top-4 left-4 h-6 w-28 bg-muted-foreground/20 rounded-full" />
            {/* Capacity badge */}
            <div className="absolute top-4 right-4 h-6 w-20 bg-muted-foreground/20 rounded-full" />
            {/* Title */}
            <div className="absolute bottom-6 left-6 h-7 w-48 bg-muted-foreground/30 rounded" />
          </div>
          
          {/* Content skeleton */}
          <div className="p-6 space-y-3">
            {/* Location */}
            <div className="h-3 w-32 bg-muted rounded" />
            
            {/* Description */}
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-3/4 bg-muted rounded" />
            
            {/* Action link */}
            <div className="h-4 w-28 bg-muted rounded mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}