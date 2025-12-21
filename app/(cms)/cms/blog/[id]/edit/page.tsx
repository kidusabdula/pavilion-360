// app/(cms)/cms/blog/[id]/edit/page.tsx
// CMS Edit Blog page
"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/cms/shared/page-header";
import { LoadingSkeleton } from "@/components/cms/shared/loading-skeleton";
import { BlogForm } from "@/components/cms/modules/blog/blog-form";
import { useBlogPost, useUpdateBlogPost } from "@/hooks/cms/use-blog";
import { toast } from "sonner";
import type { CreateBlogInput } from "@/lib/schemas/blog.schema";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data, isLoading, error } = useBlogPost(id);
  const updateMutation = useUpdateBlogPost();
  
  const post = data?.data;
  
  const handleSubmit = async (formData: CreateBlogInput) => {
    try {
      await updateMutation.mutateAsync({ id, ...formData });
      toast.success("Blog post updated successfully");
      router.push(`/cms/blog/${id}`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update blog post"
      );
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Loading..."
          breadcrumbs={[
            { label: "Blog", href: "/cms/blog" },
            { label: "Edit" },
          ]}
        />
        <LoadingSkeleton type="form" />
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
            { label: "Edit" },
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
  
  // Transform post data for form
  const initialData: Partial<CreateBlogInput> = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? undefined,
    content: post.content ?? {}, // JSONB, default to empty object
    thumbnail_url: post.thumbnail_url ?? undefined,
    category_id: post.category_id ?? undefined,
    author_name: post.author_name ?? 'Pavilion360 Team',
    read_time_minutes: post.read_time_minutes ?? undefined,
    published_at: post.published_at ?? undefined,
    is_published: post.is_published ?? false,
    is_featured: post.is_featured ?? false,
    seo_title: post.seo_title ?? undefined,
    seo_description: post.seo_description ?? undefined,
    seo_image_url: post.seo_image_url ?? undefined,
  };
  
  return (
    <div className="space-y-8">
      <PageHeader
        title={`Edit: ${post.title}`}
        description="Update blog post details"
        breadcrumbs={[
          { label: "Blog", href: "/cms/blog" },
          { label: post.title, href: `/cms/blog/${id}` },
          { label: "Edit" },
        ]}
      />
      <div className="flex justify-center">
        <BlogForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
          isEdit
        />
      </div>
    </div>
  );
}