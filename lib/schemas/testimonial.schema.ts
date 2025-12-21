import { z } from 'zod';

export const createTestimonialSchema = z.object({
  quote: z.string().min(1, 'Quote is required'),
  author_name: z.string().min(1, 'Author name is required').max(255),
  author_role: z.string().max(255).nullable().optional(),
  company: z.string().max(255).nullable().optional(),
  author_image_url: z.string().url().nullable().optional(),
  portfolio_project_id: z.string().uuid().nullable().optional(),
  is_featured: z.boolean().default(false),
  is_active: z.boolean().default(true),
  display_order: z.number().int().min(0).default(0),
});

export const updateTestimonialSchema = createTestimonialSchema.partial().extend({
  id: z.string().uuid(),
});

export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;