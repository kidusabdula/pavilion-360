import type { Venue } from "@/lib/types/venues"

interface VenueCardProps {
  venue: Venue
}

export function VenueCard({ venue }: VenueCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-accent hover:shadow-lg">
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={venue.thumbnail || "/placeholder.svg"}
          alt={`${venue.name} event venue in ${venue.city}`}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-semibold">{venue.name}</h3>
        <p className="mb-3 text-sm text-muted-foreground">{venue.location}</p>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{venue.description}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Capacity: {venue.capacityRange.min}-{venue.capacityRange.max}
          </span>
          {venue.externalLink && (
            <a
              href={venue.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Learn more about ${venue.name} (opens in new tab)`}
              className="font-medium text-accent hover:underline"
            >
              Learn more →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
