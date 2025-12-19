// lib/schemas/service.schema.ts
// Zod validation schemas for Services
import { z } from "zod";

// Use case schema
export const serviceUseCaseSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
  image_url: z.string().url().nullable().optional(),
  display_order: z.number().int().min(0).nullable().optional().default(0),
});

// Process step schema
export const serviceProcessStepSchema = z.object({
  id: z.string().uuid().optional(),
  step_number: z.number().int().min(1, "Step number must be at least 1"),
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});

// Package schema
export const servicePackageSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Name is required").max(255),
  description: z.string().nullable().optional(),
  starting_price: z.string().max(50).nullable().optional(),
  features: z.array(z.string()).nullable().optional().default([]),
  display_order: z.number().int().min(0).nullable().optional().default(0),
});

// Main service creation schema
export const createServiceSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(255)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase with hyphens only"
    ),
  tagline: z.string().max(500).nullable().optional(),
  description: z.string().min(1, "Description is required"),
  icon: z.string().min(1, "Icon is required").max(50).default("calendar"),
  thumbnail_url: z.string().url().nullable().optional(),
  what_we_do: z.array(z.string()).nullable().optional().default([]),
  gallery: z.array(z.string().url()).nullable().optional().default([]),
  seo_title: z.string().max(255).nullable().optional(),
  seo_description: z.string().nullable().optional(),
  display_order: z.number().int().min(0).nullable().optional().default(0),
  is_active: z.boolean().nullable().optional().default(true),
  // Nested data (optional for creation)
  use_cases: z.array(serviceUseCaseSchema).optional(),
  process_steps: z.array(serviceProcessStepSchema).optional(),
  packages: z.array(servicePackageSchema).optional(),
});

// Update schema (all fields optional except id matches are kept)
export const updateServiceSchema = createServiceSchema.partial().extend({
  id: z.string().uuid(),
});

// Type exports
export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
export type ServiceUseCase = z.infer<typeof serviceUseCaseSchema>;
export type ServiceProcessStep = z.infer<typeof serviceProcessStepSchema>;
export type ServicePackage = z.infer<typeof servicePackageSchema>;
