import { z } from 'zod';

export const createPortfolioSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  slug: z.string().min(1, 'Slug is required').max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens'),
  event_type_id: z.string().uuid().nullable().optional(),
  venue: z.string().max(255).nullable().optional(),
  event_date: z.string().nullable().optional(), // ISO date string
  thumbnail_url: z.string().url().nullable().optional(),
  gallery: z.array(z.string().url()).default([]),
  description: z.string().min(1, 'Description is required'),
  goals: z.string().nullable().optional(),
  technical_highlights: z.array(z.string()).default([]),
  attendee_count: z.number().int().nullable().optional(),
  client_quote_text: z.string().nullable().optional(),
  client_quote_author: z.string().max(255).nullable().optional(),
  client_quote_role: z.string().max(255).nullable().optional(),
  is_featured: z.boolean().default(false),
  is_active: z.boolean().default(true),
  display_order: z.number().int().min(0).default(0),
  seo_title: z.string().max(255).nullable().optional(),
  seo_description: z.string().nullable().optional(),
});

export const updatePortfolioSchema = createPortfolioSchema.partial().extend({
  id: z.string().uuid(),
});

export type CreatePortfolioInput = z.infer<typeof createPortfolioSchema>;
export type UpdatePortfolioInput = z.infer<typeof updatePortfolioSchema>;