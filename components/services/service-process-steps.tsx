import type { ProcessStep } from "@/lib/types/services"

interface ServiceProcessStepsProps {
  steps: ProcessStep[]
}

export function ServiceProcessSteps({ steps }: ServiceProcessStepsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {steps.map((step) => (
        <div
          key={step.step}
          className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-accent"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-lg font-bold text-accent">
              {step.step}
            </div>
            <h3 className="text-lg font-semibold">{step.title}</h3>
          </div>
          <p className="leading-relaxed text-muted-foreground">{step.description}</p>
        </div>
      ))}
    </div>
  )
}
