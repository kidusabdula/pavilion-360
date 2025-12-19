// lib/schemas/rental.schema.ts
// Zod validation schemas for Rentals
import { z } from 'zod';

// Rental category schema
export const rentalCategorySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'Name is required').max(255),
  slug: z.string().min(1, 'Slug is required').max(255),
  description: z.string().nullable().optional(),
  display_order: z.number().int().min(0).default(0),
});

// Main rental item schema
export const createRentalSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
  category_id: z.string().uuid('Valid category ID is required'),
  description: z.string().min(1, 'Description is required'),
  short_description: z.string().max(500).nullable().optional(),
  thumbnail_url: z.string().url().nullable().optional(),
  images: z.array(z.string().url()).default([]),
  daily_rate: z.string().max(50).nullable().optional(),
  specs: z.record(z.string(), z.string()).default({}),
  tags: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  is_featured: z.boolean().default(false),
  is_active: z.boolean().default(true),
  display_order: z.number().int().min(0).default(0),
});

// Update schema
export const updateRentalSchema = createRentalSchema.partial().extend({
  id: z.string().uuid(),
});

// Type exports
export type CreateRentalInput = z.infer<typeof createRentalSchema>;
export type UpdateRentalInput = z.infer<typeof updateRentalSchema>;
export type RentalCategory = z.infer<typeof rentalCategorySchema>;