"use client";

import Link from "next/link";
import Image from "next/image";
import type { PortfolioProject } from "@/lib/types/portfolio";
import { motion } from "framer-motion";
import { ArrowRight } from "@/components/icons";

interface PortfolioCardProps {
  project: PortfolioProject;
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  // Generate SEO-friendly alt text
  const altText = `${project.title} - ${project.eventType} event${
    project.location ? ` in ${project.location}` : ""
  } - Pavilion360 portfolio`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="group block h-full overflow-hidden rounded-xl border border-border/50 bg-gradient-to-b from-card to-card/80 transition-all duration-500 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10"
      >
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.thumbnail || "/placeholder.svg"}
            alt={altText}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-700 group-hover:scale-110"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

          {/* Event type badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-accent-foreground backdrop-blur-sm shadow-lg">
              {project.eventType}
            </span>
          </div>

          {/* View project indicator */}
          <motion.div
            className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/90 px-4 py-2 text-xs font-medium backdrop-blur-sm">
              View Project
              <ArrowRight className="h-3 w-3" />
            </span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="mb-2 text-xl font-semibold transition-colors duration-300 group-hover:text-accent line-clamp-1">
            {project.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground mb-4">
            {project.description}
          </p>

          {/* Meta info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground/70">
            {project.location && (
              <span className="flex items-center gap-1">
                <span className="text-accent">📍</span>
                {project.location}
              </span>
            )}
            {project.date && <span>{project.date}</span>}
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent transition-all duration-500" />
      </Link>
    </motion.div>
  );
}
