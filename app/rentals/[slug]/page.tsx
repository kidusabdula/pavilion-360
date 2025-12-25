// app/rentals/[slug]/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { adaptDbRentalToRental } from "@/lib/utils/rental-adapter";
import type { RentalItem } from "@/lib/types/rentals";
import { RentalDetailSkeleton } from "@/components/skeletons";
import { ArrowRight, Check, Tag } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RentalDetailClient } from "@/components/rentals/rental-detail-client";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getRentalItem(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/public/rentals/${slug}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  const { data } = await res.json();
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dbItem = await getRentalItem(slug);
  if (!dbItem) {
    return { title: "Rental Item Not Found" };
  }

  const item = adaptDbRentalToRental(dbItem);
  return {
    title: `${item.name} - Equipment Rentals | Pavilion360`,
    description:
      item.shortDescription ||
      item.description ||
      `Rent ${item.name} for your next event`,
    openGraph: {
      title: item.name,
      description: item.shortDescription || item.description || "",
      type: "website",
      images: [item.thumbnail],
    },
  };
}

export default async function RentalDetailPage({ params }: Props) {
  const { slug } = await params;
  const dbItem = await getRentalItem(slug);
  if (!dbItem) notFound();

  const item = adaptDbRentalToRental(dbItem);
  const relatedItems = (dbItem.relatedItems || []).map(adaptDbRentalToRental);

  // Generate structured data for Product
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description: item.shortDescription || item.description,
    image: item.thumbnail,
    sku: item.sku,
    category: item.category,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Rentals",
        item: `${
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
        }/rentals`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: item.name,
        item: `${
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
        }/rentals/${item.slug}`,
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Structured Data */}
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
                href="/rentals"
                className="hover:text-accent transition-colors"
              >
                Rentals
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium truncate max-w-[200px]">
              {item.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* Main Content - Image Focused */}
      <section className="py-8 lg:py-12 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {/* Left: Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border/50 shadow-xl">
                <Image
                  src={item.thumbnail || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Thumbnail Gallery */}
              {item.images && item.images.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                  {item.images.slice(0, 4).map((image, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-lg overflow-hidden bg-muted border border-border/50 cursor-pointer hover:border-accent/50 transition-all duration-300 hover:shadow-lg"
                    >
                      <Image
                        src={image}
                        alt={`${item.name} - View ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 25vw, 12.5vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details */}
            <div className="space-y-6">
              {/* Category & Popular Badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
                {item.popular && (
                  <Badge className="bg-accent text-accent-foreground">
                    ★ Popular
                  </Badge>
                )}
              </div>

              {/* Title */}
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                  {item.name}
                </h1>
                {item.sku && (
                  <p className="text-sm text-muted-foreground">
                    SKU: {item.sku}
                  </p>
                )}
              </div>

              {/* Catalog Details */}
              {(item.collection || item.color || item.finish) && (
                <div className="flex flex-wrap gap-2">
                  {item.collection && (
                    <div className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20">
                      <span className="text-xs text-muted-foreground">
                        Collection:
                      </span>
                      <span className="ml-1.5 text-sm font-medium text-accent">
                        {item.collection}
                      </span>
                    </div>
                  )}
                  {item.color && (
                    <div className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20">
                      <span className="text-xs text-muted-foreground">
                        Color:
                      </span>
                      <span className="ml-1.5 text-sm font-medium text-accent">
                        {item.color}
                      </span>
                    </div>
                  )}
                  {item.finish && (
                    <div className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20">
                      <span className="text-xs text-muted-foreground">
                        Finish:
                      </span>
                      <span className="ml-1.5 text-sm font-medium text-accent">
                        {item.finish}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              {(item.shortDescription || item.description) && (
                <div className="prose prose-sm max-w-none">
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {item.shortDescription || item.description}
                  </p>
                </div>
              )}

              {/* Specifications */}
              {item.specs.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold">Specifications</h2>
                  <ul className="space-y-2">
                    {item.specs.map((spec, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          {spec}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Event Types */}
              {item.recommendedEventTypes.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Tag className="h-5 w-5 text-accent" />
                    Recommended For
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {item.recommendedEventTypes.map((eventType) => (
                      <Badge
                        key={eventType}
                        variant="outline"
                        className="capitalize"
                      >
                        {eventType}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Quote - Client Component */}
              <Suspense
                fallback={
                  <div className="h-12 w-full bg-muted rounded-xl animate-pulse" />
                }
              >
                <RentalDetailClient item={item} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Related Items */}
      {relatedItems.length > 0 && (
        <section className="border-t border-border bg-muted/20 py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                Similar Items
              </h2>
              <p className="text-muted-foreground">
                You might also be interested in these items
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {relatedItems.map((relatedItem: RentalItem) => (
                <Link
                  key={relatedItem.id}
                  href={`/rentals/${relatedItem.slug}`}
                  className="group overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={relatedItem.thumbnail || "/placeholder.svg"}
                      alt={relatedItem.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-semibold text-white line-clamp-2 text-sm">
                        {relatedItem.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/rentals"
                className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
              >
                View All Rentals
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="border-t border-border bg-accent py-16 text-background lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-background rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-background rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="mb-4 text-2xl lg:text-3xl font-bold">
            Ready to Rent This Item?
          </h2>
          <p className="mb-6 text-lg opacity-90 max-w-2xl mx-auto">
            Get a custom quote for your event. We&apos;ll help you find the
            perfect equipment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-background px-8 py-3 font-semibold text-accent transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Contact Us
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/rentals"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-background/30 px-8 py-3 font-semibold text-background transition-all duration-300 hover:bg-background/10"
            >
              Browse All Rentals
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
