-- Migration: Add Rental Catalog Fields
-- Date: 2025-12-25
-- Description: Adds new fields from client catalog: collection, color, finish, quantity

-- ================================================
-- PHASE 1: CLEANUP - Remove existing rental data
-- ================================================

-- First, remove junction table entries
DELETE FROM public.rental_item_event_types;
DELETE FROM public.rental_item_tags;

-- Then remove rental items
DELETE FROM public.rental_items;

-- Finally remove categories (they'll be recreated)
DELETE FROM public.rental_categories;

-- ================================================
-- PHASE 2: ADD NEW COLUMNS to rental_items
-- ================================================

-- Add collection field (e.g., "Avenue", "Hayworth", "Phoenix")
ALTER TABLE public.rental_items 
  ADD COLUMN IF NOT EXISTS collection VARCHAR(100) NULL;

-- Add color field (e.g., "Black", "White", "Gold")
ALTER TABLE public.rental_items 
  ADD COLUMN IF NOT EXISTS color VARCHAR(100) NULL;

-- Add finish field (e.g., "Chrome", "Stainless", "Mahogany")
ALTER TABLE public.rental_items 
  ADD COLUMN IF NOT EXISTS finish VARCHAR(100) NULL;

-- Add quantity/stock field
ALTER TABLE public.rental_items 
  ADD COLUMN IF NOT EXISTS quantity INTEGER NULL DEFAULT 0;

-- ================================================
-- PHASE 3: ADD INDEXES for new fields
-- ================================================

-- Index on collection for filtering
CREATE INDEX IF NOT EXISTS idx_rental_items_collection 
  ON public.rental_items (collection) 
  WHERE deleted_at IS NULL;

-- Index on color for filtering
CREATE INDEX IF NOT EXISTS idx_rental_items_color 
  ON public.rental_items (color) 
  WHERE deleted_at IS NULL;

-- Index on finish for filtering  
CREATE INDEX IF NOT EXISTS idx_rental_items_finish 
  ON public.rental_items (finish) 
  WHERE deleted_at IS NULL;

-- ================================================
-- PHASE 4: ENSURE EVENT TYPES EXIST
-- ================================================

-- Insert event types if they don't exist (from catalog)
INSERT INTO public.event_types (name, slug, description, display_order, is_active)
VALUES 
  ('Corporate', 'corporate', 'Corporate events and business meetings', 1, true),
  ('Gala', 'gala', 'Formal gala events and celebrations', 2, true),
  ('Festival', 'festival', 'Music festivals and outdoor celebrations', 3, true),
  ('Wedding', 'wedding', 'Wedding ceremonies and receptions', 4, true),
  ('Concert', 'concert', 'Live music concerts and performances', 5, true),
  ('Social', 'social', 'Social gatherings and private parties', 6, true),
  ('Outdoor', 'outdoor', 'Outdoor events and garden parties', 7, true)
ON CONFLICT (slug) DO NOTHING;

-- ================================================
-- PHASE 5: CREATE RENTAL CATEGORIES
-- ================================================

INSERT INTO public.rental_categories (name, slug, description, display_order, is_active)
VALUES
  ('Audio', 'audio', 'Professional audio equipment including speakers, mixers, and microphones', 1, true),
  ('Barricades', 'barricades', 'Crowd control barriers, stanchions, and fencing solutions', 2, true),
  ('Bars & Shelves', 'bars-shelves', 'Portable bars, display shelves, and room dividers', 3, true),
  ('Decks & Staging', 'decks-staging', 'Stage platforms, risers, mobile stages, and staging accessories', 4, true),
  ('Effects', 'effects', 'Special effects including fog, confetti, cold sparks, and CO2', 5, true),
  ('Food & Beverage', 'food-beverage', 'Refrigeration units, ice tubs, and food service equipment', 6, true),
  ('Lighting', 'lighting', 'Professional lighting including LED, intelligent, and decorative fixtures', 7, true),
  ('Miscellaneous', 'miscellaneous', 'Photo booths, DJ equipment, heating, and entertainment items', 8, true),
  ('Seating', 'seating', 'Chairs, stools, and benches for all event styles', 9, true),
  ('Trussing', 'trussing', 'Aluminum and steel truss systems for lighting and staging', 10, true),
  ('Video', 'video', 'LED walls, projectors, screens, and display monitors', 11, true);

-- Verify the migration
SELECT 'Migration complete!' as status;
SELECT COUNT(*) as category_count FROM public.rental_categories;
SELECT COUNT(*) as event_type_count FROM public.event_types;
