// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/shared/hero-section";
import { adaptDbPostToPostDetail } from "@/lib/utils/blog-adapter";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "@/components/icons";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getPost(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/public/blog/${slug}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  const { data } = await res.json();
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dbPost = await getPost(slug);

  if (!dbPost) {
    return { title: "Post Not Found" };
  }

  const post = adaptDbPostToPostDetail(dbPost);

  return {
    title: post.seoTitle || `${post.title} | Pavilion360 Blog`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [post.seoImage || post.thumbnail],
    },
  };
}

// Simple TipTap content renderer
function renderContent(content: any) {
  if (!content || !content.content) {
    return <p className="text-muted-foreground">Content coming soon...</p>;
  }

  return content.content.map((node: any, index: number) => {
    switch (node.type) {
      case "heading":
        const level = node.attrs?.level || 2;
        const headingText = node.content?.map((c: any) => c.text).join("");
        const headingClass = "text-2xl font-bold mt-8 mb-4";

        if (level === 2) {
          return (
            <h2 key={index} className={headingClass}>
              {headingText}
            </h2>
          );
        } else if (level === 3) {
          return (
            <h3 key={index} className={headingClass}>
              {headingText}
            </h3>
          );
        } else if (level === 4) {
          return (
            <h4 key={index} className={headingClass}>
              {headingText}
            </h4>
          );
        }
        return (
          <h2 key={index} className={headingClass}>
            {headingText}
          </h2>
        );

      case "paragraph":
        return (
          <p key={index} className="mb-4 leading-relaxed text-muted-foreground">
            {node.content?.map((c: any) => c.text).join("")}
          </p>
        );
      case "bulletList":
        return (
          <ul
            key={index}
            className="list-disc list-inside mb-4 space-y-2 text-muted-foreground"
          >
            {node.content?.map((item: any, i: number) => (
              <li key={i}>
                {item.content?.[0]?.content?.map((c: any) => c.text).join("")}
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const dbPost = await getPost(slug);

  if (!dbPost) notFound();

  const post = adaptDbPostToPostDetail(dbPost);
  const relatedPosts = dbPost.relatedPosts || [];

  return (
    <div className="flex flex-col">
      <HeroSection
        title={post.title}
        subtitle={post.category}
        backgroundImage={post.thumbnail}
        size="medium"
      />

      {/* Breadcrumb */}
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
                href="/blog"
                className="hover:text-accent transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium truncate max-w-[200px]">
              {post.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Article Header */}
      <section className="py-12 border-b border-border/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent mb-6">
              {post.category}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
              <span>By {post.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            {renderContent(post.content)}
          </div>
        </div>
      </article>

      {/* Tags */}
      {post.tags.length > 0 && (
        <section className="pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all articles
            </Link>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-border bg-muted/20 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Related Articles</h2>
              <p className="text-muted-foreground">
                Continue reading our latest insights
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {relatedPosts.map((relatedPost: any) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={relatedPost.thumbnail_url || "/placeholder.svg"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-xs font-medium text-accent bg-accent/20 px-2 py-1 rounded-full">
                        {relatedPost.blog_categories?.name || "Blog"}
                      </span>
                      <h3 className="mt-2 font-semibold text-white line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
              >
                View All Articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
