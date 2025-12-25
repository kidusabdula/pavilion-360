// lib/schemas/rental.schema.ts
// Zod validation schemas for Rentals
import { z } from "zod";

// Rental category schema
export const rentalCategorySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Name is required").max(255),
  slug: z.string().min(1, "Slug is required").max(255),
  description: z.string().nullable().optional(),
  thumbnail_url: z.string().url().nullable().optional(),
  display_order: z.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
});

// Main rental item schema - matches database structure
export const createRentalSchema = z.object({
  // Required fields
  name: z.string().min(1, "Name is required").max(255),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(255)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase with hyphens only"
    ),
  category_id: z.string().uuid("Valid category ID is required"),
  description: z.string().min(1, "Description is required"),

  // Optional fields
  sku: z.string().max(50).nullable().optional(),
  subcategory: z.string().max(100).nullable().optional(),
  short_description: z.string().max(500).nullable().optional(),
  thumbnail_url: z.string().url().nullable().optional(),
  images: z.array(z.string().url()).default([]),
  daily_rate: z.string().max(50).nullable().optional(),

  // New catalog fields (from client)
  collection: z.string().max(100).nullable().optional(), // e.g., "Avenue", "Hayworth"
  color: z.string().max(100).nullable().optional(), // e.g., "Black", "White", "Gold"
  finish: z.string().max(100).nullable().optional(), // e.g., "Chrome", "Stainless", "Mahogany"
  quantity: z.number().int().min(0).nullable().optional().default(0), // Stock quantity

  // JSONB field - stored as object in DB
  specs: z.record(z.string(), z.string()).default({}),

  // SEO fields
  seo_title: z.string().max(255).nullable().optional(),
  seo_description: z.string().nullable().optional(),

  // Settings
  is_popular: z.boolean().default(false), // DB column name
  is_active: z.boolean().default(true),
  display_order: z.number().int().min(0).default(0),
});

// Extended schema for form (includes tags, features, and event_types for UI)
export const rentalFormSchema = createRentalSchema.extend({
  tags: z.array(z.string()).default([]), // Handled separately via junction table
  features: z.array(z.string()).default([]), // Can be stored in specs or separate column
  event_type_ids: z.array(z.string().uuid()).default([]), // Event types via junction table
});

// Update schema
export const updateRentalSchema = createRentalSchema.partial().extend({
  id: z.string().uuid(),
});

// Type exports
export type CreateRentalInput = z.infer<typeof createRentalSchema>;
export type RentalFormInput = z.infer<typeof rentalFormSchema>;
export type UpdateRentalInput = z.infer<typeof updateRentalSchema>;
export type RentalCategory = z.infer<typeof rentalCategorySchema>;
export type CreateRentalCategoryInput = z.infer<typeof rentalCategorySchema>;
export type UpdateRentalCategoryInput = z.infer<typeof rentalCategorySchema> & {
  id: string;
};
