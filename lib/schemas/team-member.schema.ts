import { z } from 'zod';

export const createTeamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  role: z.string().min(1, 'Role is required').max(255),
  bio: z.string().nullable().optional(),
  image_url: z.string().url().nullable().optional(),
  email: z.string().email().nullable().optional(),
  linkedin_url: z.string().url().nullable().optional(),
  display_order: z.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
});

export const updateTeamMemberSchema = createTeamMemberSchema.partial().extend({
  id: z.string().uuid(),
});

export type CreateTeamMemberInput = z.infer<typeof createTeamMemberSchema>;
export type UpdateTeamMemberInput = z.infer<typeof updateTeamMemberSchema>;