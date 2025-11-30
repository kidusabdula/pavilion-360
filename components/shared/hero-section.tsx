import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  title: string | ReactNode
  subtitle?: string | ReactNode
  children?: ReactNode
  backgroundImage?: string
  overlay?: boolean
  size?: "default" | "large"
  align?: "left" | "center"
  className?: string
}

export function HeroSection({
  title,
  subtitle,
  children,
  backgroundImage,
  overlay = true,
  size = "default",
  align = "center",
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative flex items-center",
        size === "large" ? "min-h-[700px] py-32 lg:py-40" : "min-h-[500px] py-20 lg:py-32",
        className,
      )}
    >
      {/* Background Image */}
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/60" />
          )}
        </>
      )}

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className={cn("mx-auto max-w-4xl", align === "center" && "text-center", align === "left" && "text-left")}>
          {typeof title === "string" ? (
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          ) : (
            title
          )}

          {subtitle && <div className="mt-6 text-lg text-muted-foreground sm:text-xl">{subtitle}</div>}

          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  )
}
