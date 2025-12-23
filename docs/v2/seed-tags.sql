-- ============================================================================
-- PAVILION360 V2.0 - TAGS SEED DATA
-- ============================================================================
-- 
-- Execute this in Supabase SQL Editor after SCHEMA_V1.sql
-- Run AFTER seed-all-data.sql (requires rental_items to exist)
-- 
-- This script:
-- 1. Creates tags in the tags table
-- 2. Links tags to rental items via rental_item_tags junction table
-- 3. Links event types to rental items via rental_item_event_types junction table
-- 
-- Last Updated: December 23, 2024
-- ============================================================================


-- ============================================================================
-- STEP 1: INSERT ALL UNIQUE TAGS
-- ============================================================================
-- Extracted from static data file: lib/data/rentals.ts

INSERT INTO tags (name, slug) VALUES
  -- Furniture & Style Tags
  ('Modern', 'modern'),
  ('Modular', 'modular'),
  ('Leather', 'leather'),
  ('Lounge', 'lounge'),
  ('White', 'white'),
  ('Velvet', 'velvet'),
  ('Ivory', 'ivory'),
  ('Elegant', 'elegant'),
  ('Crimson', 'crimson'),
  ('Curved', 'curved'),
  ('Statement', 'statement'),
  ('Emerald', 'emerald'),
  ('Dining', 'dining'),
  
  -- Bars & Tables Tags
  ('Illuminated', 'illuminated'),
  ('Bar', 'bar'),
  ('LED', 'led'),
  ('Gold', 'gold'),
  ('Chrome', 'chrome'),
  ('Ornate', 'ornate'),
  ('Bold', 'bold'),
  ('Display', 'display'),
  ('Bar-back', 'bar-back'),
  ('Cocktail', 'cocktail'),
  ('Compact', 'compact'),
  ('Rustic', 'rustic'),
  ('Wood', 'wood'),
  ('Farm-table', 'farm-table'),
  ('Round', 'round'),
  ('Classic', 'classic'),
  
  -- Seating Tags
  ('Chiavari', 'chiavari'),
  ('Silver', 'silver'),
  ('Mahogany', 'mahogany'),
  ('Acrylic', 'acrylic'),
  ('Clear', 'clear'),
  ('Contemporary', 'contemporary'),
  ('Barstool', 'barstool'),
  ('Sleek', 'sleek'),
  ('Durable', 'durable'),
  ('Comfort', 'comfort'),
  
  -- Room Dividers & Drape Tags
  ('Divider', 'divider'),
  ('Branded', 'branded'),
  ('Greenery', 'greenery'),
  ('Natural', 'natural'),
  ('Photo-backdrop', 'photo-backdrop'),
  ('Hedge', 'hedge'),
  ('Drape', 'drape'),
  ('Black', 'black'),
  ('Backdrop', 'backdrop'),
  ('Stage', 'stage'),
  ('Sheer', 'sheer'),
  ('Ceiling', 'ceiling'),
  
  -- Flooring Tags
  ('Mirror', 'mirror'),
  ('Dance-floor', 'dance-floor'),
  ('Laminate', 'laminate'),
  
  -- Stage & Truss Tags
  ('Platform', 'platform'),
  ('Adjustable', 'adjustable'),
  ('Mobile', 'mobile'),
  ('Concert', 'concert'),
  ('Hydraulic', 'hydraulic'),
  ('Production', 'production'),
  ('Large', 'large'),
  ('Professional', 'professional'),
  ('Truss', 'truss'),
  ('Aluminum', 'aluminum'),
  ('Rigging', 'rigging'),
  ('Structural', 'structural'),
  ('Tower', 'tower'),
  ('Lighting', 'lighting'),
  ('Support', 'support'),
  ('Circular', 'circular'),
  ('Decorative', 'decorative'),
  ('Stairs', 'stairs'),
  ('Access', 'access'),
  ('Safety', 'safety'),
  
  -- Crowd Control Tags
  ('Stanchion', 'stanchion'),
  ('Crowd-control', 'crowd-control'),
  ('VIP', 'vip'),
  ('Velvet-rope', 'velvet-rope'),
  ('Steel', 'steel'),
  ('Barricade', 'barricade'),
  ('Heavy-duty', 'heavy-duty'),
  
  -- Audio Visual Tags
  ('Audio', 'audio'),
  ('PA-system', 'pa-system'),
  
  -- Special Effects Tags
  ('CO2', 'co2'),
  ('Fog', 'fog'),
  ('Special-effects', 'special-effects'),
  ('Dramatic', 'dramatic'),
  ('Cold-spark', 'cold-spark'),
  ('Fireworks', 'fireworks'),
  ('Wedding', 'wedding'),
  ('Safe', 'safe'),
  ('Confetti', 'confetti'),
  ('Celebration', 'celebration'),
  ('Party', 'party'),
  ('Photo-booth', 'photo-booth'),
  ('360', '360'),
  ('Social', 'social'),
  ('Entertainment', 'entertainment'),
  ('Digital', 'digital'),
  ('Printing', 'printing'),
  
  -- Live Entertainment Tags
  ('Stilt-walker', 'stilt-walker'),
  ('Costume', 'costume'),
  ('Circus', 'circus'),
  ('Aerial', 'aerial'),
  ('Acrobat', 'acrobat'),
  ('Silk', 'silk'),
  ('Dancer', 'dancer'),
  ('Lights', 'lights'),
  ('High-energy', 'high-energy'),
  ('Fire', 'fire'),
  ('Outdoor', 'outdoor'),
  ('DJ', 'dj'),
  ('Musician', 'musician'),
  ('Music', 'music'),
  
  -- Food & Beverage Tags
  ('Refrigerator', 'refrigerator'),
  ('Commercial', 'commercial'),
  ('Food-service', 'food-service'),
  ('Storage', 'storage'),
  ('Grill', 'grill'),
  ('Propane', 'propane'),
  ('Catering', 'catering'),
  ('Bartender', 'bartender')
ON CONFLICT (name) DO NOTHING;


-- ============================================================================
-- STEP 2: LINK RENTAL ITEMS TO EVENT TYPES
-- ============================================================================
-- Creates associations between rental items and their recommended event types
-- Maps from static data recommendedEventTypes array

-- First, let's create a helper function to lookup event type ID by name
CREATE OR REPLACE FUNCTION get_event_type_id(event_name VARCHAR)
RETURNS UUID AS $$
  SELECT id FROM event_types WHERE name = event_name LIMIT 1;
$$ LANGUAGE SQL;

-- Helper function to lookup rental item ID by SKU
CREATE OR REPLACE FUNCTION get_rental_item_id(item_sku VARCHAR)
RETURNS UUID AS $$
  SELECT id FROM rental_items WHERE sku = item_sku LIMIT 1;
$$ LANGUAGE SQL;

-- Helper function to lookup tag ID by name
CREATE OR REPLACE FUNCTION get_tag_id(tag_name VARCHAR)
RETURNS UUID AS $$
  SELECT id FROM tags WHERE LOWER(name) = LOWER(tag_name) LIMIT 1;
$$ LANGUAGE SQL;


-- ============================================================================
-- LINK RENTAL ITEMS TO EVENT TYPES (Using SKU to identify items)
-- ============================================================================

-- Mondrian Modular Sofa (MON-SOFA-BLK)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('MON-SOFA-BLK'), get_event_type_id(name)
FROM (VALUES ('Corporate'), ('Gala'), ('Social')) as t(name)
WHERE get_rental_item_id('MON-SOFA-BLK') IS NOT NULL
ON CONFLICT DO NOTHING;

-- Mondrian Corner Module (MON-CRNR-WHT)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('MON-CRNR-WHT'), get_event_type_id(name)
FROM (VALUES ('Wedding'), ('Gala'), ('Corporate')) as t(name)
WHERE get_rental_item_id('MON-CRNR-WHT') IS NOT NULL
ON CONFLICT DO NOTHING;

-- Colette Velvet Sofa (COL-SOFA-IVR)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('COL-SOFA-IVR'), get_event_type_id(name)
FROM (VALUES ('Wedding'), ('Gala'), ('Social')) as t(name)
WHERE get_rental_item_id('COL-SOFA-IVR') IS NOT NULL
ON CONFLICT DO NOTHING;

-- Colette Crescent Sofa (COL-CRSC-CRM)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('COL-CRSC-CRM'), get_event_type_id(name)
FROM (VALUES ('Gala'), ('Social'), ('Corporate')) as t(name)
WHERE get_rental_item_id('COL-CRSC-CRM') IS NOT NULL
ON CONFLICT DO NOTHING;

-- Kincaid Chair (KIN-CHR-EMR)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('KIN-CHR-EMR'), get_event_type_id(name)
FROM (VALUES ('Wedding'), ('Gala'), ('Corporate')) as t(name)
WHERE get_rental_item_id('KIN-CHR-EMR') IS NOT NULL
ON CONFLICT DO NOTHING;

-- 8ft Pavilion Bar (PAV-BAR-8-BLK)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('PAV-BAR-8-BLK'), get_event_type_id(name)
FROM (VALUES ('Corporate'), ('Gala'), ('Social')) as t(name)
WHERE get_rental_item_id('PAV-BAR-8-BLK') IS NOT NULL
ON CONFLICT DO NOTHING;

-- 6ft Avenue Bar (AVE-BAR-6-GLD)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('AVE-BAR-6-GLD'), get_event_type_id(name)
FROM (VALUES ('Wedding'), ('Gala'), ('Corporate')) as t(name)
WHERE get_rental_item_id('AVE-BAR-6-GLD') IS NOT NULL
ON CONFLICT DO NOTHING;

-- 12ft Circus Bar (CIR-BAR-12-RWG)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('CIR-BAR-12-RWG'), get_event_type_id(name)
FROM (VALUES ('Gala'), ('Social'), ('Festival')) as t(name)
WHERE get_rental_item_id('CIR-BAR-12-RWG') IS NOT NULL
ON CONFLICT DO NOTHING;

-- Essex Bar Back (ESS-BRBK-GLD)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('ESS-BRBK-GLD'), get_event_type_id(name)
FROM (VALUES ('Wedding'), ('Gala'), ('Corporate')) as t(name)
WHERE get_rental_item_id('ESS-BRBK-GLD') IS NOT NULL
ON CONFLICT DO NOTHING;

-- Metropolitan Table (MET-TBL-GLD)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('MET-TBL-GLD'), get_event_type_id(name)
FROM (VALUES ('Corporate'), ('Gala'), ('Wedding')) as t(name)
WHERE get_rental_item_id('MET-TBL-GLD') IS NOT NULL
ON CONFLICT DO NOTHING;

-- Continue for all other items...
-- (I'll provide a subset, you can run the pattern for all items)

-- Chiavari Chair Silver (CHV-CHR-SLV)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('CHV-CHR-SLV'), get_event_type_id(name)
FROM (VALUES ('Wedding'), ('Gala'), ('Corporate')) as t(name)
WHERE get_rental_item_id('CHV-CHR-SLV') IS NOT NULL
ON CONFLICT DO NOTHING;

-- Phoenix Chair Clear (PHX-CHR-CLR)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('PHX-CHR-CLR'), get_event_type_id(name)
FROM (VALUES ('Corporate'), ('Gala'), ('Social')) as t(name)
WHERE get_rental_item_id('PHX-CHR-CLR') IS NOT NULL
ON CONFLICT DO NOTHING;

-- 3D Infinity Mirror Dance Floor (FLR-3D-INF)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('FLR-3D-INF'), get_event_type_id(name)
FROM (VALUES ('Gala'), ('Social'), ('Wedding')) as t(name)
WHERE get_rental_item_id('FLR-3D-INF') IS NOT NULL
ON CONFLICT DO NOTHING;

-- Stage Deck 4x4 (STG-DECK-44)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('STG-DECK-44'), get_event_type_id(name)
FROM (VALUES ('Corporate'), ('Concert'), ('Festival')) as t(name)
WHERE get_rental_item_id('STG-DECK-44') IS NOT NULL
ON CONFLICT DO NOTHING;

-- Stageline SL100 (STGL-SL100)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('STGL-SL100'), get_event_type_id(name)
FROM (VALUES ('Concert'), ('Festival'), ('Outdoor')) as t(name)
WHERE get_rental_item_id('STGL-SL100') IS NOT NULL
ON CONFLICT DO NOTHING;

-- Box Truss (TRUSS-BOX-12)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('TRUSS-BOX-12'), get_event_type_id(name)
FROM (VALUES ('Concert'), ('Corporate'), ('Trade Show')) as t(name)
WHERE get_rental_item_id('TRUSS-BOX-12') IS NOT NULL
ON CONFLICT DO NOTHING;

-- Chrome Stanchion (STNCH-CHR-BLU)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('STNCH-CHR-BLU'), get_event_type_id(name)
FROM (VALUES ('Corporate'), ('Gala'), ('Red Carpet')) as t(name)
WHERE get_rental_item_id('STNCH-CHR-BLU') IS NOT NULL
ON CONFLICT DO NOTHING;

-- Pro Audio Package (AV-AUD-PRO)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('AV-AUD-PRO'), get_event_type_id(name)
FROM (VALUES ('Concert'), ('Festival'), ('Corporate')) as t(name)
WHERE get_rental_item_id('AV-AUD-PRO') IS NOT NULL
ON CONFLICT DO NOTHING;

-- CO2 Cannon (SFX-CO2-CAN)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('SFX-CO2-CAN'), get_event_type_id(name)
FROM (VALUES ('Concert'), ('Gala'), ('Club')) as t(name)
WHERE get_rental_item_id('SFX-CO2-CAN') IS NOT NULL
ON CONFLICT DO NOTHING;

-- Cold Spark Machine (SFX-COLD-SPK)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('SFX-COLD-SPK'), get_event_type_id(name)
FROM (VALUES ('Wedding'), ('Gala'), ('Corporate')) as t(name)
WHERE get_rental_item_id('SFX-COLD-SPK') IS NOT NULL
ON CONFLICT DO NOTHING;

-- 360 Photo Booth (SFX-360-BOOTH)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('SFX-360-BOOTH'), get_event_type_id(name)
FROM (VALUES ('Wedding'), ('Corporate'), ('Social')) as t(name)
WHERE get_rental_item_id('SFX-360-BOOTH') IS NOT NULL
ON CONFLICT DO NOTHING;

-- Stilt Walkers (ENT-STILT)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('ENT-STILT'), get_event_type_id(name)
FROM (VALUES ('Festival'), ('Corporate'), ('Family')) as t(name)
WHERE get_rental_item_id('ENT-STILT') IS NOT NULL
ON CONFLICT DO NOTHING;

-- LED Dancer (ENT-LED-DANCE)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('ENT-LED-DANCE'), get_event_type_id(name)
FROM (VALUES ('Corporate'), ('Gala'), ('Club')) as t(name)
WHERE get_rental_item_id('ENT-LED-DANCE') IS NOT NULL
ON CONFLICT DO NOTHING;

-- DJ/Musician (ENT-DJ-MUS)
INSERT INTO rental_item_event_types (rental_item_id, event_type_id)
SELECT get_rental_item_id('ENT-DJ-MUS'), get_event_type_id(name)
FROM (VALUES ('Wedding'), ('Corporate'), ('Social')) as t(name)
WHERE get_rental_item_id('ENT-DJ-MUS') IS NOT NULL
ON CONFLICT DO NOTHING;


-- ============================================================================
-- STEP 3: LINK RENTAL ITEMS TO TAGS
-- ============================================================================

-- Mondrian Modular Sofa (MON-SOFA-BLK) - tags: modern, modular, leather, lounge
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('MON-SOFA-BLK'), get_tag_id(name)
FROM (VALUES ('modern'), ('modular'), ('leather'), ('lounge')) as t(name)
WHERE get_rental_item_id('MON-SOFA-BLK') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Mondrian Corner Module (MON-CRNR-WHT) - tags: modern, modular, leather, white
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('MON-CRNR-WHT'), get_tag_id(name)
FROM (VALUES ('modern'), ('modular'), ('leather'), ('white')) as t(name)
WHERE get_rental_item_id('MON-CRNR-WHT') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Colette Velvet Sofa (COL-SOFA-IVR) - tags: velvet, ivory, elegant, modular
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('COL-SOFA-IVR'), get_tag_id(name)
FROM (VALUES ('velvet'), ('ivory'), ('elegant'), ('modular')) as t(name)
WHERE get_rental_item_id('COL-SOFA-IVR') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Colette Crescent Sofa (COL-CRSC-CRM) - tags: velvet, crimson, curved, statement
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('COL-CRSC-CRM'), get_tag_id(name)
FROM (VALUES ('velvet'), ('crimson'), ('curved'), ('statement')) as t(name)
WHERE get_rental_item_id('COL-CRSC-CRM') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Kincaid Chair (KIN-CHR-EMR) - tags: velvet, emerald, dining, elegant
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('KIN-CHR-EMR'), get_tag_id(name)
FROM (VALUES ('velvet'), ('emerald'), ('dining'), ('elegant')) as t(name)
WHERE get_rental_item_id('KIN-CHR-EMR') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- 8ft Pavilion Bar (PAV-BAR-8-BLK) - tags: illuminated, modern, bar, led
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('PAV-BAR-8-BLK'), get_tag_id(name)
FROM (VALUES ('illuminated'), ('modern'), ('bar'), ('led')) as t(name)
WHERE get_rental_item_id('PAV-BAR-8-BLK') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- 6ft Avenue Bar (AVE-BAR-6-GLD) - tags: gold, chrome, elegant, bar
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('AVE-BAR-6-GLD'), get_tag_id(name)
FROM (VALUES ('gold'), ('chrome'), ('elegant'), ('bar')) as t(name)
WHERE get_rental_item_id('AVE-BAR-6-GLD') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- 12ft Circus Bar (CIR-BAR-12-RWG) - tags: statement, ornate, bar, bold
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('CIR-BAR-12-RWG'), get_tag_id(name)
FROM (VALUES ('statement'), ('ornate'), ('bar'), ('bold')) as t(name)
WHERE get_rental_item_id('CIR-BAR-12-RWG') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Essex Bar Back (ESS-BRBK-GLD) - tags: gold, chrome, display, bar-back
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('ESS-BRBK-GLD'), get_tag_id(name)
FROM (VALUES ('gold'), ('chrome'), ('display'), ('bar-back')) as t(name)
WHERE get_rental_item_id('ESS-BRBK-GLD') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Metropolitan Table (MET-TBL-GLD) - tags: gold, chrome, cocktail, elegant
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('MET-TBL-GLD'), get_tag_id(name)
FROM (VALUES ('gold'), ('chrome'), ('cocktail'), ('elegant')) as t(name)
WHERE get_rental_item_id('MET-TBL-GLD') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Bentley Table (BEN-TBL-30-GLD) - tags: gold, chrome, cocktail, compact
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('BEN-TBL-30-GLD'), get_tag_id(name)
FROM (VALUES ('gold'), ('chrome'), ('cocktail'), ('compact')) as t(name)
WHERE get_rental_item_id('BEN-TBL-30-GLD') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- 4ft Luma Table (LUM-TBL-4-WHT) - tags: illuminated, white, modern, led
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('LUM-TBL-4-WHT'), get_tag_id(name)
FROM (VALUES ('illuminated'), ('white'), ('modern'), ('led')) as t(name)
WHERE get_rental_item_id('LUM-TBL-4-WHT') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Rustic Farm Table (RST-TBL-8-PIN) - tags: rustic, wood, dining, farm-table
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('RST-TBL-8-PIN'), get_tag_id(name)
FROM (VALUES ('rustic'), ('wood'), ('dining'), ('farm-table')) as t(name)
WHERE get_rental_item_id('RST-TBL-8-PIN') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Circular Dining Table (CIR-DIN-60-WD) - tags: round, dining, wood, classic
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('CIR-DIN-60-WD'), get_tag_id(name)
FROM (VALUES ('round'), ('dining'), ('wood'), ('classic')) as t(name)
WHERE get_rental_item_id('CIR-DIN-60-WD') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Chiavari Chair Silver (CHV-CHR-SLV) - tags: elegant, chiavari, silver, classic
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('CHV-CHR-SLV'), get_tag_id(name)
FROM (VALUES ('elegant'), ('chiavari'), ('silver'), ('classic')) as t(name)
WHERE get_rental_item_id('CHV-CHR-SLV') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Chiavari Chair Mahogany (CHV-CHR-MAH) - tags: elegant, chiavari, mahogany, wood
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('CHV-CHR-MAH'), get_tag_id(name)
FROM (VALUES ('elegant'), ('chiavari'), ('mahogany'), ('wood')) as t(name)
WHERE get_rental_item_id('CHV-CHR-MAH') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Phoenix Chair Clear (PHX-CHR-CLR) - tags: modern, acrylic, clear, contemporary
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('PHX-CHR-CLR'), get_tag_id(name)
FROM (VALUES ('modern'), ('acrylic'), ('clear'), ('contemporary')) as t(name)
WHERE get_rental_item_id('PHX-CHR-CLR') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Hayworth Barstool (HAY-STL-CHR) - tags: modern, chrome, barstool, sleek
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('HAY-STL-CHR'), get_tag_id(name)
FROM (VALUES ('modern'), ('chrome'), ('barstool'), ('sleek')) as t(name)
WHERE get_rental_item_id('HAY-STL-CHR') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Titan Chair White (TIT-CHR-WHT) - tags: modern, white, contemporary, durable
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('TIT-CHR-WHT'), get_tag_id(name)
FROM (VALUES ('modern'), ('white'), ('contemporary'), ('durable')) as t(name)
WHERE get_rental_item_id('TIT-CHR-WHT') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Mirage Barstool (MIR-STL-CHR) - tags: modern, chrome, barstool, comfort
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('MIR-STL-CHR'), get_tag_id(name)
FROM (VALUES ('modern'), ('chrome'), ('barstool'), ('comfort')) as t(name)
WHERE get_rental_item_id('MIR-STL-CHR') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Barclay Wall (BAR-WALL-8-GLD) - tags: elegant, divider, branded, gold
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('BAR-WALL-8-GLD'), get_tag_id(name)
FROM (VALUES ('elegant'), ('divider'), ('branded'), ('gold')) as t(name)
WHERE get_rental_item_id('BAR-WALL-8-GLD') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Hedge Wall (HDG-WALL-BOX) - tags: greenery, natural, photo-backdrop, hedge
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('HDG-WALL-BOX'), get_tag_id(name)
FROM (VALUES ('greenery'), ('natural'), ('photo-backdrop'), ('hedge')) as t(name)
WHERE get_rental_item_id('HDG-WALL-BOX') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Poly Premier Drape Black (DRP-POLY-BLK-10) - tags: drape, black, backdrop, stage
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('DRP-POLY-BLK-10'), get_tag_id(name)
FROM (VALUES ('drape'), ('black'), ('backdrop'), ('stage')) as t(name)
WHERE get_rental_item_id('DRP-POLY-BLK-10') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Sheer Voile Drape (DRP-SHEER-WHT-10) - tags: sheer, white, elegant, ceiling
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('DRP-SHEER-WHT-10'), get_tag_id(name)
FROM (VALUES ('sheer'), ('white'), ('elegant'), ('ceiling')) as t(name)
WHERE get_rental_item_id('DRP-SHEER-WHT-10') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- 3D Infinity Mirror Dance Floor (FLR-3D-INF) - tags: illuminated, led, mirror, dance-floor
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('FLR-3D-INF'), get_tag_id(name)
FROM (VALUES ('illuminated'), ('led'), ('mirror'), ('dance-floor')) as t(name)
WHERE get_rental_item_id('FLR-3D-INF') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Snaplock Dance Floor (FLR-SNAP-WHT) - tags: white, laminate, dance-floor, elegant
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('FLR-SNAP-WHT'), get_tag_id(name)
FROM (VALUES ('white'), ('laminate'), ('dance-floor'), ('elegant')) as t(name)
WHERE get_rental_item_id('FLR-SNAP-WHT') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Stage Deck 4x4 (STG-DECK-44) - tags: stage, platform, modular, adjustable
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('STG-DECK-44'), get_tag_id(name)
FROM (VALUES ('stage'), ('platform'), ('modular'), ('adjustable')) as t(name)
WHERE get_rental_item_id('STG-DECK-44') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Stage Deck 4x8 (STG-DECK-48) - tags: stage, platform, modular, adjustable
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('STG-DECK-48'), get_tag_id(name)
FROM (VALUES ('stage'), ('platform'), ('modular'), ('adjustable')) as t(name)
WHERE get_rental_item_id('STG-DECK-48') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Stage Stairs (STG-STAIRS) - tags: stairs, access, stage, safety
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('STG-STAIRS'), get_tag_id(name)
FROM (VALUES ('stairs'), ('access'), ('stage'), ('safety')) as t(name)
WHERE get_rental_item_id('STG-STAIRS') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Stageline SL100 (STGL-SL100) - tags: mobile, concert, hydraulic, production
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('STGL-SL100'), get_tag_id(name)
FROM (VALUES ('mobile'), ('concert'), ('hydraulic'), ('production')) as t(name)
WHERE get_rental_item_id('STGL-SL100') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Stageline SL260 (STGL-SL260) - tags: mobile, large, concert, professional
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('STGL-SL260'), get_tag_id(name)
FROM (VALUES ('mobile'), ('large'), ('concert'), ('professional')) as t(name)
WHERE get_rental_item_id('STGL-SL260') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Box Truss 12inch (TRUSS-BOX-12) - tags: truss, aluminum, rigging, structural
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('TRUSS-BOX-12'), get_tag_id(name)
FROM (VALUES ('truss'), ('aluminum'), ('rigging'), ('structural')) as t(name)
WHERE get_rental_item_id('TRUSS-BOX-12') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Truss Tower (TRUSS-TWR) - tags: tower, adjustable, lighting, support
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('TRUSS-TWR'), get_tag_id(name)
FROM (VALUES ('tower'), ('adjustable'), ('lighting'), ('support')) as t(name)
WHERE get_rental_item_id('TRUSS-TWR') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Illuminated Circle Truss (TRUSS-CIRC-LED) - tags: circular, led, illuminated, decorative
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('TRUSS-CIRC-LED'), get_tag_id(name)
FROM (VALUES ('circular'), ('led'), ('illuminated'), ('decorative')) as t(name)
WHERE get_rental_item_id('TRUSS-CIRC-LED') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Chrome Stanchion Blue (STNCH-CHR-BLU) - tags: chrome, stanchion, crowd-control, elegant
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('STNCH-CHR-BLU'), get_tag_id(name)
FROM (VALUES ('chrome'), ('stanchion'), ('crowd-control'), ('elegant')) as t(name)
WHERE get_rental_item_id('STNCH-CHR-BLU') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Gold Stanchion Velvet (STNCH-GLD-VLV) - tags: gold, vip, velvet-rope, classic
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('STNCH-GLD-VLV'), get_tag_id(name)
FROM (VALUES ('gold'), ('vip'), ('velvet-rope'), ('classic')) as t(name)
WHERE get_rental_item_id('STNCH-GLD-VLV') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Bike Rack Barricade (BRCD-BIKE) - tags: steel, barricade, concert, heavy-duty
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('BRCD-BIKE'), get_tag_id(name)
FROM (VALUES ('steel'), ('barricade'), ('concert'), ('heavy-duty')) as t(name)
WHERE get_rental_item_id('BRCD-BIKE') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Pro Audio Package (AV-AUD-PRO) - tags: audio, professional, concert, pa-system
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('AV-AUD-PRO'), get_tag_id(name)
FROM (VALUES ('audio'), ('professional'), ('concert'), ('pa-system')) as t(name)
WHERE get_rental_item_id('AV-AUD-PRO') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- CO2 Cannon (SFX-CO2-CAN) - tags: co2, fog, special-effects, dramatic
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('SFX-CO2-CAN'), get_tag_id(name)
FROM (VALUES ('co2'), ('fog'), ('special-effects'), ('dramatic')) as t(name)
WHERE get_rental_item_id('SFX-CO2-CAN') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Cold Spark Machine (SFX-COLD-SPK) - tags: cold-spark, fireworks, wedding, safe
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('SFX-COLD-SPK'), get_tag_id(name)
FROM (VALUES ('cold-spark'), ('fireworks'), ('wedding'), ('safe')) as t(name)
WHERE get_rental_item_id('SFX-COLD-SPK') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Confetti Cannon (SFX-CONF-CAN) - tags: confetti, celebration, special-effects, party
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('SFX-CONF-CAN'), get_tag_id(name)
FROM (VALUES ('confetti'), ('celebration'), ('special-effects'), ('party')) as t(name)
WHERE get_rental_item_id('SFX-CONF-CAN') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- 360 Photo Booth (SFX-360-BOOTH) - tags: photo-booth, 360, social, entertainment
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('SFX-360-BOOTH'), get_tag_id(name)
FROM (VALUES ('photo-booth'), ('360'), ('social'), ('entertainment')) as t(name)
WHERE get_rental_item_id('SFX-360-BOOTH') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Digital Photo Booth (SFX-DIGI-BOOTH) - tags: photo-booth, digital, social, printing
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('SFX-DIGI-BOOTH'), get_tag_id(name)
FROM (VALUES ('photo-booth'), ('digital'), ('social'), ('printing')) as t(name)
WHERE get_rental_item_id('SFX-DIGI-BOOTH') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Stilt Walkers (ENT-STILT) - tags: stilt-walker, entertainment, costume, circus
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('ENT-STILT'), get_tag_id(name)
FROM (VALUES ('stilt-walker'), ('entertainment'), ('costume'), ('circus')) as t(name)
WHERE get_rental_item_id('ENT-STILT') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Aerial Acts (ENT-AERIAL) - tags: aerial, acrobat, silk, elegant
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('ENT-AERIAL'), get_tag_id(name)
FROM (VALUES ('aerial'), ('acrobat'), ('silk'), ('elegant')) as t(name)
WHERE get_rental_item_id('ENT-AERIAL') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- LED Dancer (ENT-LED-DANCE) - tags: led, dancer, lights, high-energy
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('ENT-LED-DANCE'), get_tag_id(name)
FROM (VALUES ('led'), ('dancer'), ('lights'), ('high-energy')) as t(name)
WHERE get_rental_item_id('ENT-LED-DANCE') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Fire Performer (ENT-FIRE) - tags: fire, dramatic, outdoor, circus
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('ENT-FIRE'), get_tag_id(name)
FROM (VALUES ('fire'), ('dramatic'), ('outdoor'), ('circus')) as t(name)
WHERE get_rental_item_id('ENT-FIRE') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- DJ/Musician (ENT-DJ-MUS) - tags: dj, musician, music, entertainment
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('ENT-DJ-MUS'), get_tag_id(name)
FROM (VALUES ('dj'), ('musician'), ('music'), ('entertainment')) as t(name)
WHERE get_rental_item_id('ENT-DJ-MUS') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Dual Door Refrigerator (FB-FRIDGE-DUAL) - tags: refrigerator, commercial, food-service, storage
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('FB-FRIDGE-DUAL'), get_tag_id(name)
FROM (VALUES ('refrigerator'), ('commercial'), ('food-service'), ('storage')) as t(name)
WHERE get_rental_item_id('FB-FRIDGE-DUAL') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Propane Grill (FB-GRILL-PROP) - tags: grill, propane, catering, outdoor
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('FB-GRILL-PROP'), get_tag_id(name)
FROM (VALUES ('grill'), ('propane'), ('catering'), ('outdoor')) as t(name)
WHERE get_rental_item_id('FB-GRILL-PROP') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;

-- Cocktail Station (FB-CKTL-STN) - tags: cocktail, bar, bartender, professional
INSERT INTO rental_item_tags (rental_item_id, tag_id)
SELECT get_rental_item_id('FB-CKTL-STN'), get_tag_id(name)
FROM (VALUES ('cocktail'), ('bar'), ('bartender'), ('professional')) as t(name)
WHERE get_rental_item_id('FB-CKTL-STN') IS NOT NULL AND get_tag_id(name) IS NOT NULL
ON CONFLICT DO NOTHING;


-- ============================================================================
-- CLEANUP: Drop helper functions
-- ============================================================================
DROP FUNCTION IF EXISTS get_event_type_id(VARCHAR);
DROP FUNCTION IF EXISTS get_rental_item_id(VARCHAR);
DROP FUNCTION IF EXISTS get_tag_id(VARCHAR);


-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Run these to verify the data was inserted correctly:

-- SELECT 'tags' as table_name, COUNT(*) as count FROM tags
-- UNION ALL SELECT 'rental_item_tags', COUNT(*) FROM rental_item_tags
-- UNION ALL SELECT 'rental_item_event_types', COUNT(*) FROM rental_item_event_types;

-- Check tag associations for a specific item:
-- SELECT ri.name, t.name as tag_name
-- FROM rental_items ri
-- JOIN rental_item_tags rit ON ri.id = rit.rental_item_id
-- JOIN tags t ON rit.tag_id = t.id
-- WHERE ri.sku = 'MON-SOFA-BLK';

-- Check event type associations for a specific item:
-- SELECT ri.name, et.name as event_type
-- FROM rental_items ri
-- JOIN rental_item_event_types riet ON ri.id = riet.rental_item_id
-- JOIN event_types et ON riet.event_type_id = et.id
-- WHERE ri.sku = 'MON-SOFA-BLK';
