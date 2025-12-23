// components/skeletons/contact-form-skeleton.tsx

export function ContactFormSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      {/* Contact Info Section */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-muted rounded-lg" />
          <div className="h-5 w-40 bg-muted rounded" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="h-4 w-12 bg-muted rounded" />
            <div className="h-11 bg-muted rounded-lg" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-16 bg-muted rounded" />
            <div className="h-11 bg-muted rounded-lg" />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="h-4 w-12 bg-muted rounded" />
            <div className="h-11 bg-muted rounded-lg" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-12 bg-muted rounded" />
            <div className="h-11 bg-muted rounded-lg" />
          </div>
        </div>
      </div>

      {/* Event Details Section */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-muted rounded-lg" />
          <div className="h-5 w-32 bg-muted rounded" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="h-4 w-20 bg-muted rounded" />
            <div className="h-11 bg-muted rounded-lg" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 bg-muted rounded" />
            <div className="h-11 bg-muted rounded-lg" />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="space-y-4">
        <div className="h-5 w-32 bg-muted rounded" />
        <div className="grid gap-3 sm:grid-cols-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-12 bg-muted rounded-lg" />
          ))}
        </div>
      </div>

      {/* Message Section */}
      <div className="space-y-2">
        <div className="h-4 w-16 bg-muted rounded" />
        <div className="h-32 bg-muted rounded-lg" />
      </div>

      {/* Submit Button */}
      <div className="h-12 w-40 bg-muted rounded-lg" />
    </div>
  );
}
