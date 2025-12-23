// components/skeletons/blog-grid-skeleton.tsx
export function BlogGridSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="rounded-xl border border-border/50 bg-card overflow-hidden animate-pulse"
        >
          {/* Image skeleton */}
          <div className="relative aspect-[16/10] bg-muted">
            <div className="absolute top-4 left-4 h-6 w-24 bg-muted-foreground/20 rounded-full" />
          </div>
          
          {/* Content skeleton */}
          <div className="p-6 space-y-3">
            {/* Meta */}
            <div className="flex gap-3">
              <div className="h-3 w-20 bg-muted rounded" />
              <div className="h-3 w-16 bg-muted rounded" />
            </div>
            
            {/* Title */}
            <div className="h-5 w-full bg-muted rounded" />
            <div className="h-5 w-3/4 bg-muted rounded" />
            
            {/* Excerpt */}
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-2/3 bg-muted rounded" />
            
            {/* Link */}
            <div className="h-4 w-24 bg-muted rounded mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}