// components/services/service-detail-content.tsx
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { ServiceProcessSteps } from "./service-process-steps";
import { ServiceUseCases } from "./service-use-cases";
import { ServicePackages } from "./service-packages";
import { adaptDbServiceToService } from "@/lib/utils/service-adapter";
import {
  generateServiceSchema,
  generateBreadcrumbSchema,
} from "@/lib/utils/seo";

interface DbService {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  icon: string;
  thumbnail_url: string | null;
  what_we_do: string[] | null;
  gallery: string[] | null;
  display_order: number;
  service_use_cases?: Array<{
    id: string;
    title: string;
    description: string;
    image_url: string | null;
    display_order: number;
  }>;
  service_process_steps?: Array<{
    id: string;
    step_number: number;
    title: string;
    description: string;
  }>;
  service_packages?: Array<{
    id: string;
    name: string;
    description: string;
    starting_price: string | null;
    features: string[];
    display_order: number;
  }>;
  relatedServices?: Array<{
    id: string;
    name: string;
    slug: string;
    tagline: string;
    icon: string;
  }>;
}

interface ServiceDetailContentProps {
  service: DbService;
}

export function ServiceDetailContent({ service }: ServiceDetailContentProps) {
  // Adapt DB service to Service type used by existing components
  const adaptedService = adaptDbServiceToService(service);

  // Generate structured data
  const serviceSchema = generateServiceSchema(adaptedService);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.name, url: `/services/${service.slug}` },
  ]);

  return (
    <>
      {/* Structured Data */}
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/services"
                className="hover:text-accent transition-colors"
              >
                Services
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{service.name}</li>
          </ol>
        </div>
      </nav>

      {/* Service Description with Highlights */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent mb-6">
                <Sparkles className="h-4 w-4" />
                Professional {service.name}
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <div className="text-center p-4 rounded-xl bg-card border border-border/50">
                <div className="text-2xl font-bold text-accent mb-1">500+</div>
                <div className="text-sm text-muted-foreground">
                  Events Completed
                </div>
              </div>
              <div className="text-center p-4 rounded-xl bg-card border border-border/50">
                <div className="text-2xl font-bold text-accent mb-1">15+</div>
                <div className="text-sm text-muted-foreground">
                  Years Experience
                </div>
              </div>
              <div className="text-center p-4 rounded-xl bg-card border border-border/50">
                <div className="text-2xl font-bold text-accent mb-1">100%</div>
                <div className="text-sm text-muted-foreground">
                  Satisfaction Rate
                </div>
              </div>
              <div className="text-center p-4 rounded-xl bg-card border border-border/50">
                <div className="text-2xl font-bold text-accent mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">
                  Event Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do - Enhanced */}
      {adaptedService.whatWeDo && adaptedService.whatWeDo.length > 0 && (
        <section className="border-t border-border bg-muted/20 py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold lg:text-4xl mb-4">
                What We Offer
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive {service.name.toLowerCase()} solutions tailored to
                your event needs
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {adaptedService.whatWeDo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl border border-border/50 bg-card p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
                >
                  <div className="shrink-0 mt-0.5">
                    <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center">
                      <Check className="h-3.5 w-3.5 text-accent" />
                    </div>
                  </div>
                  <span className="text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Use Cases */}
      {adaptedService.useCases && adaptedService.useCases.length > 0 && (
        <section className="border-t border-border py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold lg:text-4xl mb-4">
                Perfect For
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See how our {service.name.toLowerCase()} services transform
                different event types
              </p>
            </div>
            <ServiceUseCases useCases={adaptedService.useCases} />
          </div>
        </section>
      )}

      {/* Process Steps */}
      {adaptedService.process && adaptedService.process.length > 0 && (
        <section className="border-t border-border bg-muted/20 py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold lg:text-4xl mb-4">
                Our Process
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A seamless journey from concept to flawless execution
              </p>
            </div>
            <ServiceProcessSteps steps={adaptedService.process} />
          </div>
        </section>
      )}

      {/* Packages */}
      {adaptedService.packages && adaptedService.packages.length > 0 && (
        <section className="border-t border-border py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold lg:text-4xl mb-4">
                Service Packages
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Flexible options to match your event scale and budget
              </p>
            </div>
            <ServicePackages packages={adaptedService.packages} />
          </div>
        </section>
      )}

      {/* Gallery - Enhanced */}
      {adaptedService.gallery &&
        adaptedService.gallery.length > 0 &&
        !adaptedService.gallery[0].includes("placeholder") && (
          <section className="border-t border-border bg-muted/20 py-20 lg:py-28">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold lg:text-4xl mb-4">
                  Our Work
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  See our {service.name.toLowerCase()} expertise in action
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {adaptedService.gallery.map((image, index) => {
                  const altKeywords =
                    adaptedService.whatWeDo?.slice(0, 2).join(", ") ||
                    adaptedService.tagline;
                  const altText = `${service.name} - ${altKeywords} - Indianapolis event production`;
                  return (
                    <div
                      key={index}
                      className="group overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5"
                    >
                      <div className="relative aspect-4/3 overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={altText}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-sm font-medium text-white drop-shadow-lg">
                            {service.name} Project
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

      {/* Related Services - Enhanced */}
      {service.relatedServices && service.relatedServices.length > 0 && (
        <section className="border-t border-border py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold lg:text-4xl mb-4">
                Related Services
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore more ways we can elevate your event
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {service.relatedServices.map((relatedService) => (
                <Link
                  key={relatedService.id}
                  href={`/services/${relatedService.slug}`}
                  className="group rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5"
                >
                  <div className="mb-4 h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Sparkles className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold transition-colors duration-300 group-hover:text-accent">
                    {relatedService.name}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {relatedService.tagline}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Enhanced */}
      <section className="border-t border-border bg-accent py-20 text-background lg:py-28 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-background rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-background rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-lg opacity-90 max-w-2xl mx-auto">
            Let&apos;s discuss how our {service.name.toLowerCase()} services can
            transform your next event into an unforgettable experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-background px-8 py-4 font-semibold text-accent transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Contact Us
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/rentals"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-background/30 px-8 py-4 font-semibold text-background transition-all duration-300 hover:bg-background/10"
            >
              Browse Equipment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
