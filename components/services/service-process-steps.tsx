"use client";

import type { ProcessStep } from "@/lib/types/services";
import { motion } from "framer-motion";

interface ServiceProcessStepsProps {
  steps: ProcessStep[];
}

export function ServiceProcessSteps({ steps }: ServiceProcessStepsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {steps.map((step, index) => (
        <motion.div
          key={step.step}
          className="group rounded-xl border border-border/50 bg-linear-to-b from-card to-card/80 p-8 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -5 }}
        >
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-xl font-bold text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
              {step.step}
            </div>
            <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
              {step.title}
            </h3>
          </div>
          <p className="leading-relaxed text-muted-foreground">
            {step.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
