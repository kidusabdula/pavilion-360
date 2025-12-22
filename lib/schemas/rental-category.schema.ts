import { z } from "zod";

export const createRentalCategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  description: z.string().nullable().optional(),
  thumbnail_url: z.string().url().nullable().optional(),
  display_order: z.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
});

export const updateRentalCategorySchema = createRentalCategorySchema
  .partial()
  .extend({
    id: z.string().uuid(),
  });

export type CreateRentalCategoryInput = z.infer<
  typeof createRentalCategorySchema
>;
export type UpdateRentalCategoryInput = z.infer<
  typeof updateRentalCategorySchema
>;
