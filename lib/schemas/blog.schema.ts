import { z } from 'zod';

export const createBlogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  slug: z.string().min(1).max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().nullable().optional(),
  content: z.any().default({}), // TipTap JSON - use z.any()
  thumbnail_url: z.string().url().nullable().optional(),
  category_id: z.string().uuid().nullable().optional(),
  author_name: z.string().max(255).default('Pavilion360 Team'),
  read_time_minutes: z.number().int().positive().nullable().optional(),
  published_at: z.string().nullable().optional(),
  is_published: z.boolean().default(false),
  is_featured: z.boolean().default(false),
  seo_title: z.string().max(255).nullable().optional(),
  seo_description: z.string().nullable().optional(),
  seo_image_url: z.string().url().nullable().optional(),
});

export const updateBlogSchema = createBlogSchema.partial().extend({
  id: z.string().uuid(),
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;