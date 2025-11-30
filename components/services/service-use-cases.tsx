import type { ServiceUseCase } from "@/lib/types/services"

interface ServiceUseCasesProps {
  useCases: ServiceUseCase[]
}

export function ServiceUseCases({ useCases }: ServiceUseCasesProps) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {useCases.map((useCase, idx) => (
        <div key={idx} className="group overflow-hidden rounded-lg border border-border bg-card">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={useCase.image || "/placeholder.svg"}
              alt={`${useCase.title} - use case example for event services`}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="p-6">
            <h3 className="mb-2 text-lg font-semibold">{useCase.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{useCase.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
