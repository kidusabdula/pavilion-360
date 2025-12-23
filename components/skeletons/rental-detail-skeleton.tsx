// components/skeletons/rental-detail-skeleton.tsx
export function RentalDetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb */}
      <div className="border-b border-border py-3">
        <div className="container mx-auto px-4">
          <div className="h-4 w-64 bg-muted rounded" />
        </div>
      </div>
      
      {/* Main content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="aspect-square bg-muted rounded-2xl" />
            
            {/* Details */}
            <div className="space-y-6">
              <div className="h-5 w-32 bg-muted rounded-full" />
              <div className="h-8 w-3/4 bg-muted rounded" />
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-5/6 bg-muted rounded" />
              
              {/* Specs */}
              <div className="space-y-2 pt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-5 w-5 bg-muted rounded" />
                    <div className="h-4 w-48 bg-muted rounded" />
                  </div>
                ))}
              </div>
              
              {/* Button */}
              <div className="h-12 w-40 bg-muted rounded-xl mt-6" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}