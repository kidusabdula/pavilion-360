import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { services } from "@/lib/data/services"
import { HeroSection } from "@/components/shared/hero-section"
import { ServiceProcessSteps } from "@/components/services/service-process-steps"
import { ServiceUseCases } from "@/components/services/service-use-cases"
import { ServicePackages } from "@/components/services/service-packages"
import Link from "next/link"
import { ArrowRight } from "@/components/icons"

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug)

  if (!service) {
    return {
      title: "Service Not Found",
    }
  }

  return {
    title: `${service.name} | Pavilion360`,
    description: service.description,
  }
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const service = services.find((s) => s.slug === params.slug)

  if (!service) {
    notFound()
  }

  // Get related services for recommendations
  const relatedServicesList = service.relatedServices
    ?.map((id) => services.find((s) => s.id === id))
    .filter(Boolean)
    .slice(0, 3)

  return (
    <div className="flex flex-col">
      <HeroSection
        title={service.name}
        subtitle={service.tagline}
        backgroundImage={service.useCases?.[0]?.image}
        size="medium"
      />

      {/* Service Description */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-muted-foreground">{service.description}</p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      {service.whatWeDo && service.whatWeDo.length > 0 && (
        <section className="border-t border-border py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold lg:text-4xl">What We Do</h2>
            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.whatWeDo.map((item, index) => (
                <div key={index} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Use Cases */}
      {service.useCases && service.useCases.length > 0 && (
        <section className="border-t border-border py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold lg:text-4xl">Use Cases</h2>
            <ServiceUseCases useCases={service.useCases} />
          </div>
        </section>
      )}

      {/* Process Steps */}
      {service.process && service.process.length > 0 && (
        <section className="border-t border-border py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold lg:text-4xl">Our Process</h2>
            <ServiceProcessSteps steps={service.process} />
          </div>
        </section>
      )}

      {/* Packages */}
      {service.packages && service.packages.length > 0 && (
        <section className="border-t border-border py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold lg:text-4xl">Service Packages</h2>
            <ServicePackages packages={service.packages} />
          </div>
        </section>
      )}

      {/* Gallery */}
      {service.gallery && service.gallery.length > 0 && (
        <section className="border-t border-border py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold lg:text-4xl">Gallery</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.gallery.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg border border-border">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${service.name} example ${index + 1}`}
                    className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      {relatedServicesList && relatedServicesList.length > 0 && (
        <section className="border-t border-border py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold lg:text-4xl">Related Services</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServicesList.map((relatedService: any) => (
                <Link
                  key={relatedService.id}
                  href={`/services/${relatedService.slug}`}
                  className="group rounded-lg border border-border bg-card p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent hover:shadow-xl"
                >
                  <h3 className="mb-3 text-xl font-semibold transition-colors duration-300 group-hover:text-accent">
                    {relatedService.name}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{relatedService.tagline}</p>
                  <span className="text-sm font-medium text-accent">Learn more →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="border-t border-border bg-accent py-20 text-background lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold lg:text-4xl">Ready to Get Started?</h2>
          <p className="mb-8 text-lg opacity-90">
            Contact us today to discuss how we can bring your event vision to life.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-background px-8 py-4 font-semibold text-accent transition-transform duration-300 hover:scale-105"
          >
            Contact Us
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
