// components/skeletons/service-detail-skeleton.tsx
export function ServiceDetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="border-b border-border bg-muted/30 py-3">
        <div className="container mx-auto px-4">
          <div className="h-4 w-48 bg-muted rounded" />
        </div>
      </div>
      
      {/* Description section skeleton */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <div className="h-8 w-48 bg-muted rounded-full mx-auto" />
            <div className="h-5 w-full bg-muted rounded mx-auto" />
            <div className="h-5 w-3/4 bg-muted rounded mx-auto" />
            
            {/* Stats skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-4 rounded-xl bg-card border border-border/50">
                  <div className="h-8 w-16 bg-muted rounded mx-auto mb-2" />
                  <div className="h-4 w-24 bg-muted rounded mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* What We Do skeleton */}
      <section className="border-t border-border bg-muted/20 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-muted rounded mx-auto mb-4" />
            <div className="h-4 w-64 bg-muted rounded mx-auto" />
          </div>
          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-border/50 bg-card p-5">
                <div className="h-6 w-6 bg-muted rounded-full shrink-0" />
                <div className="h-4 w-full bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}