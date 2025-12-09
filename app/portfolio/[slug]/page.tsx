import type { Metadata } from "next";
import Script from "next/script";
import { HeroSection } from "@/components/shared/hero-section";
import { portfolioProjects } from "@/lib/data/portfolio";
import { services } from "@/lib/data/services";
import { notFound } from "next/navigation";
import { generateEventSchema, generateBreadcrumbSchema } from "@/lib/utils/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);

  if (!project) notFound();

  // Generate structured data
  const eventSchema = generateEventSchema(project);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Portfolio", url: "/portfolio" },
    { name: project.title, url: `/portfolio/${project.slug}` },
  ]);

  return (
    <div className="flex flex-col">
      {/* Structured Data */}
      <Script
        id="event-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventSchema),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <HeroSection
        title={project.title}
        subtitle={`${project.eventType} • ${
          project.venue || "Various Locations"
        } • ${project.date}`}
        backgroundImage={project.thumbnail}
        size="medium"
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            {project.goals && (
              <div className="mb-12">
                <h2 className="mb-4 text-2xl font-bold">Event Goals</h2>
                <p className="leading-relaxed text-muted-foreground">
                  {project.goals}
                </p>
              </div>
            )}

            <div className="mb-12">
              <h2 className="mb-4 text-2xl font-bold">Services Provided</h2>
              <div className="flex flex-wrap gap-2">
                {project.servicesProvided.map((serviceId) => {
                  const service = services.find((s) => s.id === serviceId);
                  return (
                    <span
                      key={serviceId}
                      className="rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent"
                    >
                      {service?.name || serviceId}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="mb-12">
              <h2 className="mb-4 text-2xl font-bold">Technical Highlights</h2>
              <ul className="space-y-2">
                {project.technicalHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 text-accent">•</span>
                    <span className="leading-relaxed text-muted-foreground">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {project.clientQuote && (
              <div className="rounded-lg border border-border bg-muted/30 p-8">
                <p className="mb-4 text-lg italic leading-relaxed">
                  "{project.clientQuote.text}"
                </p>
                <div className="text-sm">
                  <p className="font-semibold">{project.clientQuote.author}</p>
                  <p className="text-muted-foreground">
                    {project.clientQuote.role}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}
