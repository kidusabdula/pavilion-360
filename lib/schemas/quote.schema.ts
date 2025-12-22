import { z } from 'zod';

export const QUOTE_STATUSES = ['new', 'reviewed', 'quoted', 'accepted', 'declined', 'expired'] as const;
export type QuoteStatus = typeof QUOTE_STATUSES[number];

// Item in the quote basket
export const quoteItemSchema = z.object({
  rental_item_id: z.string().uuid(),
  quantity: z.number().int().positive(),
  name: z.string(),
  thumbnail: z.string().nullable().optional(),
});

export type QuoteItem = z.infer<typeof quoteItemSchema>;

// For public quote request submission
export const createQuoteSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  email: z.string().email('Valid email required').max(255),
  phone: z.string().max(50).nullable().optional(),
  company: z.string().max(255).nullable().optional(),
  event_type_id: z.string().uuid().nullable().optional(),
  event_date: z.string().nullable().optional(), // ISO date string
  event_location: z.string().max(255).nullable().optional(),
  guest_count: z.number().int().positive().nullable().optional(),
  items: z.array(quoteItemSchema).min(1, 'At least one item is required'),
  message: z.string().nullable().optional(),
});

// For admin status/notes/estimate update
export const updateQuoteSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(QUOTE_STATUSES).optional(),
  total_estimate: z.number().positive().nullable().optional(),
  admin_notes: z.string().nullable().optional(),
});

export type CreateQuoteInput = z.infer<typeof createQuoteSchema>;
export type UpdateQuoteInput = z.infer<typeof updateQuoteSchema>;