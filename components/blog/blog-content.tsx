// components/blog/blog-content.tsx
import { BlogClientView } from "./blog-client-view";
import { adaptDbPostsToPosts } from "@/lib/utils/blog-adapter";
import { createClient } from "@/lib/supabase/server";

async function getPosts() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("blog_posts")
      .select(
        `
        *,
        blog_categories(id, name, slug)
      `
      )
      .eq("is_published", true)
      .is("deleted_at", null)
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch blog posts:", error);
      return [];
    }

    return adaptDbPostsToPosts(data || []);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

async function getCategories() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("blog_categories")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Failed to fetch blog categories:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    return [];
  }
}

export async function BlogContent() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

  return <BlogClientView initialPosts={posts} categories={categories} />;
}
