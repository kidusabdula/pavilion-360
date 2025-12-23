// components/skeletons/portfolio-detail-skeleton.tsx
export function PortfolioDetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero placeholder */}
      <div className="h-64 md:h-80 bg-muted" />
      
      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30 py-3">
        <div className="container mx-auto px-4">
          <div className="h-4 w-64 bg-muted rounded" />
        </div>
      </div>
      
      {/* Meta bar */}
      <div className="border-b border-border bg-card py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="h-5 w-28 bg-muted rounded" />
            <div className="h-5 w-36 bg-muted rounded" />
            <div className="h-5 w-24 bg-muted rounded" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Description */}
            <div>
              <div className="h-7 w-48 bg-muted rounded mb-6" />
              <div className="h-5 w-full bg-muted rounded mb-2" />
              <div className="h-5 w-full bg-muted rounded mb-2" />
              <div className="h-5 w-3/4 bg-muted rounded" />
            </div>
            
            {/* Services grid */}
            <div>
              <div className="h-7 w-40 bg-muted rounded mb-6" />
              <div className="grid gap-3 sm:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 bg-muted rounded-xl" />
                ))}
              </div>
            </div>
            
            {/* Highlights */}
            <div>
              <div className="h-7 w-52 bg-muted rounded mb-6" />
              <div className="grid gap-4 sm:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 bg-muted rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}