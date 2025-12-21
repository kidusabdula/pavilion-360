import { z } from 'zod';

export const createVenueSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  slug: z.string().min(1, 'Slug is required').max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens'),
  location: z.string().max(255).nullable().optional(),
  city: z.string().max(100).nullable().optional(),
  thumbnail_url: z.string().url().nullable().optional(),
  description: z.string().nullable().optional(),
  capacity_min: z.number().int().positive().nullable().optional(),
  capacity_max: z.number().int().positive().nullable().optional(),
  is_managed: z.boolean().default(false),
  external_link: z.string().url().nullable().optional(),
  is_active: z.boolean().default(true),
  display_order: z.number().int().min(0).default(0),
  seo_title: z.string().max(255).nullable().optional(),
  seo_description: z.string().nullable().optional(),
});

export const updateVenueSchema = createVenueSchema.partial().extend({
  id: z.string().uuid(),
});

export type CreateVenueInput = z.infer<typeof createVenueSchema>;
export type UpdateVenueInput = z.infer<typeof updateVenueSchema>;