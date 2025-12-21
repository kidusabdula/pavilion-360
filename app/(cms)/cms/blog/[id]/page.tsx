// app/(cms)/cms/blog/[id]/page.tsx
// CMS Blog Detail page
"use client";
import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, ExternalLink, ArrowLeft, Calendar, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/cms/shared/page-header";
import { LoadingSkeleton } from "@/components/cms/shared/loading-skeleton";
import { StatusBadge } from "@/components/cms/shared/status-badge";
import { useBlogPost } from "@/hooks/cms/use-blog";

interface BlogPageProps {
  params: Promise<{ id: string }>;
}

export default function BlogDetailPage({ params }: BlogPageProps) {
  const { id } = use(params);
  const { data, isLoading, error } = useBlogPost(id);
  
  const post = data?.data;
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Loading..."
          breadcrumbs={[
            { label: "Blog", href: "/cms/blog" },
            { label: "Detail" },
          ]}
        />
        <LoadingSkeleton type="detail" />
      </div>
    );
  }
  
  if (error || !post) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Error"
          breadcrumbs={[
            { label: "Blog", href: "/cms/blog" },
            { label: "Detail" },
          ]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">
            {error?.message || "Blog post not found"}
          </p>
          <Button asChild className="mt-4" variant="outline">
            <Link href="/cms/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <PageHeader
        title={post.title}
        description={post.excerpt || undefined}
        breadcrumbs={[
          { label: "Blog", href: "/cms/blog" },
          { label: post.title },
        ]}
        actions={
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href={`/blog/${post.slug}`} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Live
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/cms/blog/${post.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
          </div>
        }
      />
      
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Thumbnail */}
          {post.thumbnail_url && (
            <div className="relative aspect-video overflow-hidden rounded-xl border border-border">
              <Image
                src={post.thumbnail_url}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          {/* Excerpt */}
          {post.excerpt && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Excerpt</h2>
              <p className="whitespace-pre-wrap text-muted-foreground">{post.excerpt}</p>
            </div>
          )}
          
          {/* Content Preview */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Content</h2>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {/* Note: In a real implementation, you would render the TipTap content here */}
              <p className="text-muted-foreground italic">
                Content preview would be rendered here using TipTap renderer
              </p>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Published</span>
                <StatusBadge status={post.is_published ? "active" : "draft"} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Featured</span>
                <StatusBadge status={post.is_featured ? "featured" : "draft"} />
              </div>
              {post.published_at && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Published</span>
                  <span className="text-sm">
                    {new Date(post.published_at).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Category */}
          {(post as any).blog_categories && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Category</h2>
              <p className="font-medium">
                {(post as any).blog_categories.name}
              </p>
            </div>
          )}
          
          {/* Metadata */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Metadata</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Author</span>
                <span>{post.author_name || '—'}</span>
              </div>
              {post.read_time_minutes && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Read Time</span>
                  <span>{post.read_time_minutes} min</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Views</span>
                <span>{post.view_count?.toLocaleString() || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated</span>
                <span>
                  {new Date(post.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}