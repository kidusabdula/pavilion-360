// app/portfolio/[slug]/page.tsx
import type { Metadata } from 'next';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { HeroSection } from '@/components/shared/hero-section';
import { PortfolioDetailSkeleton } from '@/components/skeletons';
import { notFound } from 'next/navigation';
import { generateEventSchema, generateBreadcrumbSchema } from '@/lib/utils/seo';
import { adaptDbProjectToProject, getServicesFromProject } from '@/lib/utils/portfolio-adapter';
import {
  ArrowRight,
  Calendar,
  MapPin,
  Users,
  Check,
  Quote,
} from '@/components/icons';

type Props = {
  params: Promise<{ slug: string }>;
};

async function getProject(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const res = await fetch(`${baseUrl}/api/public/portfolio/${slug}`, {
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) return null;
  
  const { data } = await res.json();
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dbProject = await getProject(slug);
  if (!dbProject) {
    return { title: 'Project Not Found' };
  }
  
  const project = adaptDbProjectToProject(dbProject);
  return {
    title: `${project.title} - Portfolio | Pavilion360`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      images: [project.thumbnail],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const dbProject = await getProject(slug);
  if (!dbProject) notFound();
  
  const project = adaptDbProjectToProject(dbProject);
  const services = getServicesFromProject(dbProject);
  const relatedProjects = dbProject.relatedProjects || [];
  
  // Generate structured data
  const eventSchema = generateEventSchema(project);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Portfolio', url: '/portfolio' },
    { name: project.title, url: `/portfolio/${project.slug}` },
  ]);

  return (
    <div className="flex flex-col">
      {/* Structured Data */}
      <Script
        id="event-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <HeroSection
        title={project.title}
        subtitle={project.eventType}
        backgroundImage={project.thumbnail}
        size="medium"
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
              <Link href="/portfolio" className="hover:text-accent transition-colors">
                Portfolio
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium truncate max-w-[200px]">
              {project.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Project Meta Info Bar */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-5 w-5 text-accent" />
              <span>{project.date}</span>
            </div>
            {project.venue && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 text-accent" />
                <span>{project.venue}</span>
              </div>
            )}
            {project.attendees && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5 text-accent" />
                <span>{project.attendees.toLocaleString()} Attendees</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                {project.eventType}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Description */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">About This Project</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </div>

            {/* Goals */}
            {project.goals && (
              <div className="mb-16 p-8 rounded-2xl bg-muted/30 border border-border/50">
                <h2 className="text-2xl font-bold mb-4">Event Goals</h2>
                <p className="leading-relaxed text-muted-foreground">
                  {project.goals}
                </p>
              </div>
            )}

            {/* Services Provided */}
            {services.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6">Services Provided</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 group"
                    >
                      <div className="shrink-0 h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Check className="h-5 w-5 text-accent" />
                      </div>
                      <span className="font-medium group-hover:text-accent transition-colors">
                        {service.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Highlights */}
            {project.technicalHighlights.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6">Technical Highlights</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.technicalHighlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-card"
                    >
                      <div className="shrink-0 mt-0.5">
                        <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-accent">
                            {idx + 1}
                          </span>
                        </div>
                      </div>
                      <span className="leading-relaxed text-muted-foreground">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Client Quote */}
            {project.clientQuote && (
              <div className="mb-16 relative">
                <div className="absolute -top-4 left-8 text-accent/20">
                  <Quote className="h-16 w-16" />
                </div>
                <div className="rounded-2xl border border-accent/20 bg-accent/5 p-8 md:p-12 relative">
                  <blockquote className="mb-6 text-xl md:text-2xl italic leading-relaxed font-light">
                    &ldquo;{project.clientQuote.text}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-lg font-bold text-accent">
                        {project.clientQuote.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{project.clientQuote.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {project.clientQuote.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6">Event Gallery</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {project.gallery.map((image, idx) => (
                    <div
                      key={idx}
                      className="group overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5"
                    >
                      <div className="relative aspect-4/3 overflow-hidden">
                        <Image
                          src={image}
                          alt={`${project.title} - Image ${idx + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* More Projects */}
      {relatedProjects.length > 0 && (
        <section className="border-t border-border bg-muted/20 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">More Projects</h2>
              <p className="text-muted-foreground">
                Explore more of our successful events
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {relatedProjects.map((otherProject: any) => (
                <Link
                  key={otherProject.slug}
                  href={`/portfolio/${otherProject.slug}`}
                  className="group overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={otherProject.thumbnail_url || '/placeholder.svg'}
                      alt={otherProject.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-xs font-medium text-accent bg-accent/20 px-2 py-1 rounded-full">
                        {otherProject.event_types?.name || 'Event'}
                      </span>
                      <h3 className="mt-2 font-semibold text-white line-clamp-1">
                        {otherProject.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
              >
                View All Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="border-t border-border bg-accent py-20 text-background lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-background rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-background rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
            Ready to Create Your Event?
          </h2>
          <p className="mb-8 text-lg opacity-90 max-w-2xl mx-auto">
            Let&apos;s bring your vision to life with the same level of
            excellence and attention to detail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-background px-8 py-4 font-semibold text-accent transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Start Your Project
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-background/30 px-8 py-4 font-semibold text-background transition-all duration-300 hover:bg-background/10"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}