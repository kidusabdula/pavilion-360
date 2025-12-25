// app/api/cms/media/upload/route.ts
// Media upload API for Supabase Storage

import { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  ApiError,
  handleApiError,
  successResponse,
} from "@/lib/utils/api-error";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    // Use admin client to bypass RLS policies for media uploads
    const supabase = createAdminClient();

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      throw ApiError.badRequest("No file provided");
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      throw ApiError.badRequest(
        "Invalid file type. Allowed: JPEG, PNG, WEBP, GIF"
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      throw ApiError.badRequest("File too large. Maximum size is 10MB");
    }

    // Generate unique filename
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `${uuidv4()}.${ext}`;
    const storagePath = `${folder}/${filename}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("public-bucket")
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      throw ApiError.internal(`Upload failed: ${uploadError.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("public-bucket")
      .getPublicUrl(storagePath);

    // Save to media table
    const { data: mediaRecord, error: dbError } = await supabase
      .from("media")
      .insert({
        filename,
        original_name: file.name,
        url: urlData.publicUrl,
        storage_path: storagePath,
        size_bytes: file.size,
        mime_type: file.type,
        folder,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database insert error:", dbError);
      // Still return success with URL even if DB record fails
    }

    return Response.json(
      successResponse({
        id: mediaRecord?.id || null,
        url: urlData.publicUrl,
        filename,
        size: file.size,
        type: file.type,
      }),
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
