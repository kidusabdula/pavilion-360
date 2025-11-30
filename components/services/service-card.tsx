import Link from "next/link"
import type { Service } from "@/lib/types/services"

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      aria-label={`Learn more about ${service.name}`}
      className="group rounded-lg border border-border bg-card p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent hover:shadow-xl"
    >
      <h3 className="mb-3 text-xl font-semibold transition-colors duration-300 group-hover:text-accent">
        {service.name}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{service.tagline}</p>
      <span className="text-sm font-medium text-accent">Learn more →</span>
    </Link>
  )
}
