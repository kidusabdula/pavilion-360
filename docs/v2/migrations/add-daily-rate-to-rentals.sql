-- ============================================================================
-- PAVILION360 V2.0 - DATABASE MIGRATION
-- Fix rental_items table schema mismatches
-- ============================================================================
-- Execute this in Supabase SQL Editor
-- Date: December 25, 2024
-- ============================================================================

-- 1. Add daily_rate column to rental_items table
ALTER TABLE rental_items 
ADD COLUMN IF NOT EXISTS daily_rate VARCHAR(50);

-- 2. Add description column (if details column exists, data should be migrated manually)
ALTER TABLE rental_items 
ADD COLUMN IF NOT EXISTS description TEXT;

-- 3. Fix specs default from array to object (for key-value pairs)
ALTER TABLE rental_items 
ALTER COLUMN specs SET DEFAULT '{}'::jsonb;

-- Add comments to document the columns
COMMENT ON COLUMN rental_items.daily_rate IS 'Daily rental rate (stored as string for flexibility, e.g., "$50", "Call for pricing")';
COMMENT ON COLUMN rental_items.description IS 'Full description/details of the rental item';
COMMENT ON COLUMN rental_items.specs IS 'Specifications as key-value pairs (JSONB object)';

-- ============================================================================
-- DONE
-- ============================================================================
-- After running this migration:
-- 1. Verify the columns were added in Supabase Dashboard
-- 2. Regenerate TypeScript types by running: pnpm supabase:types
-- 3. The TypeScript errors in the edit page should be resolved
-- ============================================================================
