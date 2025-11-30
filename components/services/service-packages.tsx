import type { ServicePackage } from "@/lib/types/services"

interface ServicePackagesProps {
  packages: ServicePackage[]
}

export function ServicePackages({ packages }: ServicePackagesProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {packages.map((pkg) => (
        <div
          key={pkg.name}
          className="rounded-lg border border-border bg-card p-8 transition-all hover:border-accent hover:shadow-lg"
        >
          <h3 className="mb-2 text-2xl font-bold">{pkg.name}</h3>
          <p className="mb-4 leading-relaxed text-muted-foreground">{pkg.description}</p>
          {pkg.startingPrice && <p className="mb-6 text-3xl font-bold text-accent">{pkg.startingPrice}</p>}
          <ul className="space-y-2">
            {pkg.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1 text-accent">✓</span>
                <span className="text-sm leading-relaxed text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
