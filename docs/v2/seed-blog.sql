-- ============================================================================
-- PAVILION360 V2.0 - BLOG SEED DATA
-- ============================================================================
-- 
-- Execute AFTER schema is created and blog_categories are seeded
-- Run in Supabase SQL Editor
-- 
-- ============================================================================
-- ============================================================================
-- HELPER FUNCTION
-- ============================================================================
CREATE OR REPLACE FUNCTION get_blog_category_id(cat_slug TEXT)
RETURNS UUID AS $$
DECLARE
    cat_id UUID;
BEGIN
    SELECT id INTO cat_id FROM blog_categories WHERE slug = cat_slug LIMIT 1;
    RETURN cat_id;
END;
$$ LANGUAGE plpgsql;
-- ============================================================================
-- BLOG POSTS
-- ============================================================================
INSERT INTO blog_posts (
    title,
    slug,
    excerpt,
    content,
    thumbnail_url,
    category_id,
    author_name,
    read_time_minutes,
    published_at,
    is_published,
    is_featured,
    seo_title,
    seo_description
) VALUES
-- Post 1: AV Equipment Guide
(
    'How to Choose the Right AV Equipment for Your Corporate Event',
    'choose-av-equipment-corporate-event',
    'Learn which audio, video, and lighting gear makes the biggest impact for different event types.',
    '{
        "type": "doc",
        "content": [
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "When planning a corporate event, choosing the right audio-visual equipment can make or break the experience for your attendees. From crystal-clear presentations to immersive lighting, every technical element contributes to the overall impression your event makes."}]
            },
            {
                "type": "heading",
                "attrs": {"level": 2},
                "content": [{"type": "text", "text": "Understanding Your Event''s AV Needs"}]
            },
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "The first step is understanding what type of event you''re hosting. A small boardroom presentation has vastly different requirements than a 500-person conference. Consider your venue size, audience count, and the nature of your content."}]
            },
            {
                "type": "heading",
                "attrs": {"level": 2},
                "content": [{"type": "text", "text": "Key Audio Considerations"}]
            },
            {
                "type": "bulletList",
                "content": [
                    {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Wireless microphone systems for presenters"}]}]},
                    {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Line array speakers for large venues"}]}]},
                    {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Audio distribution for breakout rooms"}]}]}
                ]
            },
            {
                "type": "heading",
                "attrs": {"level": 2},
                "content": [{"type": "text", "text": "Video Display Options"}]
            },
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "LED video walls offer stunning visuals and can be configured to fit any stage design. For smaller events, high-lumen projectors paired with quality screens provide excellent value."}]
            },
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "Contact Pavilion360 to discuss your specific AV requirements and get a customized equipment recommendation for your next corporate event."}]
            }
        ]
    }',
    '/modern-event-venue-with-stage-lighting-and-audio-e.jpg',
    get_blog_category_id('event-technology'),
    'Pavilion360 Team',
    5,
    '2024-03-15 10:00:00+00',
    true,
    true,
    'How to Choose AV Equipment for Corporate Events | Pavilion360',
    'Expert guide on selecting the right audio, video, and lighting equipment for your corporate event. Learn from Indianapolis event production specialists.'
),
-- Post 2: Event Trends 2024
(
    'Top 5 Event Trends for 2024',
    'top-event-trends-2024',
    'From immersive experiences to hybrid formats, discover what''s shaping events this year.',
    '{
        "type": "doc",
        "content": [
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "The events industry continues to evolve at a rapid pace. As we move through 2024, several key trends are reshaping how we design, produce, and experience events. Here are the top five trends every event professional should know."}]
            },
            {
                "type": "heading",
                "attrs": {"level": 2},
                "content": [{"type": "text", "text": "1. Immersive Experiences"}]
            },
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "Attendees want more than passive observation—they crave interaction. From 360-degree projection mapping to interactive installations, immersive elements are becoming standard expectations."}]
            },
            {
                "type": "heading",
                "attrs": {"level": 2},
                "content": [{"type": "text", "text": "2. Sustainable Event Production"}]
            },
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "Environmental consciousness is driving decisions. LED lighting (more energy-efficient), reusable décor, and carbon-offset programs are increasingly requested by clients."}]
            },
            {
                "type": "heading",
                "attrs": {"level": 2},
                "content": [{"type": "text", "text": "3. Hybrid Events Are Here to Stay"}]
            },
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "The pandemic accelerated hybrid adoption, and it''s not going away. Smart event producers are designing experiences that work equally well for in-person and virtual attendees."}]
            },
            {
                "type": "heading",
                "attrs": {"level": 2},
                "content": [{"type": "text", "text": "4. Personalization at Scale"}]
            },
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "Technology enables personalized experiences for thousands of attendees. Custom agendas, targeted networking, and individualized content recommendations enhance engagement."}]
            },
            {
                "type": "heading",
                "attrs": {"level": 2},
                "content": [{"type": "text", "text": "5. Wellness-Focused Design"}]
            },
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "Event spaces now incorporate wellness zones, natural lighting considerations, and healthier catering options. Attendee wellbeing is a priority."}]
            }
        ]
    }',
    '/professional-event-services-production.jpg',
    get_blog_category_id('industry-trends'),
    'Pavilion360 Team',
    4,
    '2024-02-20 10:00:00+00',
    true,
    true,
    'Top 5 Event Trends 2024 | Pavilion360 Indianapolis',
    'Discover the biggest event industry trends for 2024: immersive experiences, sustainability, hybrid formats, personalization, and wellness-focused design.'
),
-- Post 3: Wedding at The Pavilion
(
    'Planning a Wedding at The Pavilion: What to Know',
    'wedding-planning-pavilion-guide',
    'A comprehensive guide to hosting your dream wedding at our flagship venue.',
    '{
        "type": "doc",
        "content": [
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "The Pavilion at Pan Am is one of Indianapolis'' most sought-after wedding venues. With stunning views of downtown, flexible indoor-outdoor spaces, and full-service event support, it''s the perfect canvas for your special day."}]
            },
            {
                "type": "heading",
                "attrs": {"level": 2},
                "content": [{"type": "text", "text": "Venue Capacity and Layouts"}]
            },
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "The Pavilion accommodates weddings from 50 to 300 guests. Our versatile space can be configured for intimate ceremonies, grand receptions, or both in a single venue."}]
            },
            {
                "type": "heading",
                "attrs": {"level": 2},
                "content": [{"type": "text", "text": "What''s Included"}]
            },
            {
                "type": "bulletList",
                "content": [
                    {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Tables, chairs, and linens for your guest count"}]}]},
                    {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "On-site event coordinator"}]}]},
                    {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Ceremony and reception setup/breakdown"}]}]},
                    {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Complimentary parking for guests"}]}]}
                ]
            },
            {
                "type": "heading",
                "attrs": {"level": 2},
                "content": [{"type": "text", "text": "Recommended Vendors"}]
            },
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "We work with Indianapolis'' finest caterers, florists, and photographers. Our team can provide personalized recommendations based on your style and budget."}]
            },
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "Schedule a tour to see The Pavilion in person and start planning your dream wedding."}]
            }
        ]
    }',
    '/elegant-event-venue-space.jpg',
    get_blog_category_id('weddings'),
    'Pavilion360 Team',
    7,
    '2024-01-10 10:00:00+00',
    true,
    false,
    'Wedding Planning at The Pavilion Indianapolis | Pavilion360',
    'Complete guide to hosting your wedding at The Pavilion at Pan Am in Indianapolis. Venue capacity, inclusions, packages, and planning tips.'
),
-- Post 4: Festival Setup Behind the Scenes
(
    'Behind the Scenes: Setting Up a Large-Scale Festival',
    'behind-scenes-festival-setup',
    'Take a look at the planning, logistics, and execution that goes into producing a multi-day festival.',
    '{
        "type": "doc",
        "content": [
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "Producing a multi-day festival is one of the most complex undertakings in event production. From site surveys months in advance to the final strike, here''s what goes on behind the scenes."}]
            },
            {
                "type": "heading",
                "attrs": {"level": 2},
                "content": [{"type": "text", "text": "Pre-Production (6-12 Months Out)"}]
            },
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "Site selection, permit applications, talent booking, and vendor contracting happen months before the first stage is built. Our team creates detailed CAD drawings and production schedules."}]
            },
            {
                "type": "heading",
                "attrs": {"level": 2},
                "content": [{"type": "text", "text": "Load-In Week"}]
            },
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "Multiple semi-trucks arrive with staging, trussing, audio, lighting, and generators. Crews work around the clock to transform an open field into a concert venue."}]
            },
            {
                "type": "heading",
                "attrs": {"level": 2},
                "content": [{"type": "text", "text": "Show Days"}]
            },
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "A command center coordinates all operations: stage management, artist relations, security, medical, and guest services. Every crew member has a radio and knows their role."}]
            },
            {
                "type": "heading",
                "attrs": {"level": 2},
                "content": [{"type": "text", "text": "Strike and Wrap"}]
            },
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "After the last note plays, breakdown begins immediately. The goal is to leave the site better than we found it. Debriefs help us improve for next year."}]
            }
        ]
    }',
    '/outdoor-music-festival-stage-crowd.jpg',
    get_blog_category_id('event-production'),
    'Pavilion360 Team',
    6,
    '2023-12-05 10:00:00+00',
    true,
    false,
    'Behind the Scenes: Festival Production | Pavilion360',
    'Go behind the scenes of large-scale festival production. Learn about the planning, logistics, load-in, show management, and strike process.'
),
-- Post 5: Lighting Design
(
    'The Importance of Lighting Design in Events',
    'importance-lighting-design',
    'Discover how strategic lighting transforms atmosphere and enhances your event experience.',
    '{
        "type": "doc",
        "content": [
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "Lighting is often called the unsung hero of event production. While guests may not consciously notice great lighting, they absolutely feel its impact. Here''s why lighting design matters."}]
            },
            {
                "type": "heading",
                "attrs": {"level": 2},
                "content": [{"type": "text", "text": "Setting the Mood"}]
            },
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "Warm amber uplighting creates intimacy for a dinner gala. Cool blue washes energize a product launch. Color temperature and intensity guide emotional responses."}]
            },
            {
                "type": "heading",
                "attrs": {"level": 2},
                "content": [{"type": "text", "text": "Directing Attention"}]
            },
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "Strategic lighting draws eyes to stages, signage, and focal points. Proper key lighting ensures presenters look professional on camera and to live audiences."}]
            },
            {
                "type": "heading",
                "attrs": {"level": 2},
                "content": [{"type": "text", "text": "Types of Event Lighting"}]
            },
            {
                "type": "bulletList",
                "content": [
                    {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Uplighting: Washes walls and columns with color"}]}]},
                    {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Gobo projection: Custom patterns and logos"}]}]},
                    {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Moving heads: Dynamic effects for entertainment"}]}]},
                    {"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Pin spots: Highlight centerpieces and décor"}]}]}
                ]
            },
            {
                "type": "paragraph",
                "content": [{"type": "text", "text": "Think of lighting as an investment in perception. Great lighting doesn''t just illuminate—it transforms."}]
            }
        ]
    }',
    '/event-equipment-rentals.jpg',
    get_blog_category_id('event-technology'),
    'Pavilion360 Team',
    5,
    '2023-11-18 10:00:00+00',
    true,
    false,
    'Event Lighting Design Guide | Pavilion360 Indianapolis',
    'Learn how strategic lighting design transforms events. Explore uplighting, gobo projection, moving heads, and professional lighting techniques.'
);
-- ============================================================================
-- CLEANUP
-- ============================================================================
DROP FUNCTION IF EXISTS get_blog_category_id(TEXT);
-- ============================================================================
-- VERIFICATION
-- ============================================================================
SELECT 
    bp.title,
    bc.name as category,
    bp.is_published,
    bp.published_at
FROM blog_posts bp
LEFT JOIN blog_categories bc ON bp.category_id = bc.id
ORDER BY bp.published_at DESC;