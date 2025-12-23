// app/api/public/quotes/route.ts
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  ApiError,
  handleApiError,
  successResponse,
} from "@/lib/utils/api-error";
import { createQuoteSchema } from "@/lib/schemas/quote.schema";
import { Database } from "@/lib/supabase/database.types";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    // Validate input
    const validation = createQuoteSchema.safeParse(body);
    if (!validation.success) {
      throw ApiError.badRequest(
        "Validation failed",
        validation.error.flatten().fieldErrors
      );
    }

    const { items, ...quoteData } = validation.data;

    // Prepare the quote request data
    const insertData = {
      name: quoteData.name,
      email: quoteData.email,
      phone: quoteData.phone || null,
      company: quoteData.company || null,
      event_type_id: quoteData.event_type_id || null,
      event_date: quoteData.event_date || null,
      event_location: quoteData.event_location || null,
      guest_count: quoteData.guest_count || null,
      items: items, // JSONB array
      message: quoteData.message || null,
      status: "new" as Database["public"]["Enums"]["quote_status"],
    };

    const { data, error } = await supabase
      .from("quote_requests")
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error("Error creating quote request:", error);
      throw ApiError.internal(error.message);
    }

    return Response.json(successResponse(data), { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
