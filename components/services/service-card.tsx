"use client";

import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/lib/types/services";
import { motion } from "framer-motion";
import { ArrowRight } from "@/components/icons";

interface ServiceCardProps {
  service: Service;
}

// Icon mapping based on service icon property
const serviceColors: Record<string, string> = {
  calendar: "from-blue-500/20 to-blue-600/20",
  palette: "from-purple-500/20 to-purple-600/20",
  speaker: "from-green-500/20 to-green-600/20",
  utensils: "from-orange-500/20 to-orange-600/20",
  clipboard: "from-cyan-500/20 to-cyan-600/20",
  sofa: "from-pink-500/20 to-pink-600/20",
};

export function ServiceCard({ service }: ServiceCardProps) {
  const gradientColor =
    serviceColors[service.icon] || "from-accent/20 to-accent/30";
  const hasImage =
    service.useCases?.[0]?.image &&
    !service.useCases[0].image.includes("placeholder");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Link
        href={`/services/${service.slug}`}
        aria-label={`Learn more about ${service.name}`}
        className="group flex flex-col h-full rounded-xl border border-border/50 bg-gradient-to-b from-card to-card/80 overflow-hidden transition-all duration-500 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10"
      >
        {/* Image or gradient header */}
        <div
          className={`relative h-32 overflow-hidden bg-gradient-to-br ${gradientColor}`}
        >
          {hasImage ? (
            <Image
              src={service.useCases[0].image}
              alt={`${service.name} service`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-80"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent" />
          )}

          {/* Decorative element */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-accent/10 blur-2xl group-hover:bg-accent/20 transition-colors duration-500" />

          {/* Icon badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-background/90 backdrop-blur-sm shadow-lg text-accent font-bold text-sm">
              {service.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          <h3 className="mb-2 text-lg font-semibold transition-colors duration-300 group-hover:text-accent line-clamp-2">
            {service.name}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2 flex-1">
            {service.tagline}
          </p>

          {/* What we do preview */}
          {service.whatWeDo && service.whatWeDo.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {service.whatWeDo.slice(0, 2).map((item, idx) => (
                <span
                  key={idx}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground border border-border/30"
                >
                  {item.length > 20 ? item.slice(0, 20) + "..." : item}
                </span>
              ))}
              {service.whatWeDo.length > 2 && (
                <span className="text-[10px] px-2 py-0.5 text-muted-foreground">
                  +{service.whatWeDo.length - 2} more
                </span>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center gap-2 text-sm font-medium text-accent group/link">
            <span>Learn more</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent transition-all duration-500" />
      </Link>
    </motion.div>
  );
}
