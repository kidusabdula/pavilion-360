// components/skeletons/blog-detail-skeleton.tsx
export function BlogDetailSkeleton() {
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
      
      {/* Article Header */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Category */}
            <div className="h-6 w-28 bg-muted rounded-full mx-auto" />
            
            {/* Title */}
            <div className="h-10 w-full bg-muted rounded" />
            <div className="h-10 w-3/4 bg-muted rounded mx-auto" />
            
            {/* Meta */}
            <div className="flex justify-center gap-6">
              <div className="h-4 w-28 bg-muted rounded" />
              <div className="h-4 w-20 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className={`h-5 bg-muted rounded ${i % 3 === 0 ? 'w-3/4' : 'w-full'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}