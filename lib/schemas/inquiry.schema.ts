import { z } from 'zod';

export const INQUIRY_STATUSES = ['new', 'reviewed', 'contacted', 'closed', 'spam'] as const;
export type InquiryStatus = typeof INQUIRY_STATUSES[number];

// For public contact form submission
export const createInquirySchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  email: z.string().email('Valid email required').max(255),
  phone: z.string().max(50).nullable().optional(),
  company: z.string().max(255).nullable().optional(),
  message: z.string().min(1, 'Message is required'),
  source: z.string().max(100).default('contact_form'),
});

// For admin status/notes update
export const updateInquirySchema = z.object({
  id: z.string().uuid(),
  status: z.enum(INQUIRY_STATUSES).optional(),
  admin_notes: z.string().nullable().optional(),
});

export type CreateInquiryInput = z.infer<typeof createInquirySchema>;
export type UpdateInquiryInput = z.infer<typeof updateInquirySchema>;