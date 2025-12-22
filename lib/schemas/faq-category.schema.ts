import { z } from 'zod';

export const createFaqCategorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  slug: z.string().min(1, 'Slug is required').max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens'),
  display_order: z.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
});

export const updateFaqCategorySchema = createFaqCategorySchema.partial().extend({
  id: z.string().uuid(),
});

export type CreateFaqCategoryInput = z.infer<typeof createFaqCategorySchema>;
export type UpdateFaqCategoryInput = z.infer<typeof updateFaqCategorySchema>;