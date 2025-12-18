-- ============================================================================
-- PAVILION360 V2.0 - DATABASE SCHEMA V1.0
-- ============================================================================
-- 
-- Execute this schema in Supabase SQL Editor
-- Last Updated: December 18, 2024
-- 
-- IMPORTANT: Run this in order - dependencies exist between tables
-- ============================================================================

-- ============================================================================
-- EXTENSIONS
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search

-- ============================================================================
-- CUSTOM TYPES (ENUMS)
-- ============================================================================

-- Inquiry/Quote Status
CREATE TYPE inquiry_status AS ENUM ('new', 'reviewed', 'contacted', 'closed', 'spam');

-- Quote Request Status  
CREATE TYPE quote_status AS ENUM ('new', 'reviewed', 'quoted', 'accepted', 'declined', 'expired');

-- ============================================================================
-- SUPPORTING TABLES (Create First - Referenced by Others)
-- ============================================================================

-- -----------------------------------------------------------------------------
-- Event Types (Lookup Table)
-- -----------------------------------------------------------------------------
CREATE TABLE event_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial event types
INSERT INTO event_types (name, slug, display_order) VALUES
    ('Corporate', 'corporate', 1),
    ('Wedding', 'wedding', 2),
    ('Gala', 'gala', 3),
    ('Festival', 'festival', 4),
    ('Concert', 'concert', 5),
    ('Social', 'social', 6),
    ('Nonprofit', 'nonprofit', 7),
    ('Trade Show', 'trade-show', 8),
    ('Outdoor', 'outdoor', 9),
    ('Family', 'family', 10),
    ('VIP', 'vip', 11),
    ('Club', 'club', 12),
    ('Red Carpet', 'red-carpet', 13),
    ('BBQ', 'bbq', 14),
    ('Catering', 'catering', 15);

-- -----------------------------------------------------------------------------
-- Tags (Global Tagging System)
-- -----------------------------------------------------------------------------
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- Rental Categories
-- -----------------------------------------------------------------------------
CREATE TABLE rental_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    thumbnail_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial rental categories
INSERT INTO rental_categories (name, slug, display_order) VALUES
    ('Lounge Furniture', 'lounge-furniture', 1),
    ('Bars & Shelves', 'bars-shelves', 2),
    ('Tables', 'tables', 3),
    ('Seating', 'seating', 4),
    ('Room Dividers', 'room-dividers', 5),
    ('Pipe & Drape', 'pipe-drape', 6),
    ('Flooring', 'flooring', 7),
    ('Decks And Foundations', 'decks-foundations', 8),
    ('Stageline Stages', 'stageline-stages', 9),
    ('Trussing', 'trussing', 10),
    ('Crowd Control', 'crowd-control', 11),
    ('Audio Visual', 'audio-visual', 12),
    ('Special Effects', 'special-effects', 13),
    ('Live Entertainment', 'live-entertainment', 14),
    ('Food & Beverage', 'food-beverage', 15);

-- -----------------------------------------------------------------------------
-- FAQ Categories
-- -----------------------------------------------------------------------------
CREATE TABLE faq_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial FAQ categories
INSERT INTO faq_categories (name, slug, display_order) VALUES
    ('General', 'general', 1),
    ('Rentals', 'rentals', 2),
    ('Services', 'services', 3),
    ('Pricing', 'pricing', 4),
    ('Logistics', 'logistics', 5);

-- -----------------------------------------------------------------------------
-- Blog Categories
-- -----------------------------------------------------------------------------
CREATE TABLE blog_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial blog categories
INSERT INTO blog_categories (name, slug, display_order) VALUES
    ('Event Technology', 'event-technology', 1),
    ('Industry Trends', 'industry-trends', 2),
    ('Weddings', 'weddings', 3),
    ('Event Production', 'event-production', 4),
    ('Tips & Guides', 'tips-guides', 5);

-- ============================================================================
-- CORE CONTENT TABLES
-- ============================================================================

-- -----------------------------------------------------------------------------
-- Services
-- -----------------------------------------------------------------------------
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    tagline VARCHAR(500),
    description TEXT NOT NULL,
    icon VARCHAR(50) NOT NULL DEFAULT 'calendar',
    thumbnail_url TEXT,
    what_we_do TEXT[] DEFAULT '{}',
    gallery TEXT[] DEFAULT '{}',
    seo_title VARCHAR(255),
    seo_description TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- -----------------------------------------------------------------------------
-- Service Use Cases
-- -----------------------------------------------------------------------------
CREATE TABLE service_use_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- Service Process Steps
-- -----------------------------------------------------------------------------
CREATE TABLE service_process_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    step_number INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- Service Packages
-- -----------------------------------------------------------------------------
CREATE TABLE service_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    starting_price VARCHAR(50),
    features TEXT[] DEFAULT '{}',
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- Related Services (Self-referencing Many-to-Many)
-- -----------------------------------------------------------------------------
CREATE TABLE related_services (
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    related_service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    PRIMARY KEY (service_id, related_service_id),
    CHECK (service_id != related_service_id)
);

-- -----------------------------------------------------------------------------
-- Rental Items
-- -----------------------------------------------------------------------------
CREATE TABLE rental_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    sku VARCHAR(50) UNIQUE,
    category_id UUID NOT NULL REFERENCES rental_categories(id),
    subcategory VARCHAR(100),
    thumbnail_url TEXT,
    images TEXT[] DEFAULT '{}',
    short_description TEXT,
    details TEXT,
    specs JSONB DEFAULT '[]', -- Array of spec strings
    is_popular BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- -----------------------------------------------------------------------------
-- Rental Item Event Types (Junction Table)
-- -----------------------------------------------------------------------------
CREATE TABLE rental_item_event_types (
    rental_item_id UUID NOT NULL REFERENCES rental_items(id) ON DELETE CASCADE,
    event_type_id UUID NOT NULL REFERENCES event_types(id) ON DELETE CASCADE,
    PRIMARY KEY (rental_item_id, event_type_id)
);

-- -----------------------------------------------------------------------------
-- Rental Item Tags (Junction Table)
-- -----------------------------------------------------------------------------
CREATE TABLE rental_item_tags (
    rental_item_id UUID NOT NULL REFERENCES rental_items(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (rental_item_id, tag_id)
);

-- -----------------------------------------------------------------------------
-- Portfolio Projects
-- -----------------------------------------------------------------------------
CREATE TABLE portfolio_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    event_type_id UUID REFERENCES event_types(id),
    venue VARCHAR(255),
    event_date DATE,
    thumbnail_url TEXT,
    gallery TEXT[] DEFAULT '{}',
    description TEXT NOT NULL,
    goals TEXT,
    technical_highlights TEXT[] DEFAULT '{}',
    attendee_count INTEGER,
    client_quote_text TEXT,
    client_quote_author VARCHAR(255),
    client_quote_role VARCHAR(255),
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- -----------------------------------------------------------------------------
-- Portfolio Project Services (Junction Table)
-- -----------------------------------------------------------------------------
CREATE TABLE portfolio_project_services (
    portfolio_project_id UUID NOT NULL REFERENCES portfolio_projects(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    PRIMARY KEY (portfolio_project_id, service_id)
);

-- -----------------------------------------------------------------------------
-- Venues
-- -----------------------------------------------------------------------------
CREATE TABLE venues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    location VARCHAR(255),
    city VARCHAR(100),
    thumbnail_url TEXT,
    description TEXT,
    capacity_min INTEGER,
    capacity_max INTEGER,
    is_managed BOOLEAN DEFAULT false,
    external_link TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- -----------------------------------------------------------------------------
-- Venue Event Types (Junction Table)
-- -----------------------------------------------------------------------------
CREATE TABLE venue_event_types (
    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    event_type_id UUID NOT NULL REFERENCES event_types(id) ON DELETE CASCADE,
    PRIMARY KEY (venue_id, event_type_id)
);

-- -----------------------------------------------------------------------------
-- Team Members
-- -----------------------------------------------------------------------------
CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    bio TEXT,
    image_url TEXT,
    email VARCHAR(255),
    linkedin_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- -----------------------------------------------------------------------------
-- Testimonials
-- -----------------------------------------------------------------------------
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote TEXT NOT NULL,
    author_name VARCHAR(255) NOT NULL,
    author_role VARCHAR(255),
    company VARCHAR(255),
    author_image_url TEXT,
    portfolio_project_id UUID REFERENCES portfolio_projects(id) ON DELETE SET NULL,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- -----------------------------------------------------------------------------
-- FAQs
-- -----------------------------------------------------------------------------
CREATE TABLE faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category_id UUID NOT NULL REFERENCES faq_categories(id),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- -----------------------------------------------------------------------------
-- Blog Posts
-- -----------------------------------------------------------------------------
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content JSONB NOT NULL DEFAULT '{}', -- TipTap JSON content
    thumbnail_url TEXT,
    category_id UUID REFERENCES blog_categories(id),
    author_name VARCHAR(255) DEFAULT 'Pavilion360 Team',
    read_time_minutes INTEGER,
    published_at TIMESTAMPTZ,
    is_published BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- -----------------------------------------------------------------------------
-- Blog Post Tags (Junction Table)
-- -----------------------------------------------------------------------------
CREATE TABLE blog_post_tags (
    blog_post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (blog_post_id, tag_id)
);

-- ============================================================================
-- CRM TABLES
-- ============================================================================

-- -----------------------------------------------------------------------------
-- Inquiries (Contact Form Submissions)
-- -----------------------------------------------------------------------------
CREATE TABLE inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    message TEXT NOT NULL,
    source VARCHAR(100) DEFAULT 'contact_form',
    status inquiry_status DEFAULT 'new',
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- Quote Requests
-- -----------------------------------------------------------------------------
CREATE TABLE quote_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    -- Customer Info
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    -- Event Info
    event_type_id UUID REFERENCES event_types(id),
    event_date DATE,
    event_location VARCHAR(255),
    guest_count INTEGER,
    -- Quote Details
    items JSONB NOT NULL DEFAULT '[]', -- Array of {rental_item_id, quantity, name, thumbnail}
    message TEXT,
    -- Status
    status quote_status DEFAULT 'new',
    total_estimate DECIMAL(10, 2),
    admin_notes TEXT,
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ANALYTICS TABLES
-- ============================================================================

-- -----------------------------------------------------------------------------
-- Page Views (Aggregated Daily)
-- -----------------------------------------------------------------------------
CREATE TABLE page_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_type VARCHAR(50) NOT NULL, -- 'service', 'rental', 'portfolio', 'blog'
    page_id UUID NOT NULL,
    view_date DATE NOT NULL DEFAULT CURRENT_DATE,
    view_count INTEGER DEFAULT 1,
    UNIQUE (page_type, page_id, view_date)
);

-- ============================================================================
-- SETTINGS & MEDIA
-- ============================================================================

-- -----------------------------------------------------------------------------
-- Site Settings (Key-Value Store)
-- -----------------------------------------------------------------------------
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) NOT NULL UNIQUE,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial settings
INSERT INTO site_settings (key, value, description) VALUES
    ('company_info', '{"name": "Pavilion360", "phone": "+1-317-456-9100", "email": "info@pavilion360.com", "address": {"street": "6002 Corporate Drive", "city": "Indianapolis", "state": "IN", "zip": "46278"}}', 'Company contact information'),
    ('social_links', '{"facebook": "https://www.facebook.com/pavilion360events", "instagram": "https://www.instagram.com/pavilion360events/", "linkedin": "", "twitter": ""}', 'Social media links'),
    ('seo_defaults', '{"title_suffix": " | Pavilion360", "default_description": "Full-service event production company in Indianapolis"}', 'Default SEO settings');

-- -----------------------------------------------------------------------------
-- Media Library
-- -----------------------------------------------------------------------------
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    size_bytes INTEGER,
    mime_type VARCHAR(100),
    folder VARCHAR(100) DEFAULT 'general',
    alt_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Services
CREATE INDEX idx_services_slug ON services(slug) WHERE deleted_at IS NULL;
CREATE INDEX idx_services_active ON services(is_active) WHERE deleted_at IS NULL;
CREATE INDEX idx_services_order ON services(display_order);

-- Rental Items
CREATE INDEX idx_rental_items_slug ON rental_items(slug) WHERE deleted_at IS NULL;
CREATE INDEX idx_rental_items_category ON rental_items(category_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_rental_items_sku ON rental_items(sku);
CREATE INDEX idx_rental_items_popular ON rental_items(is_popular) WHERE is_active = true AND deleted_at IS NULL;

-- Portfolio Projects
CREATE INDEX idx_portfolio_slug ON portfolio_projects(slug) WHERE deleted_at IS NULL;
CREATE INDEX idx_portfolio_event_type ON portfolio_projects(event_type_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_portfolio_featured ON portfolio_projects(is_featured) WHERE is_active = true AND deleted_at IS NULL;

-- Venues
CREATE INDEX idx_venues_slug ON venues(slug) WHERE deleted_at IS NULL;

-- Blog Posts
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug) WHERE deleted_at IS NULL;
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_blog_posts_published ON blog_posts(published_at) WHERE is_published = true AND deleted_at IS NULL;

-- FAQs
CREATE INDEX idx_faqs_category ON faqs(category_id) WHERE deleted_at IS NULL;

-- Testimonials
CREATE INDEX idx_testimonials_featured ON testimonials(is_featured) WHERE is_active = true AND deleted_at IS NULL;

-- CRM
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created ON inquiries(created_at DESC);
CREATE INDEX idx_quote_requests_status ON quote_requests(status);
CREATE INDEX idx_quote_requests_created ON quote_requests(created_at DESC);

-- Analytics
CREATE INDEX idx_page_views_lookup ON page_views(page_type, page_id, view_date);
CREATE INDEX idx_page_views_date ON page_views(view_date);

-- Full-text search indexes
CREATE INDEX idx_services_search ON services USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));
CREATE INDEX idx_rental_items_search ON rental_items USING gin(to_tsvector('english', name || ' ' || COALESCE(short_description, '')));
CREATE INDEX idx_blog_posts_search ON blog_posts USING gin(to_tsvector('english', title || ' ' || COALESCE(excerpt, '')));

-- ============================================================================
-- TRIGGERS FOR AUTO-UPDATED TIMESTAMPS
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_service_use_cases_updated_at BEFORE UPDATE ON service_use_cases FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_service_process_steps_updated_at BEFORE UPDATE ON service_process_steps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_service_packages_updated_at BEFORE UPDATE ON service_packages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rental_categories_updated_at BEFORE UPDATE ON rental_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rental_items_updated_at BEFORE UPDATE ON rental_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_portfolio_projects_updated_at BEFORE UPDATE ON portfolio_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_venues_updated_at BEFORE UPDATE ON venues FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faq_categories_updated_at BEFORE UPDATE ON faq_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_categories_updated_at BEFORE UPDATE ON blog_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_event_types_updated_at BEFORE UPDATE ON event_types FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quote_requests_updated_at BEFORE UPDATE ON quote_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_use_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE related_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_item_event_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_item_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_project_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_event_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- Public Read Policies (for anon users)
-- -----------------------------------------------------------------------------

-- Services (public can read active, non-deleted)
CREATE POLICY "Public read active services" ON services
    FOR SELECT USING (is_active = true AND deleted_at IS NULL);

CREATE POLICY "Public read service use cases" ON service_use_cases
    FOR SELECT USING (EXISTS (SELECT 1 FROM services WHERE id = service_id AND is_active = true AND deleted_at IS NULL));

CREATE POLICY "Public read service process steps" ON service_process_steps
    FOR SELECT USING (EXISTS (SELECT 1 FROM services WHERE id = service_id AND is_active = true AND deleted_at IS NULL));

CREATE POLICY "Public read service packages" ON service_packages
    FOR SELECT USING (EXISTS (SELECT 1 FROM services WHERE id = service_id AND is_active = true AND deleted_at IS NULL));

CREATE POLICY "Public read related services" ON related_services
    FOR SELECT USING (true);

-- Rental Categories & Items
CREATE POLICY "Public read active rental categories" ON rental_categories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read active rental items" ON rental_items
    FOR SELECT USING (is_active = true AND deleted_at IS NULL);

CREATE POLICY "Public read rental item event types" ON rental_item_event_types
    FOR SELECT USING (true);

CREATE POLICY "Public read rental item tags" ON rental_item_tags
    FOR SELECT USING (true);

-- Portfolio
CREATE POLICY "Public read active portfolio" ON portfolio_projects
    FOR SELECT USING (is_active = true AND deleted_at IS NULL);

CREATE POLICY "Public read portfolio services" ON portfolio_project_services
    FOR SELECT USING (true);

-- Venues
CREATE POLICY "Public read active venues" ON venues
    FOR SELECT USING (is_active = true AND deleted_at IS NULL);

CREATE POLICY "Public read venue event types" ON venue_event_types
    FOR SELECT USING (true);

-- Team Members
CREATE POLICY "Public read active team members" ON team_members
    FOR SELECT USING (is_active = true AND deleted_at IS NULL);

-- Testimonials
CREATE POLICY "Public read active testimonials" ON testimonials
    FOR SELECT USING (is_active = true AND deleted_at IS NULL);

-- FAQs
CREATE POLICY "Public read active faqs" ON faqs
    FOR SELECT USING (is_active = true AND deleted_at IS NULL);

CREATE POLICY "Public read active faq categories" ON faq_categories
    FOR SELECT USING (is_active = true);

-- Blog
CREATE POLICY "Public read published blog posts" ON blog_posts
    FOR SELECT USING (is_published = true AND deleted_at IS NULL);

CREATE POLICY "Public read active blog categories" ON blog_categories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read blog post tags" ON blog_post_tags
    FOR SELECT USING (true);

-- Event Types & Tags
CREATE POLICY "Public read active event types" ON event_types
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read tags" ON tags
    FOR SELECT USING (true);

-- Site Settings (public can read)
CREATE POLICY "Public read site settings" ON site_settings
    FOR SELECT USING (true);

-- Media (public can read)
CREATE POLICY "Public read media" ON media
    FOR SELECT USING (true);

-- -----------------------------------------------------------------------------
-- Public Insert Policies (for forms)
-- -----------------------------------------------------------------------------

-- Inquiries (anyone can insert)
CREATE POLICY "Public can submit inquiries" ON inquiries
    FOR INSERT WITH CHECK (true);

-- Quote Requests (anyone can insert)
CREATE POLICY "Public can submit quote requests" ON quote_requests
    FOR INSERT WITH CHECK (true);

-- Page Views (anyone can insert/update for analytics)
CREATE POLICY "Public can insert page views" ON page_views
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can update page views" ON page_views
    FOR UPDATE USING (true);

-- -----------------------------------------------------------------------------
-- Admin Full Access Policies
-- -----------------------------------------------------------------------------

-- Helper function to check admin role
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        auth.role() = 'authenticated' AND
        (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Services
CREATE POLICY "Admin full access to services" ON services
    FOR ALL USING (is_admin());

CREATE POLICY "Admin full access to service use cases" ON service_use_cases
    FOR ALL USING (is_admin());

CREATE POLICY "Admin full access to service process steps" ON service_process_steps
    FOR ALL USING (is_admin());

CREATE POLICY "Admin full access to service packages" ON service_packages
    FOR ALL USING (is_admin());

CREATE POLICY "Admin full access to related services" ON related_services
    FOR ALL USING (is_admin());

-- Rental Categories & Items
CREATE POLICY "Admin full access to rental categories" ON rental_categories
    FOR ALL USING (is_admin());

CREATE POLICY "Admin full access to rental items" ON rental_items
    FOR ALL USING (is_admin());

CREATE POLICY "Admin full access to rental item event types" ON rental_item_event_types
    FOR ALL USING (is_admin());

CREATE POLICY "Admin full access to rental item tags" ON rental_item_tags
    FOR ALL USING (is_admin());

-- Portfolio
CREATE POLICY "Admin full access to portfolio" ON portfolio_projects
    FOR ALL USING (is_admin());

CREATE POLICY "Admin full access to portfolio services" ON portfolio_project_services
    FOR ALL USING (is_admin());

-- Venues
CREATE POLICY "Admin full access to venues" ON venues
    FOR ALL USING (is_admin());

CREATE POLICY "Admin full access to venue event types" ON venue_event_types
    FOR ALL USING (is_admin());

-- Team Members
CREATE POLICY "Admin full access to team members" ON team_members
    FOR ALL USING (is_admin());

-- Testimonials
CREATE POLICY "Admin full access to testimonials" ON testimonials
    FOR ALL USING (is_admin());

-- FAQs
CREATE POLICY "Admin full access to faqs" ON faqs
    FOR ALL USING (is_admin());

CREATE POLICY "Admin full access to faq categories" ON faq_categories
    FOR ALL USING (is_admin());

-- Blog
CREATE POLICY "Admin full access to blog posts" ON blog_posts
    FOR ALL USING (is_admin());

CREATE POLICY "Admin full access to blog categories" ON blog_categories
    FOR ALL USING (is_admin());

CREATE POLICY "Admin full access to blog post tags" ON blog_post_tags
    FOR ALL USING (is_admin());

-- Event Types & Tags
CREATE POLICY "Admin full access to event types" ON event_types
    FOR ALL USING (is_admin());

CREATE POLICY "Admin full access to tags" ON tags
    FOR ALL USING (is_admin());

-- CRM
CREATE POLICY "Admin full access to inquiries" ON inquiries
    FOR ALL USING (is_admin());

CREATE POLICY "Admin full access to quote requests" ON quote_requests
    FOR ALL USING (is_admin());

-- Analytics
CREATE POLICY "Admin full access to page views" ON page_views
    FOR ALL USING (is_admin());

-- Settings & Media
CREATE POLICY "Admin full access to site settings" ON site_settings
    FOR ALL USING (is_admin());

CREATE POLICY "Admin full access to media" ON media
    FOR ALL USING (is_admin());

-- ============================================================================
-- STORAGE BUCKET SETUP
-- ============================================================================
-- Run these in Supabase Storage settings or via API

-- Create public bucket for images
-- Note: This should be done via Supabase Dashboard or API
-- INSERT INTO storage.buckets (id, name, public) VALUES ('public', 'public', true);

-- Storage policies will be set via Supabase Dashboard:
-- 1. Public read access for all files in 'public' bucket
-- 2. Admin-only write/delete access

-- ============================================================================
-- HELPER VIEWS
-- ============================================================================

-- View for active services with counts
CREATE OR REPLACE VIEW v_services_summary AS
SELECT 
    s.id,
    s.name,
    s.slug,
    s.is_active,
    s.view_count,
    (SELECT COUNT(*) FROM service_use_cases WHERE service_id = s.id) as use_case_count,
    (SELECT COUNT(*) FROM service_process_steps WHERE service_id = s.id) as process_step_count,
    (SELECT COUNT(*) FROM service_packages WHERE service_id = s.id) as package_count,
    s.created_at,
    s.updated_at
FROM services s
WHERE s.deleted_at IS NULL;

-- View for active rentals with category info
CREATE OR REPLACE VIEW v_rental_items_summary AS
SELECT 
    ri.id,
    ri.name,
    ri.slug,
    ri.sku,
    rc.name as category_name,
    rc.slug as category_slug,
    ri.is_popular,
    ri.is_active,
    ri.view_count,
    ri.created_at,
    ri.updated_at
FROM rental_items ri
JOIN rental_categories rc ON ri.category_id = rc.id
WHERE ri.deleted_at IS NULL;

-- View for CRM dashboard stats
CREATE OR REPLACE VIEW v_crm_stats AS
SELECT 
    (SELECT COUNT(*) FROM inquiries WHERE status = 'new') as new_inquiries,
    (SELECT COUNT(*) FROM quote_requests WHERE status = 'new') as new_quotes,
    (SELECT COUNT(*) FROM inquiries WHERE created_at >= NOW() - INTERVAL '7 days') as inquiries_last_week,
    (SELECT COUNT(*) FROM quote_requests WHERE created_at >= NOW() - INTERVAL '7 days') as quotes_last_week;

-- ============================================================================
-- DONE
-- ============================================================================
-- 
-- After running this script:
-- 1. Verify all tables are created in Supabase Dashboard
-- 2. Create a storage bucket named 'public' with public access
-- 3. Set up storage policies for admin uploads
-- 4. Create admin user(s) with user_metadata.role = 'admin'
-- 
-- ============================================================================
