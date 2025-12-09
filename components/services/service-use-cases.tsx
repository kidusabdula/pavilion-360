"use client";

import type { ServiceUseCase } from "@/lib/types/services";
import Image from "next/image";
import { motion } from "framer-motion";

interface ServiceUseCasesProps {
  useCases: ServiceUseCase[];
}

export function ServiceUseCases({ useCases }: ServiceUseCasesProps) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {useCases.map((useCase, idx) => (
        <motion.div
          key={idx}
          className="group overflow-hidden rounded-xl border border-border/50 bg-linear-to-b from-card to-card/80 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:border-accent/30"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1, duration: 0.5 }}
          whileHover={{ y: -6 }}
        >
          <div className="relative aspect-4/3 overflow-hidden">
            <Image
              src={useCase.image || "/placeholder.svg"}
              alt={`${useCase.title} - use case example for event services`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-6">
            <h3 className="mb-3 text-lg font-bold group-hover:text-accent transition-colors">
              {useCase.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {useCase.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
