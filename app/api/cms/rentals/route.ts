// app/api/cms/rentals/route.ts
// CMS API for rentals - GET (list) and POST (create)
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  ApiError,
  handleApiError,
  successResponse,
} from "@/lib/utils/api-error";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    // Query params
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "display_order";
    const sortOrder = (searchParams.get("sortOrder") || "asc") as
      | "asc"
      | "desc";
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const includeDeleted = searchParams.get("includeDeleted") === "true";

    // Build query
    let query = supabase.from("rental_items").select(
      `
        *,
        rental_categories (
          id,
          name,
          slug
        )
      `,
      { count: "exact" }
    );

    // Handle soft deletes
    if (!includeDeleted) {
      query = query.is("deleted_at", null);
    }

    // Join with category
    if (category) {
      query = query.eq("category_id", category);
    }

    // Filter featured
    if (featured === "true") {
      query = query.eq("is_featured", true);
    } else if (featured === "false") {
      query = query.eq("is_featured", false);
    }

    // Search
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Sorting
    query = query.order(sortBy, { ascending: sortOrder === "asc" });

    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, count, error } = await query;

    if (error) {
      throw ApiError.internal(error.message);
    }

    return Response.json(
      successResponse(data, {
        total: count ?? 0,
        page,
        limit,
        totalPages: Math.ceil((count ?? 0) / limit),
      })
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    // Validate input using rentalFormSchema (includes tags/features)
    const { rentalFormSchema } = await import("@/lib/schemas/rental.schema");
    const validationResult = rentalFormSchema.safeParse(body);
    if (!validationResult.success) {
      throw ApiError.badRequest("Validation failed", {
        validation: validationResult.error.errors.map((e) => e.message),
      });
    }

    const formData = validationResult.data;

    // Extract tags and features (not in DB schema)
    const { tags, features, ...rentalData } = formData;

    // Check for duplicate slug
    const { data: existingRental } = await supabase
      .from("rental_items")
      .select("id")
      .eq("slug", rentalData.slug)
      .is("deleted_at", null)
      .single();

    if (existingRental) {
      throw ApiError.conflict("A rental item with this slug already exists");
    }

    // Insert rental (database schema doesn't include tags/features directly)
    const { data: rental, error: rentalError } = await supabase
      .from("rental_items")
      .insert(rentalData)
      .select()
      .single();

    if (rentalError) {
      throw ApiError.internal(rentalError.message);
    }

    // TODO: Handle tags insertion into rental_item_tags junction table
    // For now, we'll log them so you can see they're being received
    if (tags && tags.length > 0) {
      console.log("Tags to insert:", tags, "for rental:", rental.id);
      // Future: Insert into rental_item_tags junction table
    }

    // TODO: Handle features (store in specs or separate column)
    if (features && features.length > 0) {
      console.log("Features to handle:", features, "for rental:", rental.id);
      // Future: Store in specs object or add features column
    }

    return Response.json(successResponse(rental), { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
