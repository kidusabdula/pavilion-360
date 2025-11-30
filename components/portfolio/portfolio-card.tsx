import Link from "next/link"
import type { PortfolioProject } from "@/lib/types/portfolio"

interface PortfolioCardProps {
  project: PortfolioProject
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-accent hover:shadow-lg"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={project.thumbnail || "/placeholder.svg"}
          alt={`${project.title} - ${project.eventType} event showcase`}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-accent">{project.eventType}</div>
        <h3 className="mb-2 text-xl font-semibold group-hover:text-accent">{project.title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
      </div>
    </Link>
  )
}
