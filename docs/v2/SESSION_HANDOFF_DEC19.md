# Pavilion360 V2.0 - CMS Development Session Summary

## Date: December 19, 2024
## Context: Handoff document for continuing CMS module development

---

## 🎯 PROJECT OVERVIEW

Pavilion360 V2.0 is a data-driven CMS overhaul for an event production company. We're migrating from static data files (`lib/data/*.ts`) to a dynamic CMS backed by **Supabase**.

**Tech Stack:**
- Next.js 16.1 (App Router)
- Supabase (Database + Storage + Auth)
- TanStack Query (server state)
- React Hook Form + Zod (forms)
- Shadcn/ui + Tailwind CSS (styling)

---

## ✅ COMPLETED WORK

### 1. Services CMS Module (FULLY COMPLETE)

**Files Created/Modified:**

```
app/api/cms/services/
├── route.ts                    # GET (list), POST (create)
└── [id]/route.ts              # GET, PUT, DELETE

app/api/public/services/
├── route.ts                    # GET all active services
└── [slug]/route.ts            # GET by slug + increment views

app/(cms)/cms/services/
├── page.tsx                    # List view with DataTable
├── new/page.tsx               # Create form (CENTERED)
└── [id]/
    ├── page.tsx               # Detail view
    └── edit/page.tsx          # Edit form (CENTERED)

components/cms/modules/services/
└── service-form.tsx           # Reusable form with ImageUpload

lib/schemas/
└── service.schema.ts          # Zod validation schemas

hooks/cms/
└── use-services.ts            # TanStack Query hooks
```

**Key Modifications:**
- Forms are now **centered** with `flex justify-center` wrapper and `max-w-4xl` width
- `is_active` boolean uses `?? true` to handle null values
- ImageUpload component integrated for thumbnail

---

### 2. Image Upload System (COMPLETE)

**Created Components:**

```typescript
// components/cms/forms/image-upload.tsx
// Supports both file upload and URL input
// Uses Supabase Storage with public-bucket

// components/cms/forms/index.ts
export { ImageUpload } from "./image-upload";
```

**API Endpoint:**
```typescript
// app/api/cms/media/upload/route.ts
// - Validates file type (JPEG, PNG, WEBP, GIF)
// - Max 10MB file size
// - Generates UUID filename
// - Uploads to Supabase Storage public-bucket/uploads/
// - Optionally tracks in media table
```

**Dependencies Added:**
- `uuid` (for unique filenames)
- `@types/uuid` (TypeScript types)
- `@radix-ui/react-dialog` (shadcn dialog)
- `@radix-ui/react-tabs` (shadcn tabs)

---

### 3. Image Migration Script (COMPLETE)

**Script:** `scripts/upload-images-to-supabase.ts`

**Purpose:** Uploads all 100+ images from `/public` to Supabase Storage and generates SQL update statements.

**Usage:**
```bash
pnpm upload-images
```

**Outputs:**
- `docs/v2/image-url-mapping.json` - Maps old → new URLs
- `docs/v2/update-image-urls.sql` - SQL to update all tables

**Tables Updated:**
- `services` (thumbnail_url, gallery)
- `service_use_cases` (image_url)
- `rental_items` (thumbnail_url, images)
- `portfolio_projects` (thumbnail_url, gallery)
- `venues` (thumbnail_url)
- `rental_categories` (thumbnail_url)

---

### 4. Database Seeding (COMPLETE)

**Seed Files:**
1. `docs/v2/seed-services.sql` - 9 services + use cases + process steps + packages
2. `docs/v2/seed-all-data.sql` - Rentals, Portfolio, FAQs, Testimonials, Venues
3. `docs/v2/update-image-urls.sql` - Updates all image paths to Supabase Storage

**UUID Convention (valid hex format):**
- Rentals: `10010000-0000-0000-0000-000000000XXX`
- Portfolio: `20010000-0000-0000-0000-000000000XXX`
- FAQs: `30010000-0000-0000-0000-000000000XXX`
- Testimonials: `40010000-0000-0000-0000-000000000XXX`
- Venues: `50010000-0000-0000-0000-000000000XXX`
- Services: Standard UUIDs like `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

**Seeded Data Counts:**
| Table | Count |
|-------|-------|
| services | 9 |
| service_use_cases | 15+ |
| service_process_steps | 36+ |
| service_packages | 2 |
| rental_items | 55+ |
| portfolio_projects | 5 |
| faqs | 12 |
| testimonials | 4 |
| venues | 4 |

---

## 📐 IMPLEMENTATION PATTERNS

### API Route Pattern

```typescript
// app/api/cms/[module]/route.ts
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ApiError, handleApiError, successResponse } from "@/lib/utils/api-error";
import { createModuleSchema } from "@/lib/schemas/module.schema";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    
    // Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = (page - 1) * limit;
    
    // Query with pagination
    let query = supabase
      .from("table_name")
      .select("*", { count: "exact" })
      .is("deleted_at", null)
      .order("display_order")
      .range(offset, offset + limit - 1);
    
    const { data, error, count } = await query;
    
    if (error) throw ApiError.internal(error.message);
    
    return Response.json(successResponse(data, {
      page, limit, total: count || 0, totalPages: Math.ceil((count || 0) / limit)
    }));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    
    // Validate
    const validation = createModuleSchema.safeParse(body);
    if (!validation.success) {
      throw ApiError.validation(validation.error.flatten().fieldErrors);
    }
    
    // Insert
    const { data, error } = await supabase
      .from("table_name")
      .insert(validation.data)
      .select()
      .single();
    
    if (error) throw ApiError.internal(error.message);
    
    return Response.json(successResponse(data), { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
```

### TanStack Query Hook Pattern

```typescript
// hooks/cms/use-module.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = "module-name";

export function useModuleList(params?: { page?: number; search?: string }) {
  return useQuery({
    queryKey: [QUERY_KEY, "list", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set("page", String(params.page));
      if (params?.search) searchParams.set("search", params.search);
      
      const res = await fetch(`/api/cms/module?${searchParams}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });
}

export function useCreateModule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateModuleInput) => {
      const res = await fetch("/api/cms/module", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error?.message || "Failed to create");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}
```

### Form Component Pattern

```typescript
// components/cms/modules/[module]/module-form.tsx
"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUpload } from "@/components/cms/forms";

export function ModuleForm({ initialData, onSubmit, isSubmitting, isEdit }: ModuleFormProps) {
  const form = useForm({
    resolver: zodResolver(createModuleSchema),
    defaultValues: {
      name: initialData?.name || "",
      is_active: initialData?.is_active ?? true, // Use ?? for null handling
      // ... other fields
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-4xl space-y-8">
      {/* Form sections */}
      
      {/* Image Upload Example */}
      <ImageUpload
        label="Thumbnail Image"
        value={form.watch("thumbnail_url") || null}
        onChange={(url) => form.setValue("thumbnail_url", url || "")}
        folder="module-name"
        aspectRatio="video"
      />
      
      {/* Submit */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEdit ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
```

### Page Layout Pattern (Centered Form)

```typescript
// app/(cms)/cms/module/new/page.tsx
export default function NewModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="New Item" breadcrumbs={[...]} />
      
      {/* IMPORTANT: Wrap form in centered container */}
      <div className="flex justify-center">
        <ModuleForm onSubmit={handleSubmit} isSubmitting={mutation.isPending} />
      </div>
    </div>
  );
}
```

---

## 🔜 NEXT STEPS: Rentals CMS Module

**Priority:** Implement Rentals CMS Module following the Services pattern.

**Tables to Use:**
- `rental_categories` (already seeded with 15 categories)
- `rental_items` (55+ items seeded)

**Required Files:**
```
app/api/cms/rentals/
├── route.ts                    # GET (list), POST (create)
├── [id]/route.ts              # GET, PUT, DELETE
└── categories/
    └── route.ts               # GET categories for dropdown

app/(cms)/cms/rentals/
├── page.tsx                    # List with category filters
├── new/page.tsx               # Create form
└── [id]/
    ├── page.tsx               # Detail view
    └── edit/page.tsx          # Edit form

lib/schemas/
└── rental.schema.ts           # Zod schemas

hooks/cms/
└── use-rentals.ts             # TanStack Query hooks

components/cms/modules/rentals/
└── rental-form.tsx            # Form component
```

**Special Considerations:**
- Category dropdown (fetch from rental_categories)
- Tags array field
- Specs as JSONB (key-value pairs)
- Event types relationship (many-to-many via junction table)

---

## 📁 KEY FILE LOCATIONS

```
c:\Users\kidus\Documents\Projects\pavilion360\
├── app/
│   ├── (cms)/cms/             # CMS pages
│   └── api/cms/               # CMS API routes
├── components/
│   └── cms/
│       ├── forms/             # ImageUpload, etc.
│       ├── modules/           # Per-module components
│       └── shared/            # PageHeader, DataTable, etc.
├── hooks/cms/                 # TanStack Query hooks
├── lib/
│   ├── schemas/              # Zod validation
│   ├── supabase/             # DB client + types
│   └── utils/                # api-error, slug, cn
├── docs/v2/                  # Schema & seed files
└── scripts/                  # Utility scripts
```

---

## 🐛 KNOWN ISSUES / NOTES

1. **Boolean null handling:** Use `?? true` for `is_active` fields to avoid type errors
2. **Form centering:** Wrap `<ModuleForm>` in `<div className="flex justify-center">`
3. **Form width:** Use `w-full max-w-4xl` on form element
4. **UUID format:** Must be valid hex (0-9, a-f only), no letters like 'r', 'p', etc.
5. **Image paths:** All now point to Supabase Storage after running update-image-urls.sql

---

## 📋 VERIFICATION COMMANDS

```bash
# Run dev server
pnpm dev

# Upload images to Supabase (if needed)
pnpm upload-images

# Generate Supabase types
pnpm supabase:types
```

**Test Service CMS:** http://localhost:3000/cms/services

---

*End of handoff document. Ready to continue with Rentals CMS Module.*
