// app/api/public/rentals/[slug]/route.ts
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

type Params = { params: Promise<{ slug: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: item, error } = await supabase
    .from("rental_items")
    .select(
      `
      id,
      name,
      slug,
      sku,
      subcategory,
      thumbnail_url,
      images,
      short_description,
      description,
      specs,
      is_popular,
      collection,
      color,
      finish,
      quantity,
      rental_categories (
        id,
        name,
        slug
      ),
      rental_item_event_types (
        event_types (
          id,
          name,
          slug
        )
      ),
      rental_item_tags (
        tags (
          id,
          name,
          slug
        )
      )
    `
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .is("deleted_at", null)
    .single();

  if (error || !item) {
    return Response.json(
      { success: false, error: "Rental item not found" },
      { status: 404 }
    );
  }

  // Get related items from same category
  const { data: relatedItems } = await supabase
    .from("rental_items")
    .select(
      `
      id,
      name,
      slug,
      thumbnail_url,
      short_description,
      rental_categories (
        name,
        slug
      )
    `
    )
    .eq("category_id", (item.rental_categories as any).id)
    .neq("id", item.id)
    .eq("is_active", true)
    .is("deleted_at", null)
    .limit(4);

  return Response.json({
    success: true,
    data: {
      ...item,
      relatedItems: relatedItems || [],
    },
  });
}
