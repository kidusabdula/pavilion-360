// app/(cms)/cms/blog/new/page.tsx
// CMS Create Blog page
"use client";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/cms/shared/page-header";
import { BlogForm } from "@/components/cms/modules/blog/blog-form";
import { useCreateBlogPost } from "@/hooks/cms/use-blog";
import { toast } from "sonner";
import type { CreateBlogInput } from "@/lib/schemas/blog.schema";

export default function NewBlogPage() {
  const router = useRouter();
  const createMutation = useCreateBlogPost();
  
  const handleSubmit = async (data: CreateBlogInput) => {
    try {
      await createMutation.mutateAsync(data);
      toast.success("Blog post created successfully");
      router.push("/cms/blog");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create blog post"
      );
    }
  };
  
  return (
    <div className="space-y-8">
      <PageHeader
        title="New Post"
        description="Write a new blog post"
        breadcrumbs={[
          { label: "Blog", href: "/cms/blog" },
          { label: "New" },
        ]}
      />
      <div className="flex justify-center">
        <BlogForm
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending}
        />
      </div>
    </div>
  );
}