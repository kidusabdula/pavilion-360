// components/skeletons/rentals-grid-skeleton.tsx
export function RentalsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="rounded-xl border border-border/50 bg-card overflow-hidden animate-pulse"
        >
          {/* Image skeleton */}
          <div className="aspect-[4/3] bg-muted" />
          
          {/* Content skeleton */}
          <div className="p-5 space-y-3">
            {/* Category badge */}
            <div className="h-5 w-24 bg-muted rounded-full" />
            
            {/* Title */}
            <div className="h-5 w-3/4 bg-muted rounded" />
            
            {/* Description */}
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-2/3 bg-muted rounded" />
            
            {/* Tags */}
            <div className="flex gap-2 pt-2">
              <div className="h-5 w-14 bg-muted rounded-full" />
              <div className="h-5 w-16 bg-muted rounded-full" />
              <div className="h-5 w-12 bg-muted rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}