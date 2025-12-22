import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  ApiError,
  handleApiError,
  successResponse,
} from "@/lib/utils/api-error";
import {
  INQUIRY_STATUSES,
  type InquiryStatus,
} from "@/lib/schemas/inquiry.schema";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = (page - 1) * limit;
    const search = searchParams.get("search") || "";
    const statusParam = searchParams.get("status");

    let query = supabase
      .from("inquiries")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%`
      );
    }

    // Validate status is a valid inquiry status before using it
    if (
      statusParam &&
      INQUIRY_STATUSES.includes(statusParam as InquiryStatus)
    ) {
      query = query.eq("status", statusParam as InquiryStatus);
    }

    const { data, error, count } = await query;

    if (error) throw ApiError.internal(error.message);
    return Response.json(
      successResponse(data, {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      })
    );
  } catch (error) {
    return handleApiError(error);
  }
}
