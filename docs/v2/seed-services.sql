-- ============================================================================
-- PAVILION360 V2.0 - SERVICES SEED DATA
-- ============================================================================
-- 
-- Execute this in Supabase SQL Editor after SCHEMA_V1.sql
-- Last Updated: December 19, 2024
-- 
-- ============================================================================

-- ============================================================================
-- SERVICES
-- ============================================================================

INSERT INTO services (id, name, slug, tagline, description, icon, thumbnail_url, what_we_do, gallery, display_order, is_active) VALUES

-- Service 1: Venue and Event Management
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Venue and Event Management',
  'venue-event-management',
  'Comprehensive Event Solutions',
  'From live events to virtual experiences, we provide full-service event management with safety planning, talent acquisition, and operations expertise.',
  'calendar',
  '/event-planning-management.jpg',
  ARRAY[
    'Live Events',
    'Virtual Events',
    'Hybrid Events & Live-stream Broadcasting',
    'Safety and Emergency Planning Operations',
    'Keynote Speaker Acquisition & Production',
    'Entertainment Talent Acquisition & Production',
    'Digital Marketing Campaigns',
    'Trade Show Planning',
    'Permanent Structure Management',
    'Ticketing Operations',
    'Event and Venue Traffic and Parking Planning'
  ],
  ARRAY['/event-management-team-coordination.jpg', '/trade-show-floor-management.jpg', '/virtual-event-broadcast-setup.jpg'],
  1,
  true
),

-- Service 2: Media and Creative Services
(
  'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  'Media and Creative Services',
  'media-creative-services',
  'Visionary Design & Digital Excellence',
  'Full-service creative team offering 3D modeling, motion graphics, brand messaging, and digital marketing for unforgettable event experiences.',
  'palette',
  '/creative-event-design.jpg',
  ARRAY[
    'Creative Team Management',
    'Marketing Communications & Brand Messaging',
    'Motion Graphics',
    '3D Modeling, Animation & Renderings',
    'Trade Show Exhibit Design & Development',
    'Event Game-ification & Game Design',
    'Website & Mobile App Development',
    'Social Media Content Curation',
    'Sponsorship Activation Plan',
    'Audience Acquisition Strategy',
    'User Experience Design & Journey',
    'Marketing Executive Planning & Management'
  ],
  ARRAY['/motion-graphics-animation-production.jpg', '/3d-modeling-event-rendering.jpg', '/social-media-content-design.jpg'],
  2,
  true
),

-- Service 3: Audio Visual and Rentals
(
  'c3d4e5f6-a7b8-9012-cdef-123456789012',
  'Audio Visual and Rentals',
  'audio-visual-rentals',
  'World-Class Production Technology',
  'State-of-the-art audio, video, lighting systems with staging, trussing, and event furniture rentals for spectacular productions.',
  'speaker',
  '/audio-visual-production.jpg',
  ARRAY[
    'World-Class Audio, Video, and Lighting Systems',
    'Staging',
    'Video Production',
    'Projection-Mapping',
    'Animation Production',
    'Truss',
    'Live Event Design',
    'Virtual Reality Production',
    'Touch Experiences for Monitors, Walls and Tables',
    'Hologram Content Creation',
    'Event Furniture and Decor Rentals'
  ],
  ARRAY['/concert-stage-lighting-production.jpg', '/building-projection-mapping-show.jpg', '/virtual-reality-interactive-display.jpg'],
  3,
  true
),

-- Service 4: Food and Beverage
(
  'd4e5f6a7-b8c9-0123-defa-234567890123',
  'Food and Beverage',
  'food-beverage',
  'Culinary Excellence for Every Event',
  'Full-service bar operations, custom food menus, and flexible serving options tailored to your event''s traffic flow and style.',
  'utensils',
  '/beverage-services-bar-setup.jpg',
  ARRAY[
    'Concessions',
    'Full Service Bar Operations',
    'Custom Food Menus',
    'Plated, Passed and Buffet Style Serving Structures',
    'Custom food and beverage programs for your attendance that best accommodates the traffic flow throughout your show'
  ],
  ARRAY['/catering-coordination-food-service.jpg', '/beverage-services-bar-setup.jpg'],
  4,
  true
),

-- Service 5: Event Planning & Management
(
  'e5f6a7b8-c9d0-1234-efab-345678901234',
  'Event Planning & Management',
  'event-planning-management',
  'From Vision to Reality',
  'Comprehensive event planning services that transform your ideas into flawlessly executed experiences.',
  'calendar',
  '/event-planning-management.jpg',
  ARRAY[
    'Full-service event design and conceptualization',
    'Vendor coordination and management',
    'Timeline development and execution',
    'Budget planning and tracking',
    'Day-of event coordination',
    'Post-event wrap-up and reporting'
  ],
  ARRAY['/corporate-conference-hall.jpg', '/elegant-wedding-reception-setup.jpg', '/museum-gala-fundraising-event.jpg'],
  5,
  true
),

-- Service 6: Audio Visual Production
(
  'f6a7b8c9-d0e1-2345-fabc-456789012345',
  'Audio Visual Production',
  'audio-visual-production',
  'Sound & Vision Excellence',
  'Professional audio, video, and lighting solutions that elevate every moment of your event.',
  'speaker',
  '/audio-visual-production.jpg',
  ARRAY[
    'High-fidelity sound system design and operation',
    'Projection and LED video walls',
    'Broadcast-quality camera production',
    'Architectural and stage lighting design',
    'Live streaming and recording',
    'Technical crew and engineers'
  ],
  ARRAY['/large-outdoor-concert-sound-system.jpg', '/tech-conference-stage-led-screens.jpg', '/professional-event-production-team-setup.jpg'],
  6,
  true
),

-- Service 7: Event Production & Technical Direction
(
  'a7b8c9d0-e1f2-3456-abcd-567890123456',
  'Event Production & Technical Direction',
  'event-production-technical-direction',
  'Seamless Execution',
  'Expert technical directors and production managers who ensure every detail runs flawlessly.',
  'clipboard',
  '/event-production-technical-direction.jpg',
  ARRAY[
    'Technical direction and show calling',
    'Production management and oversight',
    'Crew coordination and scheduling',
    'Run-of-show documentation',
    'Rehearsal and pre-production planning',
    'Post-event strike management'
  ],
  ARRAY['/professional-event-production-team-setup.jpg', '/corporate-town-hall-hybrid-event.jpg'],
  7,
  true
),

-- Service 8: Creative Design
(
  'b8c9d0e1-f2a3-4567-bcde-678901234567',
  'Creative Design',
  'creative-design',
  'Visionary Aesthetics',
  'Innovative design services that create immersive environments and memorable brand experiences.',
  'palette',
  '/creative-event-design.jpg',
  ARRAY[
    'Event branding and identity',
    'Environmental design and décor',
    'Scenic and stage design',
    'Graphic design for signage and collateral',
    'Floral design consultation',
    '3D renderings and mockups'
  ],
  ARRAY['/modern-trade-show-booth-design.jpg', '/brand-activation-3d-display.jpg', '/3d-modeling-event-rendering.jpg'],
  8,
  true
),

-- Service 9: Furniture & Decor Rentals
(
  'c9d0e1f2-a3b4-5678-cdef-789012345678',
  'Furniture & Decor Rentals',
  'furniture-decor-rentals',
  'Comfort Meets Style',
  'Curated furniture collections that create inviting lounge spaces and elegant event setups.',
  'sofa',
  '/furniture-soft-seating-lounge.jpg',
  ARRAY[
    'Modern lounge furniture collections',
    'Chiavari and specialty chairs',
    'Farm tables and specialty dining tables',
    'Illuminated bars and pedestals',
    'Room dividers and pipe & drape',
    'Delivery, setup, and retrieval'
  ],
  ARRAY['/ivory-velvet-sofa-elegant-event-seating.jpg', '/gold-chiavari-chair.jpg', '/elegant-gold-chrome-bar-back-shelving-display.jpg'],
  9,
  true
);


-- ============================================================================
-- SERVICE USE CASES
-- ============================================================================

-- Venue and Event Management Use Cases
INSERT INTO service_use_cases (service_id, title, description, image_url, display_order) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Multi-Day Conferences', 'Complete event management including keynote coordination, breakout sessions, and hybrid streaming capabilities.', '/conference-hall-keynote-presentation.jpg', 1),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Music Festivals', 'Full festival production with ticketing, traffic planning, safety operations, and talent management.', '/outdoor-music-festival-stage-crowd.jpg', 2),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Corporate Events', 'Live and virtual event production for product launches, town halls, and company gatherings.', '/corporate-event-presentation-stage.jpg', 3);

-- Media and Creative Services Use Cases
INSERT INTO service_use_cases (service_id, title, description, image_url, display_order) VALUES
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Brand Activations', 'Immersive brand experiences with custom 3D renderings, interactive games, and social media integration.', '/brand-activation-3d-display.jpg', 1),
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Trade Show Exhibits', 'Eye-catching booth design with motion graphics, interactive displays, and sponsor activation.', '/modern-trade-show-booth-design.jpg', 2),
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Digital Campaigns', 'End-to-end digital marketing including websites, apps, social content, and audience acquisition strategies.', '/digital-marketing-campaign-graphics.jpg', 3);

-- Audio Visual and Rentals Use Cases
INSERT INTO service_use_cases (service_id, title, description, image_url, display_order) VALUES
('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Concert Productions', 'Full production with professional audio systems, intelligent lighting, video walls, and staging infrastructure.', '/concert-stage-lighting-production.jpg', 1),
('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Projection Mapping', 'Stunning architectural projection mapping with animation and hologram content for immersive experiences.', '/building-projection-mapping-show.jpg', 2),
('c3d4e5f6-a7b8-9012-cdef-123456789012', 'VR Experiences', 'Virtual reality production with touch-screen walls, interactive displays, and cutting-edge technology.', '/virtual-reality-interactive-display.jpg', 3);

-- Event Planning & Management Use Cases
INSERT INTO service_use_cases (service_id, title, description, image_url, display_order) VALUES
('e5f6a7b8-c9d0-1234-efab-345678901234', 'Corporate Conferences', 'Multi-day conferences with breakout sessions, keynote presentations, and networking events.', '/corporate-conference-hall.jpg', 1),
('e5f6a7b8-c9d0-1234-efab-345678901234', 'Fundraising Galas', 'Elegant nonprofit galas with silent auctions, dinner service, and entertainment.', '/museum-gala-fundraising-event.jpg', 2),
('e5f6a7b8-c9d0-1234-efab-345678901234', 'Wedding Receptions', 'Seamless coordination of ceremony, cocktail hour, dinner, and dancing.', '/elegant-wedding-reception-setup.jpg', 3);

-- Audio Visual Production Use Cases
INSERT INTO service_use_cases (service_id, title, description, image_url, display_order) VALUES
('f6a7b8c9-d0e1-2345-fabc-456789012345', 'Keynote Presentations', 'Crystal-clear audio, confidence monitors, and high-brightness projection for impactful presentations.', '/tech-conference-stage-led-screens.jpg', 1),
('f6a7b8c9-d0e1-2345-fabc-456789012345', 'Live Music Events', 'Professional-grade sound reinforcement and stage lighting for concerts and performances.', '/large-outdoor-concert-sound-system.jpg', 2),
('f6a7b8c9-d0e1-2345-fabc-456789012345', 'Award Ceremonies', 'Multi-camera production, video playback, and dramatic lighting for memorable moments.', '/elegant-event-venue-space.jpg', 3);


-- ============================================================================
-- SERVICE PROCESS STEPS
-- ============================================================================

-- Venue and Event Management Process
INSERT INTO service_process_steps (service_id, step_number, title, description) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 1, 'Event Strategy', 'We develop a comprehensive event plan tailored to your goals, audience, and format (live, virtual, or hybrid).'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 2, 'Talent & Logistics', 'Secure keynote speakers, entertainment, and manage all operational logistics including ticketing and parking.'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 3, 'Safety Planning', 'Implement safety protocols, emergency planning, and crowd management strategies.'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 4, 'Execution & Operations', 'Manage all aspects of event day operations with our experienced production team.');

-- Media and Creative Services Process
INSERT INTO service_process_steps (service_id, step_number, title, description) VALUES
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 1, 'Creative Discovery', 'Understand your brand, messaging goals, and target audience through comprehensive creative briefing.'),
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 2, 'Concept Development', 'Develop 3D renderings, motion graphics, and UX designs with mood boards and mockups.'),
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 3, 'Content Production', 'Create all digital assets including animations, social content, and interactive experiences.'),
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 4, 'Campaign Execution', 'Launch and manage digital campaigns with real-time optimization and analytics.');

-- Audio Visual and Rentals Process
INSERT INTO service_process_steps (service_id, step_number, title, description) VALUES
('c3d4e5f6-a7b8-9012-cdef-123456789012', 1, 'Technical Design', 'Our engineers design custom AV systems with staging, truss rigging, and video integration plans.'),
('c3d4e5f6-a7b8-9012-cdef-123456789012', 2, 'Equipment Selection', 'Choose from our world-class inventory of audio, video, lighting, and event furniture rentals.'),
('c3d4e5f6-a7b8-9012-cdef-123456789012', 3, 'Installation & Programming', 'Professional installation with system programming, projection mapping, and content creation.'),
('c3d4e5f6-a7b8-9012-cdef-123456789012', 4, 'Live Operation', 'Experienced technicians operate all systems throughout your event with real-time support.');

-- Event Planning & Management Process
INSERT INTO service_process_steps (service_id, step_number, title, description) VALUES
('e5f6a7b8-c9d0-1234-efab-345678901234', 1, 'Discovery & Vision', 'We meet with you to understand your goals, audience, and budget.'),
('e5f6a7b8-c9d0-1234-efab-345678901234', 2, 'Concept Development', 'Our team creates a detailed event plan with timelines and vendor recommendations.'),
('e5f6a7b8-c9d0-1234-efab-345678901234', 3, 'Vendor Coordination', 'We manage all vendor relationships, contracts, and logistics.'),
('e5f6a7b8-c9d0-1234-efab-345678901234', 4, 'Execution & Oversight', 'On event day, we manage setup, run-of-show, and teardown seamlessly.');

-- Audio Visual Production Process
INSERT INTO service_process_steps (service_id, step_number, title, description) VALUES
('f6a7b8c9-d0e1-2345-fabc-456789012345', 1, 'Site Survey', 'We visit your venue to assess acoustics, power, and technical requirements.'),
('f6a7b8c9-d0e1-2345-fabc-456789012345', 2, 'System Design', 'Our engineers create a custom AV design tailored to your event needs.'),
('f6a7b8c9-d0e1-2345-fabc-456789012345', 3, 'Installation & Testing', 'Equipment is installed, tested, and optimized before your event begins.'),
('f6a7b8c9-d0e1-2345-fabc-456789012345', 4, 'Live Operation', 'Experienced technicians operate all systems throughout your event.');

-- Event Production & Technical Direction Process
INSERT INTO service_process_steps (service_id, step_number, title, description) VALUES
('a7b8c9d0-e1f2-3456-abcd-567890123456', 1, 'Pre-Production', 'Detailed planning meetings, script review, and technical rider creation.'),
('a7b8c9d0-e1f2-3456-abcd-567890123456', 2, 'Rehearsals', 'Technical and dress rehearsals to refine timing and troubleshoot issues.'),
('a7b8c9d0-e1f2-3456-abcd-567890123456', 3, 'Show Call', 'Our technical director calls all cues and coordinates crew in real-time.'),
('a7b8c9d0-e1f2-3456-abcd-567890123456', 4, 'Strike & Debrief', 'Efficient teardown and post-event debrief with stakeholders.');

-- Creative Design Process
INSERT INTO service_process_steps (service_id, step_number, title, description) VALUES
('b8c9d0e1-f2a3-4567-bcde-678901234567', 1, 'Creative Brief', 'We gather inspiration, brand guidelines, and design objectives.'),
('b8c9d0e1-f2a3-4567-bcde-678901234567', 2, 'Concept Presentation', 'Mood boards, sketches, and 3D renderings bring the vision to life.'),
('b8c9d0e1-f2a3-4567-bcde-678901234567', 3, 'Design Development', 'Refining details, selecting materials, and finalizing specifications.'),
('b8c9d0e1-f2a3-4567-bcde-678901234567', 4, 'Installation', 'Our team brings the design to life with precision and care.');

-- Furniture & Decor Rentals Process
INSERT INTO service_process_steps (service_id, step_number, title, description) VALUES
('c9d0e1f2-a3b4-5678-cdef-789012345678', 1, 'Browse Inventory', 'Explore our catalog featuring Mondrian, Colette, and Kincaid collections.'),
('c9d0e1f2-a3b4-5678-cdef-789012345678', 2, 'Design Consultation', 'Our team helps you select pieces that match your aesthetic and layout.'),
('c9d0e1f2-a3b4-5678-cdef-789012345678', 3, 'Delivery & Setup', 'Furniture arrives clean, inspected, and is set up according to your floorplan.'),
('c9d0e1f2-a3b4-5678-cdef-789012345678', 4, 'Retrieval', 'After your event, we handle all teardown and removal.');


-- ============================================================================
-- SERVICE PACKAGES (for Event Planning & Management)
-- ============================================================================

INSERT INTO service_packages (service_id, name, description, starting_price, features, display_order) VALUES
('e5f6a7b8-c9d0-1234-efab-345678901234', 'Essential Planning', 'Core planning services with vendor coordination and day-of management.', '$2,500', 
  ARRAY['Initial consultation and concept development', 'Vendor recommendations and coordination', 'Timeline creation', '8 hours day-of coordination'], 1),
('e5f6a7b8-c9d0-1234-efab-345678901234', 'Full-Service Planning', 'Comprehensive planning from start to finish with unlimited support.', '$5,000', 
  ARRAY['Everything in Essential Planning', 'Unlimited planning meetings', 'Budget management and tracking', 'Venue sourcing', 'Design and décor consultation', 'Full day-of team (2-3 coordinators)'], 2);


-- ============================================================================
-- VERIFICATION QUERY
-- ============================================================================
-- Run this to verify the data was inserted correctly:
-- SELECT s.name, s.slug, COUNT(suc.id) as use_cases, COUNT(sps.id) as process_steps
-- FROM services s
-- LEFT JOIN service_use_cases suc ON s.id = suc.service_id
-- LEFT JOIN service_process_steps sps ON s.id = sps.service_id
-- GROUP BY s.id, s.name, s.slug
-- ORDER BY s.display_order;
