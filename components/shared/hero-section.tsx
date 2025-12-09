"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface HeroSectionProps {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  children?: ReactNode;
  backgroundImage?: string;
  overlay?: boolean;
  size?: "default" | "large" | "medium";
  align?: "left" | "center";
  className?: string;
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
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax effect for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className={cn(
        "relative flex items-center overflow-hidden",
        size === "large" && "min-h-[700px] py-32 lg:py-40",
        size === "medium" && "min-h-[400px] py-20 lg:py-28",
        size === "default" && "min-h-[500px] py-20 lg:py-32",
        className
      )}
    >
      {/* Background Image with Parallax */}
      {backgroundImage && (
        <>
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              y: backgroundY,
            }}
          />
          {overlay && (
            <>
              {/* Premium multi-layer gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background/90" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
              {/* Subtle noise texture for premium feel */}
              <div
                className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                }}
              />
            </>
          )}
        </>
      )}

      {/* Decorative accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="container relative z-10 mx-auto px-4"
      >
        <div
          className={cn(
            "mx-auto max-w-4xl",
            align === "center" && "text-center",
            align === "left" && "text-left"
          )}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {typeof title === "string" ? (
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text">
                {title}
              </h1>
            ) : (
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                {title}
              </h1>
            )}
          </motion.div>

          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 text-lg text-muted-foreground sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.div>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10"
            >
              {children}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Bottom fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
