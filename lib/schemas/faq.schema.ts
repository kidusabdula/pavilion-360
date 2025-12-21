import { z } from 'zod';

export const createFaqSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
  category_id: z.string().uuid('Category is required'),
  display_order: z.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
});

export const updateFaqSchema = createFaqSchema.partial().extend({
  id: z.string().uuid(),
});

export type CreateFaqInput = z.infer<typeof createFaqSchema>;
export type UpdateFaqInput = z.infer<typeof updateFaqSchema>;