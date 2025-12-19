-- ============================================================================
-- PAVILION360 V2.0 - COMPLETE SEED DATA
-- ============================================================================
-- 
-- This file seeds ALL content for the site:
-- - Rental Items (60+ items)
-- - Portfolio Projects (5 projects)
-- - FAQs (12 items)
-- - Testimonials (4 items)
-- - Venues (4 venues)
-- 
-- Run AFTER seed-services.sql
-- Run BEFORE update-image-urls.sql (to update URLs to Supabase Storage)
-- 
-- UUID Naming Convention (all valid hex):
-- - Rentals:      10010000-0000-0000-0000-000000000XXX
-- - Portfolio:    20010000-0000-0000-0000-000000000XXX
-- - FAQs:         30010000-0000-0000-0000-000000000XXX
-- - Testimonials: 40010000-0000-0000-0000-000000000XXX
-- - Venues:       50010000-0000-0000-0000-000000000XXX
-- 
-- Last Updated: December 19, 2024
-- ============================================================================


-- ============================================================================
-- RENTAL ITEMS
-- ============================================================================

INSERT INTO rental_items (id, category_id, name, slug, sku, subcategory, thumbnail_url, short_description, details, specs, is_popular, display_order) VALUES

-- LOUNGE FURNITURE
('10010000-0000-0000-0000-000000000001', (SELECT id FROM rental_categories WHERE slug = 'lounge-furniture'), 
 'Mondrian Modular Sofa', 'mondrian-modular-sofa', 'MON-SOFA-BLK', 'Mondrian Collection',
 '/black-leather-modular-sofa-modern-event-furniture.jpg',
 'Sleek modular leather sofa from our Mondrian Collection. Miami nightclub lounge vibe.',
 'The Mondrian Collection comes in both black and white leather and is a durably lightweight option with endless design arrangements. Perfect for creating a sleek and modern design with that hot Miami nightclub lounge vibe.',
 '{"material": "Black leather upholstery", "design": "Modular", "care": "Stain resistant", "weight": "Lightweight yet durable"}'::jsonb,
 true, 1),

('10010000-0000-0000-0000-000000000002', (SELECT id FROM rental_categories WHERE slug = 'lounge-furniture'),
 'Mondrian Corner Module', 'mondrian-corner-module', 'MON-CRNR-WHT', 'Mondrian Collection',
 '/white-leather-corner-modular-furniture-piece.jpg',
 'White leather corner module. Create custom seating configurations.',
 NULL,
 '{"material": "White leather upholstery", "type": "Corner piece", "design": "Modular system", "care": "Stain resistant"}'::jsonb,
 false, 2),

('10010000-0000-0000-0000-000000000003', (SELECT id FROM rental_categories WHERE slug = 'lounge-furniture'),
 'Colette Velvet Sofa - Ivory', 'colette-velvet-sofa-ivory', 'COL-SOFA-IVR', 'Colette Collection',
 '/ivory-velvet-sofa-elegant-event-seating.jpg',
 'Versatile ivory velvet sofa. Many configurations available.',
 NULL,
 '{"material": "Ivory velvet upholstery", "design": "Modular", "texture": "Luxurious", "configurations": "Multiple"}'::jsonb,
 true, 3),

('10010000-0000-0000-0000-000000000004', (SELECT id FROM rental_categories WHERE slug = 'lounge-furniture'),
 'Colette Crescent Sofa - Crimson', 'colette-crescent-sofa-crimson', 'COL-CRSC-CRM', 'Colette Collection',
 '/crimson-red-velvet-crescent-curved-sofa.jpg',
 'Dramatic crimson velvet crescent sofa. Bold statement piece.',
 NULL,
 '{"material": "Crimson velvet upholstery", "shape": "Crescent", "grouping": "Available", "finish": "Luxe"}'::jsonb,
 false, 4),

('10010000-0000-0000-0000-000000000005', (SELECT id FROM rental_categories WHERE slug = 'lounge-furniture'),
 'Kincaid Velvet Chair - Emerald', 'kincaid-chair-emerald', 'KIN-CHR-EMR', 'Kincaid Collection',
 '/emerald-green-velvet-dining-chair-elegant.jpg',
 'Lavish emerald velvet dining chair. Available in 16 or 18 inch height.',
 NULL,
 '{"material": "Emerald velvet upholstery", "height_options": "16 or 18 inch", "type": "Dining furniture", "style": "Luxurious"}'::jsonb,
 false, 5),

('10010000-0000-0000-0000-000000000006', (SELECT id FROM rental_categories WHERE slug = 'lounge-furniture'),
 'Teal Velvet Modern Sofa', 'teal-velvet-modern-sofa', 'TEL-SOFA-MOD', 'Modern Collection',
 '/teal-velvet-modern-sofa.jpg',
 'Contemporary teal velvet sofa with clean lines.',
 NULL,
 '{"material": "Teal velvet", "style": "Modern", "design": "Clean lines"}'::jsonb,
 false, 6),

-- BARS & SHELVES
('10010000-0000-0000-0000-000000000010', (SELECT id FROM rental_categories WHERE slug = 'bars-shelves'),
 '8ft Pavilion Bar - Black', 'pavilion-bar-8ft-black', 'PAV-BAR-8-BLK', 'Bars',
 '/modern-black-illuminated-bar-counter-event.jpg',
 '8ft illuminated bar with LED capabilities. Custom graphics optional.',
 NULL,
 '{"length": "8ft", "illumination": "LED capable", "surface": "Black acrylic", "graphics": "Custom available"}'::jsonb,
 true, 10),

('10010000-0000-0000-0000-000000000011', (SELECT id FROM rental_categories WHERE slug = 'bars-shelves'),
 '6ft Avenue Bar - Gold & Chrome', 'avenue-bar-6ft-gold', 'AVE-BAR-6-GLD', 'Bars',
 '/gold-chrome-bar-counter-elegant-event-rental.jpg',
 'Elegant 6ft bar in gold and chrome. Curved options available.',
 NULL,
 '{"length": "6ft", "finish": "Gold and chrome", "curved": "Sections available", "customization": "Surface optional"}'::jsonb,
 false, 11),

('10010000-0000-0000-0000-000000000012', (SELECT id FROM rental_categories WHERE slug = 'bars-shelves'),
 '12ft Circus Bar - Red/White/Gold', 'circus-bar-12ft', 'CIR-BAR-12-RWG', 'Bars',
 '/ornate-red-white-gold-bar-event-rental-circus-them.jpg',
 '12ft statement bar in red, white, and gold. Dramatic curved arc option available.',
 NULL,
 '{"length": "12ft", "finish": "Red/white/gold", "arc_option": "24ft arc available", "style": "Bold design"}'::jsonb,
 false, 12),

('10010000-0000-0000-0000-000000000013', (SELECT id FROM rental_categories WHERE slug = 'bars-shelves'),
 'Essex Bar Back - Gold & Chrome', 'essex-bar-back', 'ESS-BRBK-GLD', 'Bar Backs',
 '/elegant-gold-chrome-bar-back-shelving-display.jpg',
 'Elegant bar back shelving in gold and chrome.',
 NULL,
 '{"finish": "Gold and chrome", "shelves": "Multiple levels", "lighting": "LED compatible", "type": "Display shelving"}'::jsonb,
 false, 13),

('10010000-0000-0000-0000-000000000014', (SELECT id FROM rental_categories WHERE slug = 'bars-shelves'),
 'Rustic Wood Bar Counter', 'rustic-wood-bar', 'RST-BAR-WD', 'Bars',
 '/rustic-wood-bar-counter.jpg',
 'Warm rustic wood bar counter perfect for weddings and farm-style events.',
 NULL,
 '{"material": "Reclaimed wood", "style": "Rustic", "finish": "Natural"}'::jsonb,
 false, 14),

-- TABLES
('10010000-0000-0000-0000-000000000020', (SELECT id FROM rental_categories WHERE slug = 'tables'),
 'Metropolitan Table - Gold & Chrome', 'metropolitan-table-gold', 'MET-TBL-GLD', 'Cocktail Tables',
 '/gold-chrome-cocktail-table-modern-event-rental.jpg',
 'Elegant gold and chrome cocktail table. Multiple heights available.',
 NULL,
 '{"finish": "Gold and chrome", "heights": "30 or 40 inch", "top": "Round", "graphics": "Optional"}'::jsonb,
 true, 20),

('10010000-0000-0000-0000-000000000021', (SELECT id FROM rental_categories WHERE slug = 'tables'),
 'Bentley 30 Table - Gold & Chrome', 'bentley-30-table', 'BEN-TBL-30-GLD', 'Cocktail Tables',
 '/small-gold-chrome-cocktail-table-high-top.jpg',
 '30 inch gold and chrome high top table.',
 NULL,
 '{"height": "30 inch", "finish": "Gold and chrome", "footprint": "Compact", "base": "Sturdy"}'::jsonb,
 false, 21),

('10010000-0000-0000-0000-000000000022', (SELECT id FROM rental_categories WHERE slug = 'tables'),
 '4ft Luma Table - White Frosted', 'luma-table-4ft', 'LUM-TBL-4-WHT', 'Cocktail Tables',
 '/white-frosted-illuminated-cocktail-table-modern.jpg',
 '4ft white frosted illuminated table. LED glow effect.',
 NULL,
 '{"length": "4ft", "surface": "White frosted", "lighting": "LED illumination", "design": "Modern"}'::jsonb,
 false, 22),

('10010000-0000-0000-0000-000000000023', (SELECT id FROM rental_categories WHERE slug = 'tables'),
 '8ft Rustic Farm Table - Pine', 'rustic-farm-table-8ft', 'RST-TBL-8-PIN', 'Dining Tables',
 '/rustic-wood-farm-table-pine-wedding-event.jpg',
 '8ft rustic pine farm table. Perfect for family-style dining.',
 NULL,
 '{"length": "8ft", "material": "Pine wood", "finish": "Rustic", "capacity": "Seats 8-10"}'::jsonb,
 true, 23),

('10010000-0000-0000-0000-000000000024', (SELECT id FROM rental_categories WHERE slug = 'tables'),
 'Circular Dining Table - 60 inch', 'circular-dining-60', 'CIR-DIN-60-WD', 'Dining Tables',
 '/round-wood-dining-table-60-inch-event-rental.jpg',
 '60 inch round dining table. Seats 8 guests.',
 NULL,
 '{"diameter": "60 inch", "material": "Wood", "capacity": "Seats 8", "sizes": "Available in 48, 60, 72 inch"}'::jsonb,
 false, 24),

-- SEATING
('10010000-0000-0000-0000-000000000030', (SELECT id FROM rental_categories WHERE slug = 'seating'),
 'Chiavari Chair - Silver', 'chiavari-chair-silver', 'CHV-CHR-SLV', 'Chairs',
 '/silver-chiavari-chair-elegant-wedding-event.jpg',
 'Classic silver chiavari chair with ivory cushion.',
 NULL,
 '{"finish": "Silver", "cushion": "Ivory seat pad included", "construction": "Resin", "storage": "Stackable"}'::jsonb,
 true, 30),

('10010000-0000-0000-0000-000000000031', (SELECT id FROM rental_categories WHERE slug = 'seating'),
 'Chiavari Chair - Mahogany', 'chiavari-chair-mahogany', 'CHV-CHR-MAH', 'Chairs',
 '/mahogany-chiavari-chair-wedding-event-elegant.jpg',
 'Mahogany chiavari chair with ivory cushion.',
 NULL,
 '{"finish": "Mahogany", "cushion": "Ivory seat pad included", "construction": "Wood", "storage": "Stackable"}'::jsonb,
 false, 31),

('10010000-0000-0000-0000-000000000032', (SELECT id FROM rental_categories WHERE slug = 'seating'),
 'Phoenix Chair - Clear', 'phoenix-chair-clear', 'PHX-CHR-CLR', 'Chairs',
 '/clear-acrylic-ghost-chair-modern-contemporary.jpg',
 'Modern clear acrylic phoenix chair. Contemporary ghost chair style.',
 NULL,
 '{"material": "Clear acrylic", "design": "Modern", "storage": "Stackable", "use": "Indoor/outdoor"}'::jsonb,
 true, 32),

('10010000-0000-0000-0000-000000000033', (SELECT id FROM rental_categories WHERE slug = 'seating'),
 'Hayworth Barstool - Chrome', 'hayworth-barstool-chrome', 'HAY-STL-CHR', 'Barstools',
 '/chrome-barstool-swivel-modern-bar-height.jpg',
 'Sleek chrome barstool. Also available in gold.',
 NULL,
 '{"finish": "Chrome", "height": "Bar height", "design": "Modern", "seat": "Swivel"}'::jsonb,
 false, 33),

('10010000-0000-0000-0000-000000000034', (SELECT id FROM rental_categories WHERE slug = 'seating'),
 'Titan Chair - White', 'titan-chair-white', 'TIT-CHR-WHT', 'Chairs',
 '/white-modern-titan-chair-stackable-event.jpg',
 'Contemporary white Titan chair. Also available in black.',
 NULL,
 '{"finish": "White", "design": "Modern", "durability": "Durable construction", "storage": "Stackable"}'::jsonb,
 false, 34),

('10010000-0000-0000-0000-000000000035', (SELECT id FROM rental_categories WHERE slug = 'seating'),
 'Mirage Barstool - Gold', 'mirage-barstool-gold', 'MIR-STL-GLD', 'Barstools',
 '/gold-mirage-barstool-elegant-event-rental.jpg',
 'Modern gold mirage barstool with back support.',
 NULL,
 '{"finish": "Gold", "height": "Bar height", "support": "Back support", "design": "Contemporary"}'::jsonb,
 false, 35),

('10010000-0000-0000-0000-000000000036', (SELECT id FROM rental_categories WHERE slug = 'seating'),
 'Chiavari Chair - Gold', 'chiavari-chair-gold', 'CHV-CHR-GLD', 'Chairs',
 '/gold-chiavari-chair.jpg',
 'Elegant gold chiavari chair with ivory cushion.',
 NULL,
 '{"finish": "Gold", "cushion": "Ivory seat pad included", "construction": "Resin", "storage": "Stackable"}'::jsonb,
 true, 36),

-- ROOM DIVIDERS
('10010000-0000-0000-0000-000000000040', (SELECT id FROM rental_categories WHERE slug = 'room-dividers'),
 '8ft Barclay Wall - Gold & Chrome', 'barclay-wall-8ft', 'BAR-WALL-8-GLD', 'Walls',
 '/gold-barclay-room-divider-wall-panel.jpg',
 'Elegant 8ft room divider in gold and chrome. Can be branded.',
 NULL,
 '{"height": "8ft", "finish": "Gold and chrome", "branding": "Custom available", "design": "Modular panels"}'::jsonb,
 true, 40),

('10010000-0000-0000-0000-000000000041', (SELECT id FROM rental_categories WHERE slug = 'room-dividers'),
 '6.5ft Hedge Wall - Boxwood', 'hedge-wall-boxwood', 'HDG-WALL-BOX', 'Walls',
 '/boxwood-hedge-wall-greenery-backdrop-event.jpg',
 'Natural boxwood hedge wall. Perfect photo backdrop.',
 NULL,
 '{"height": "6.5ft", "material": "Artificial boxwood", "use": "Photo backdrop", "setup": "Freestanding"}'::jsonb,
 false, 41),

-- PIPE & DRAPE
('10010000-0000-0000-0000-000000000045', (SELECT id FROM rental_categories WHERE slug = 'pipe-drape'),
 'Poly Premier Drape - Black', 'poly-premier-drape-black', 'DRP-POLY-BLK-10', 'Drape',
 '/black-pipe-drape-backdrop-stage-event.jpg',
 'Black poly premier drape. 10-18ft adjustable lengths.',
 NULL,
 '{"lengths": "10-18ft", "fabric": "Poly premier", "panels": "4 per 10ft section", "safety": "Flame retardant"}'::jsonb,
 false, 45),

('10010000-0000-0000-0000-000000000046', (SELECT id FROM rental_categories WHERE slug = 'pipe-drape'),
 'Sheer Voile Drape - White', 'sheer-voile-drape-white', 'DRP-SHEER-WHT-10', 'Drape',
 '/white-sheer-voile-drape-ceiling-wedding.jpg',
 'Elegant white sheer voile drape. Up to 50ft lengths available.',
 NULL,
 '{"lengths": "10-50ft", "fabric": "Sheer voile", "texture": "Soft flowing", "colors": "Multiple available"}'::jsonb,
 false, 46),

-- FLOORING
('10010000-0000-0000-0000-000000000050', (SELECT id FROM rental_categories WHERE slug = 'flooring'),
 '3D Infinity Mirror Dance Floor', '3d-infinity-mirror-dance-floor', 'FLR-3D-INF', 'Dance Floors',
 '/illuminated-led-dance-floor-3d-infinity-mirror.jpg',
 'Illuminated 3D infinity mirror dance floor. 2x2ft panels.',
 NULL,
 '{"panels": "2x2ft", "lighting": "LED illuminated", "surface": "Mirrored", "edging": "Trim included"}'::jsonb,
 true, 50),

('10010000-0000-0000-0000-000000000051', (SELECT id FROM rental_categories WHERE slug = 'flooring'),
 'Snaplock Dance Floor - White', 'snaplock-dance-floor-white', 'FLR-SNAP-WHT', 'Dance Floors',
 '/white-snaplock-dance-floor-wedding-event.jpg',
 'White laminate snaplock dance floor. 3x3ft panels.',
 NULL,
 '{"panels": "3x3ft", "finish": "White laminate", "edging": "Trim included", "use": "Indoor/covered outdoor"}'::jsonb,
 false, 51),

-- DECKS AND FOUNDATIONS
('10010000-0000-0000-0000-000000000060', (SELECT id FROM rental_categories WHERE slug = 'decks-foundations'),
 'Stage Deck 4x4 - Adjustable Height', 'stage-deck-4x4', 'STG-DECK-44', 'Stage Decks',
 '/adjustable-stage-deck-platform-event-setup.jpg',
 '4x4ft adjustable height stage deck platform.',
 NULL,
 '{"size": "4x4ft", "height": "Adjustable", "system": "Modular", "finish": "Black"}'::jsonb,
 true, 60),

('10010000-0000-0000-0000-000000000061', (SELECT id FROM rental_categories WHERE slug = 'decks-foundations'),
 'Stage Deck 4x8 - Adjustable Height', 'stage-deck-4x8', 'STG-DECK-48', 'Stage Decks',
 '/black-stage-deck-4x8-platform-modular.jpg',
 '4x8ft adjustable height stage deck platform.',
 NULL,
 '{"size": "4x8ft", "height": "Adjustable", "system": "Modular", "finish": "Black"}'::jsonb,
 false, 61),

('10010000-0000-0000-0000-000000000062', (SELECT id FROM rental_categories WHERE slug = 'decks-foundations'),
 'Stage Stairs - Multiple Heights', 'stage-stairs', 'STG-STAIRS', 'Accessories',
 '/stage-stairs-platform-access-railing.jpg',
 'Stage stairs for deck access. Multiple styles available.',
 NULL,
 '{"options": "Multiple heights", "construction": "Wood and metal", "styles": "Various", "safety": "Railings available"}'::jsonb,
 false, 62),

('10010000-0000-0000-0000-000000000063', (SELECT id FROM rental_categories WHERE slug = 'decks-foundations'),
 'Modular Stage Deck Platform', 'modular-stage-deck', 'STG-DECK-MOD', 'Stage Decks',
 '/modular-stage-deck-platform.jpg',
 'Versatile modular stage deck for custom configurations.',
 NULL,
 '{"system": "Modular", "size": "Various", "finish": "Black", "configuration": "Custom"}'::jsonb,
 false, 63),

-- STAGELINE STAGES
('10010000-0000-0000-0000-000000000070', (SELECT id FROM rental_categories WHERE slug = 'stageline-stages'),
 'Stageline SL100 Mobile Stage', 'stageline-sl100', 'STGL-SL100', 'Mobile Stages',
 '/stageline-sl100-mobile-stage-concert-production.jpg',
 'Complete mobile stage system on wheels. Full concert production ready.',
 NULL,
 '{"deployment": "Hydraulic", "rigging": "Complete", "transport": "All-in-one trailer", "setup": "Quick"}'::jsonb,
 true, 70),

('10010000-0000-0000-0000-000000000071', (SELECT id FROM rental_categories WHERE slug = 'stageline-stages'),
 'Stageline SL260 Mobile Stage', 'stageline-sl260', 'STGL-SL260', 'Mobile Stages',
 '/stageline-sl260-large-mobile-stage-concert.jpg',
 'Larger mobile stage system. Professional concert production.',
 NULL,
 '{"size": "Larger deck area", "rigging": "Professional", "deployment": "Hydraulic", "capability": "Full AV"}'::jsonb,
 false, 71),

-- TRUSSING
('10010000-0000-0000-0000-000000000080', (SELECT id FROM rental_categories WHERE slug = 'trussing'),
 '12-inch Box Truss - Aluminum', 'box-truss-12inch', 'TRUSS-BOX-12', 'Box Truss',
 '/aluminum-box-truss-rigging-system-event.jpg',
 '12-inch aluminum box truss. Multiple sizes available.',
 NULL,
 '{"size": "12-inch box", "material": "Aluminum", "lengths": "Various", "rigging": "Rigging points"}'::jsonb,
 true, 80),

('10010000-0000-0000-0000-000000000081', (SELECT id FROM rental_categories WHERE slug = 'trussing'),
 'Truss Tower - Adjustable Height', 'truss-tower', 'TRUSS-TWR', 'Towers',
 '/aluminum-truss-tower-lighting-support.jpg',
 'Aluminum truss tower. Multiple height options.',
 NULL,
 '{"height": "Adjustable", "material": "Aluminum", "use": "Lighting support", "mounting": "Signage capable"}'::jsonb,
 false, 81),

('10010000-0000-0000-0000-000000000082', (SELECT id FROM rental_categories WHERE slug = 'trussing'),
 'Illuminated Circle Truss - LED', 'illuminated-circle-truss', 'TRUSS-CIRC-LED', 'Special Truss',
 '/illuminated-circle-truss-led-lights-event.jpg',
 'Circular truss with LED illumination and spandex cover.',
 NULL,
 '{"design": "Circular", "lighting": "LED illumination", "cover": "Spandex", "colors": "Custom"}'::jsonb,
 false, 82),

-- CROWD CONTROL
('10010000-0000-0000-0000-000000000090', (SELECT id FROM rental_categories WHERE slug = 'crowd-control'),
 'Chrome Belt Stanchion - Blue Belt', 'chrome-stanchion-blue', 'STNCH-CHR-BLU', 'Stanchions',
 '/chrome-stanchion-blue-belt-crowd-control.jpg',
 'Chrome stanchion with blue retractable belt.',
 NULL,
 '{"finish": "Chrome", "belt": "Retractable blue", "base": "Weighted", "use": "Indoor/outdoor"}'::jsonb,
 true, 90),

('10010000-0000-0000-0000-000000000091', (SELECT id FROM rental_categories WHERE slug = 'crowd-control'),
 'Gold Ball Top Stanchion - Velvet Rope', 'gold-stanchion-velvet', 'STNCH-GLD-VLV', 'Stanchions',
 '/gold-ball-top-stanchion-velvet-rope-vip.jpg',
 'Classic gold stanchion with velvet rope. VIP style.',
 NULL,
 '{"finish": "Gold", "top": "Ball top design", "rope": "Velvet (multiple colors)", "style": "Classic"}'::jsonb,
 false, 91),

-- AUDIO VISUAL
('10010000-0000-0000-0000-000000000100', (SELECT id FROM rental_categories WHERE slug = 'audio-visual'),
 'Professional Audio System Package', 'pro-audio-package', 'AV-AUD-PRO', 'Audio',
 '/line-array-speakers-audio-system-concert.jpg',
 'Complete professional audio system with line array speakers, subs, and mixing console.',
 NULL,
 '{"speakers": "Line array", "subs": "Powered subwoofers", "console": "Digital mixing", "cables": "All included"}'::jsonb,
 true, 100),

('10010000-0000-0000-0000-000000000101', (SELECT id FROM rental_categories WHERE slug = 'audio-visual'),
 'High Brightness Projector', 'high-brightness-projector', 'AV-PROJ-HB', 'Video',
 '/high-brightness-projector.jpg',
 'High brightness projector for large venues and outdoor events.',
 NULL,
 '{"brightness": "High lumens", "use": "Large venues", "resolution": "HD/4K", "lens": "Interchangeable"}'::jsonb,
 false, 101),

('10010000-0000-0000-0000-000000000102', (SELECT id FROM rental_categories WHERE slug = 'audio-visual'),
 'LED Par Can Stage Light', 'led-par-can', 'AV-LED-PAR', 'Lighting',
 '/led-par-can-stage-light.jpg',
 'Versatile LED par can for stage and ambient lighting.',
 NULL,
 '{"type": "LED Par Can", "control": "DMX", "use": "Stage/ambient", "colors": "RGB"}'::jsonb,
 false, 102),

('10010000-0000-0000-0000-000000000103', (SELECT id FROM rental_categories WHERE slug = 'audio-visual'),
 'Moving Head Stage Light', 'moving-head-light', 'AV-MH-STG', 'Lighting',
 '/moving-head-stage-light.jpg',
 'Professional moving head light for dynamic stage effects.',
 NULL,
 '{"type": "Moving head", "control": "DMX", "movement": "Pan/tilt", "effects": "Gobo patterns"}'::jsonb,
 false, 103),

('10010000-0000-0000-0000-000000000104', (SELECT id FROM rental_categories WHERE slug = 'audio-visual'),
 'Professional 4K Video Camera', 'pro-4k-camera', 'AV-CAM-4K', 'Video',
 '/professional-4k-video-camera.jpg',
 'Broadcast quality 4K camera for live production.',
 NULL,
 '{"resolution": "4K", "type": "Broadcast quality", "use": "Live production", "accessories": "Tripod included"}'::jsonb,
 false, 104),

('10010000-0000-0000-0000-000000000105', (SELECT id FROM rental_categories WHERE slug = 'audio-visual'),
 'Shure SM58 Microphone', 'shure-sm58', 'AV-MIC-SM58', 'Audio',
 '/shure-sm58-microphone.jpg',
 'Industry-standard dynamic vocal microphone.',
 NULL,
 '{"type": "Dynamic vocal", "brand": "Shure SM58", "use": "Vocals/speech", "durability": "Rugged"}'::jsonb,
 false, 105),

('10010000-0000-0000-0000-000000000106', (SELECT id FROM rental_categories WHERE slug = 'audio-visual'),
 'QSC Professional Speaker', 'qsc-pro-speaker', 'AV-SPK-QSC', 'Audio',
 '/professional-pa-speaker-qsc.jpg',
 'High-quality QSC powered speaker for professional audio.',
 NULL,
 '{"brand": "QSC", "type": "Powered", "use": "Professional audio", "power": "High output"}'::jsonb,
 false, 106),

('10010000-0000-0000-0000-000000000107', (SELECT id FROM rental_categories WHERE slug = 'audio-visual'),
 'Power Distribution Box', 'power-distro-box', 'AV-PWR-DIST', 'Power',
 '/power-distribution-box.jpg',
 'Professional power distribution for event equipment.',
 NULL,
 '{"type": "Distribution box", "circuits": "Multiple", "use": "Event equipment", "safety": "Breaker protected"}'::jsonb,
 false, 107),

-- SPECIAL EFFECTS
('10010000-0000-0000-0000-000000000110', (SELECT id FROM rental_categories WHERE slug = 'special-effects'),
 'CO2 Cannon with Tank', 'co2-cannon', 'SFX-CO2-CAN', 'Effects',
 '/co2-cannon-special-effects-concert-event.jpg',
 'CO2 cannon for dramatic fog blasts. Includes tank.',
 NULL,
 '{"tank": "CO2 included", "mounting": "Handheld or mounted", "control": "DMX optional", "safety": "Indoor safe"}'::jsonb,
 true, 110),

('10010000-0000-0000-0000-000000000111', (SELECT id FROM rental_categories WHERE slug = 'special-effects'),
 'Cold Spark Machine - Indoor Fireworks', 'cold-spark-machine', 'SFX-COLD-SPK', 'Effects',
 '/cold-spark-machine-indoor-fireworks-wedding.jpg',
 'Safe cold spark indoor fireworks fountain. Wedding grand entrance favorite.',
 NULL,
 '{"safety": "Indoor/outdoor safe", "smoke": "No smoke or smell", "height": "15ft spark", "control": "DMX"}'::jsonb,
 true, 111),

('10010000-0000-0000-0000-000000000112', (SELECT id FROM rental_categories WHERE slug = 'special-effects'),
 'Confetti Cannon with Tissue Confetti', 'confetti-cannon', 'SFX-CONF-CAN', 'Effects',
 '/confetti-cannon-celebration-party-effect.jpg',
 'Confetti cannon for celebration moments. Includes tissue confetti.',
 NULL,
 '{"trigger": "Manual or electric", "confetti": "Tissue included", "range": "30ft blast", "colors": "Multiple options"}'::jsonb,
 false, 112),

('10010000-0000-0000-0000-000000000113', (SELECT id FROM rental_categories WHERE slug = 'special-effects'),
 '360 Photo Booth', '360-photo-booth', 'SFX-360-BOOTH', 'Photo Booths',
 '/360-photo-booth-spinning-camera-event.jpg',
 '360-degree spinning photo booth. Instantly capture and share.',
 NULL,
 '{"rotation": "360-degree", "sharing": "Instant", "overlays": "Custom", "service": "Attendant included"}'::jsonb,
 true, 113),

('10010000-0000-0000-0000-000000000114', (SELECT id FROM rental_categories WHERE slug = 'special-effects'),
 'Digital Photo Booth', 'digital-photo-booth', 'SFX-DIGI-BOOTH', 'Photo Booths',
 '/digital-photo-booth-touchscreen-instant-print.jpg',
 'Digital photo booth with instant print and social sharing.',
 NULL,
 '{"interface": "Touchscreen", "printing": "Instant", "sharing": "Social media", "props": "Included"}'::jsonb,
 false, 114),

-- LIVE ENTERTAINMENT
('10010000-0000-0000-0000-000000000120', (SELECT id FROM rental_categories WHERE slug = 'live-entertainment'),
 'Stilt Walkers - Themed Costumes', 'stilt-walkers', 'ENT-STILT', 'Performers',
 '/stilt-walker-performer-costume-entertainment.jpg',
 'Professional stilt walkers in themed costumes. 2-hour service blocks.',
 NULL,
 '{"service": "2-hour blocks", "costumes": "Themed", "performers": "Professional", "interaction": "Interactive"}'::jsonb,
 true, 120),

('10010000-0000-0000-0000-000000000121', (SELECT id FROM rental_categories WHERE slug = 'live-entertainment'),
 'Aerial Acts - Silks & Lyra', 'aerial-acts', 'ENT-AERIAL', 'Performers',
 '/aerial-silk-performer-acrobat-event-entertainment.jpg',
 'Breathtaking aerial silk and lyra performances. Requires rigging.',
 NULL,
 '{"apparatus": "Silks or lyra", "performers": "Professional aerialists", "rigging": "Required", "service": "2-hour blocks"}'::jsonb,
 false, 121),

('10010000-0000-0000-0000-000000000122', (SELECT id FROM rental_categories WHERE slug = 'live-entertainment'),
 'LED Dancer Performance', 'led-dancer', 'ENT-LED-DANCE', 'Performers',
 '/led-dancer-performer-light-up-costume.jpg',
 'LED dancers in illuminated costumes. High-energy performance.',
 NULL,
 '{"costumes": "LED light-up", "routines": "Choreographed", "dancers": "Professional", "venue": "Dark recommended"}'::jsonb,
 true, 122),

('10010000-0000-0000-0000-000000000123', (SELECT id FROM rental_categories WHERE slug = 'live-entertainment'),
 'Fire Performer - Outdoor Only', 'fire-performer', 'ENT-FIRE', 'Performers',
 '/fire-performer-spinning-flames-outdoor-event.jpg',
 'Dramatic fire spinning and performance. Outdoor venues only.',
 NULL,
 '{"acts": "Fire spinning", "apparatus": "Poi, staff, or fans", "venue": "Outdoor only", "service": "2-hour blocks"}'::jsonb,
 false, 123),

('10010000-0000-0000-0000-000000000124', (SELECT id FROM rental_categories WHERE slug = 'live-entertainment'),
 'DJ / Musician Booking', 'dj-musician', 'ENT-DJ-MUS', 'Music',
 '/professional-dj-mixing-console-event-music.jpg',
 'Professional DJ or live musician booking. Local to national performers.',
 NULL,
 '{"performers": "Professional", "equipment": "Included", "genres": "Multiple", "playlists": "Custom"}'::jsonb,
 true, 124),

-- FOOD & BEVERAGE
('10010000-0000-0000-0000-000000000130', (SELECT id FROM rental_categories WHERE slug = 'food-beverage'),
 'Commercial Dual Door Refrigerator', 'dual-door-fridge', 'FB-FRIDGE-DUAL', 'Equipment',
 '/commercial-dual-door-refrigerator-food-service.jpg',
 '7.5ft tall commercial dual door refrigerator for food service.',
 NULL,
 '{"size": "7.5ft tall x 6ft wide", "doors": "Dual door access", "grade": "Commercial", "temperature": "Controlled"}'::jsonb,
 false, 130),

('10010000-0000-0000-0000-000000000131', (SELECT id FROM rental_categories WHERE slug = 'food-beverage'),
 'Propane Grill Station', 'propane-grill', 'FB-GRILL-PROP', 'Equipment',
 '/propane-grill-outdoor-catering-food-station.jpg',
 'Large propane grill for outdoor catering. Includes 2 tanks.',
 NULL,
 '{"fuel": "Propane powered", "tanks": "2 propane tanks included", "surface": "Large cooking", "use": "Outdoor"}'::jsonb,
 false, 131),

('10010000-0000-0000-0000-000000000132', (SELECT id FROM rental_categories WHERE slug = 'food-beverage'),
 'Cocktail Station - Ice Chest & Speed Rail', 'cocktail-station', 'FB-CKTL-STN', 'Equipment',
 '/portable-cocktail-station-bar-setup-event.jpg',
 'Complete cocktail station with integrated ice chest and speed rail.',
 NULL,
 '{"ice": "Built-in chest", "bottles": "Speed rail", "transport": "Portable", "setup": "Professional"}'::jsonb,
 false, 132);


-- ============================================================================
-- PORTFOLIO PROJECTS
-- ============================================================================

INSERT INTO portfolio_projects (id, slug, title, event_type_id, venue, event_date, thumbnail_url, gallery, description, goals, technical_highlights, attendee_count, client_quote_text, client_quote_author, client_quote_role, is_featured, display_order) VALUES

('20010000-0000-0000-0000-000000000001',
 'indy-tech-summit-2024',
 'Indianapolis Tech Summit 2024',
 (SELECT id FROM event_types WHERE slug = 'corporate'),
 'Indiana Convention Center',
 '2024-03-15',
 '/conference-hall-keynote-presentation.jpg',
 ARRAY['/conference-hall-keynote-presentation.jpg', '/corporate-event-presentation-stage.jpg', '/modern-trade-show-booth-design.jpg'],
 'A three-day technology conference featuring keynote presentations, breakout sessions, and an expo hall with 100+ exhibitors.',
 'Create an immersive, tech-forward environment that facilitates learning, networking, and innovation showcase.',
 ARRAY['60ft LED video wall for main stage', '12 breakout rooms with full AV packages', 'Fiber-optic camera distribution to 6 cameras', 'Wireless mic system with 24 channels', 'Live streaming to 5,000+ remote attendees'],
 2500,
 'Pavilion360 transformed our vision into an incredible experience. The technical execution was flawless, and attendees raved about the production quality.',
 'Sarah Mitchell',
 'Director of Events, TechIndy',
 true, 1),

('20010000-0000-0000-0000-000000000002',
 'johnson-wedding',
 'Emily & James Johnson Wedding',
 (SELECT id FROM event_types WHERE slug = 'wedding'),
 'Indiana Roof Ballroom',
 '2024-06-08',
 '/elegant-wedding-reception-setup.jpg',
 ARRAY['/ivory-velvet-sofa-elegant-event-seating.jpg', '/gold-chrome-bar-counter-elegant-event-rental.jpg', '/mahogany-chiavari-chair-wedding-event-elegant.jpg'],
 'An elegant black-tie wedding for 250 guests featuring ceremony and reception in the historic Indiana Roof Ballroom.',
 'Create a romantic, timeless atmosphere with sophisticated lighting, premium furniture, and seamless audio for vows and toasts.',
 ARRAY['Amber uplighting on all columns and walls', 'Wireless ceremony sound with lavalier mics', 'Monogram projection on dance floor', 'DJ booth with intelligent lighting rig', 'Lounge area with velvet sofas and gold accents'],
 250,
 'From the first meeting to the last dance, Pavilion360 made our wedding day absolutely perfect. The lighting was breathtaking and everything ran so smoothly.',
 'Emily Johnson',
 'Bride',
 true, 2),

('20010000-0000-0000-0000-000000000003',
 'childrens-museum-gala',
 'Children''s Museum Annual Gala',
 (SELECT id FROM event_types WHERE slug = 'gala'),
 'The Children''s Museum of Indianapolis',
 '2024-10-12',
 '/museum-gala-fundraising-event.jpg',
 ARRAY['/event-management-team-coordination.jpg', '/mahogany-chiavari-chair-wedding-event-elegant.jpg'],
 'Annual fundraising gala for 500 guests featuring cocktail hour, seated dinner, live auction, and entertainment.',
 'Transform the museum''s Dinosphere into an elegant fundraising venue while highlighting the institution''s mission.',
 ARRAY['Custom stage with LED backdrop', 'Wireless auction bidding system integration', 'Theatrical lighting highlighting dinosaur exhibits', 'Multi-camera video production for live auction', 'Farm tables and chiavari chairs for 500 guests'],
 500,
 'Pavilion360 helped us raise a record $1.2 million this year. Their creative team turned our vision into reality and the technical execution was perfect.',
 'Dr. Jeffrey Patchen',
 'President & CEO, The Children''s Museum',
 true, 3),

('20010000-0000-0000-0000-000000000004',
 'broad-ripple-music-fest',
 'Broad Ripple Music Festival',
 (SELECT id FROM event_types WHERE slug = 'festival'),
 'Broad Ripple Park',
 '2024-08-17',
 '/outdoor-music-festival-stage-crowd.jpg',
 ARRAY['/outdoor-music-festival-stage-crowd.jpg', '/stageline-sl100-mobile-stage-concert-production.jpg'],
 'Two-day outdoor music festival featuring 15 local and regional bands across two stages.',
 'Deliver professional-grade sound and lighting for an outdoor festival serving 3,000+ attendees per day.',
 ARRAY['Line array PA system covering 2-acre field', '40ft x 30ft main stage with roof truss', 'Moving head lighting rig with 24 fixtures', 'Dual stage setup for continuous performances', 'Generator power distribution for all systems'],
 3000,
 'The sound quality was incredible for an outdoor event. Pavilion360 handled everything from stage to strike with total professionalism.',
 'Marcus Thompson',
 'Festival Director',
 false, 4),

('20010000-0000-0000-0000-000000000005',
 'lilly-endowment-town-hall',
 'Lilly Endowment Town Hall',
 (SELECT id FROM event_types WHERE slug = 'corporate'),
 'Lilly Corporate Center',
 '2024-09-20',
 '/corporate-town-hall-hybrid-event.jpg',
 ARRAY['/virtual-event-broadcast-setup.jpg', '/conference-hall-keynote-presentation.jpg', '/corporate-event-presentation-stage.jpg'],
 'Quarterly all-hands town hall meeting for 800 in-person employees and 1,200 remote participants.',
 'Create a seamless hybrid experience with live Q&A, polling, and high-quality video production.',
 ARRAY['Multi-camera production with graphics integration', 'Confidence monitors for executive presenters', 'Live audience polling and Q&A platform', 'Simulcast to 1,200 remote employees', 'Wireless lapel mics for 6 panelists'],
 800,
 'Our hybrid town halls have never been better. Pavilion360''s team makes it effortless and the production quality is broadcast-level.',
 'Jennifer Hayes',
 'VP of Communications, Lilly Endowment',
 false, 5);


-- ============================================================================
-- FAQs
-- ============================================================================

INSERT INTO faqs (id, category_id, question, answer, display_order, is_active) VALUES

('30010000-0000-0000-0000-000000000001',
 (SELECT id FROM faq_categories WHERE slug = 'general'),
 'How far in advance should I book Pavilion360?',
 'We recommend booking as early as possible, especially for peak wedding season (May-October) and major holidays. For full-service event planning, 6-12 months in advance is ideal. For rentals only, 4-8 weeks is typically sufficient, though popular items may book earlier.',
 1, true),

('30010000-0000-0000-0000-000000000002',
 (SELECT id FROM faq_categories WHERE slug = 'general'),
 'Do you travel outside of Indianapolis?',
 'Yes! While Indianapolis is our home base, we regularly work on events throughout Indiana and the Midwest. Travel fees may apply for events outside our local service area. Contact us for a custom quote.',
 2, true),

('30010000-0000-0000-0000-000000000003',
 (SELECT id FROM faq_categories WHERE slug = 'rentals'),
 'What is your rental delivery and pickup process?',
 'We deliver, set up, and retrieve all rental items. Delivery typically occurs the day before or morning of your event, and pickup happens the following day. Our team handles all the heavy lifting—you just enjoy your event!',
 3, true),

('30010000-0000-0000-0000-000000000004',
 (SELECT id FROM faq_categories WHERE slug = 'rentals'),
 'Can I see rental items in person before booking?',
 'We encourage you to visit our showroom to see furniture, bars, and other rental items. Schedule an appointment and our team will walk you through options that fit your vision and budget.',
 4, true),

('30010000-0000-0000-0000-000000000005',
 (SELECT id FROM faq_categories WHERE slug = 'rentals'),
 'What happens if a rental item is damaged during my event?',
 'Normal wear and tear is expected and included. However, clients are responsible for significant damage or loss. We recommend reviewing your event insurance or venue policy to ensure coverage. We''ll provide a damage waiver option at booking.',
 5, true),

('30010000-0000-0000-0000-000000000006',
 (SELECT id FROM faq_categories WHERE slug = 'services'),
 'What services are included in full-service event planning?',
 'Our full-service planning includes venue sourcing, vendor coordination, design consultation, budget management, timeline creation, and day-of coordination. We customize each package to your specific needs and event type.',
 6, true),

('30010000-0000-0000-0000-000000000007',
 (SELECT id FROM faq_categories WHERE slug = 'services'),
 'Do you provide event staff and crew?',
 'Yes! We provide experienced technical crew, event coordinators, bartenders, and support staff as needed. All staff are insured, background-checked, and trained professionals.',
 7, true),

('30010000-0000-0000-0000-000000000008',
 (SELECT id FROM faq_categories WHERE slug = 'services'),
 'Can you work with my existing vendors?',
 'Of course! We love collaborating with other talented professionals. Whether you already have a caterer, photographer, or florist, we''ll coordinate seamlessly to ensure everyone is on the same page.',
 8, true),

('30010000-0000-0000-0000-000000000009',
 (SELECT id FROM faq_categories WHERE slug = 'pricing'),
 'How is pricing determined for custom events?',
 'Pricing varies based on event type, guest count, services needed, and rental items. We provide detailed quotes after an initial consultation. Many services have package options, and we''re happy to create custom bundles that fit your budget.',
 9, true),

('30010000-0000-0000-0000-000000000010',
 (SELECT id FROM faq_categories WHERE slug = 'pricing'),
 'What payment methods do you accept?',
 'We accept checks, credit cards, and ACH transfers. A deposit (typically 25-50%) is required to reserve your date, with the balance due 1-2 weeks before the event. Payment schedules vary by service type.',
 10, true),

('30010000-0000-0000-0000-000000000011',
 (SELECT id FROM faq_categories WHERE slug = 'logistics'),
 'What is your cancellation policy?',
 'Cancellation policies vary by service. For rentals, cancellations made 30+ days in advance receive a full refund minus a processing fee. For planning services, deposits are non-refundable but may be applied to a future event within 12 months. Contact us for specific policy details.',
 11, true),

('30010000-0000-0000-0000-000000000012',
 (SELECT id FROM faq_categories WHERE slug = 'logistics'),
 'Do you provide certificates of insurance?',
 'Yes! We carry comprehensive general liability and equipment insurance. We can provide certificates of insurance to venues or clients upon request, typically within 24-48 hours.',
 12, true);


-- ============================================================================
-- TESTIMONIALS
-- ============================================================================

INSERT INTO testimonials (id, quote, author_name, author_role, company, is_featured, display_order) VALUES

('40010000-0000-0000-0000-000000000001',
 'Pavilion360 exceeded our expectations in every way. Their team was professional, creative, and made our corporate event truly memorable.',
 'Michael Chen',
 'Director of Marketing',
 'Salesforce',
 true, 1),

('40010000-0000-0000-0000-000000000002',
 'From planning to execution, Pavilion360 made our wedding day absolutely perfect. We couldn''t have asked for a better partner.',
 'Sarah & David Martinez',
 'Newlyweds',
 NULL,
 true, 2),

('40010000-0000-0000-0000-000000000003',
 'The technical expertise and attention to detail from Pavilion360 helped us raise record funds at our annual gala. Highly recommend!',
 'Rebecca Thompson',
 'Executive Director',
 'United Way of Central Indiana',
 true, 3),

('40010000-0000-0000-0000-000000000004',
 'Working with Pavilion360 felt like having an extension of our own team. They understood our vision and brought it to life flawlessly.',
 'James Rodriguez',
 'Event Manager',
 'Indiana Convention Center',
 true, 4);


-- ============================================================================
-- VENUES
-- ============================================================================

INSERT INTO venues (id, name, slug, location, city, thumbnail_url, description, capacity_min, capacity_max, is_managed, external_link, is_active, display_order) VALUES

('50010000-0000-0000-0000-000000000001',
 'The Pavilion at Pan Am',
 'pavilion-at-pan-am',
 '201 S Capitol Ave',
 'Indianapolis, IN',
 '/modern-event-venue-with-stage-lighting-and-audio-e.jpg',
 'A stunning glass pavilion in the heart of downtown Indianapolis, offering flexible event space with panoramic city views. Perfect for corporate events, galas, and weddings.',
 50, 300, true, 'https://pavilionatpanam.com', true, 1),

('50010000-0000-0000-0000-000000000002',
 'Indiana Roof Ballroom',
 'indiana-roof-ballroom',
 '140 W Washington St',
 'Indianapolis, IN',
 '/elegant-wedding-ballroom-uplighting.jpg',
 'Historic 1927 ballroom featuring ornate Spanish architecture, crystal chandeliers, and a spacious dance floor. Ideal for elegant galas, weddings, and large receptions.',
 200, 1000, false, 'https://indianaroof.com', true, 2),

('50010000-0000-0000-0000-000000000003',
 'White River State Park',
 'white-river-state-park',
 '801 W Washington St',
 'Indianapolis, IN',
 '/outdoor-festival-dual-stage-setup.jpg',
 'Downtown urban park with multiple outdoor venues including lawns, plazas, and amphitheaters. Perfect for festivals, outdoor concerts, and community gatherings.',
 100, 5000, false, 'https://whiteriverstateparks.org', true, 3),

('50010000-0000-0000-0000-000000000004',
 'The Crane Bay',
 'the-crane-bay',
 '635 Massachusetts Ave',
 'Indianapolis, IN',
 '/brand-activation-3d-display.jpg',
 'Industrial-chic venue in the Mass Ave Arts District with exposed brick, high ceilings, and modern amenities. Great for corporate events, product launches, and creative gatherings.',
 50, 250, true, 'https://cranebay.com', true, 4);


-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Run these to verify data was inserted correctly:

-- SELECT 'rental_items' as table_name, COUNT(*) as count FROM rental_items
-- UNION ALL SELECT 'portfolio_projects', COUNT(*) FROM portfolio_projects
-- UNION ALL SELECT 'faqs', COUNT(*) FROM faqs
-- UNION ALL SELECT 'testimonials', COUNT(*) FROM testimonials
-- UNION ALL SELECT 'venues', COUNT(*) FROM venues;

-- Expected results:
-- rental_items: 55+
-- portfolio_projects: 5
-- faqs: 12
-- testimonials: 4
-- venues: 4
