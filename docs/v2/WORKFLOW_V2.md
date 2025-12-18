# Pavilion360 V2.0 - Implementation Workflow

> **Version:** 2.0.0  
> **Last Updated:** December 18, 2024  
> **Status:** Planning Phase  
> **Estimated Duration:** 8-10 weeks  

---

## Table of Contents

1. [Overview](#overview)
2. [Phase Summary](#phase-summary)
3. [Phase 0: Foundation](#phase-0-foundation)
4. [Phase 1: Core Infrastructure](#phase-1-core-infrastructure)
5. [Phase 2: CMS Modules](#phase-2-cms-modules)
6. [Phase 3: Public Site Refactor](#phase-3-public-site-refactor)
7. [Phase 4: CRM & Analytics](#phase-4-crm--analytics)
8. [Phase 5: Authentication](#phase-5-authentication)
9. [Phase 6: Polish & Deploy](#phase-6-polish--deploy)
10. [Testing Checkpoints](#testing-checkpoints)
11. [Rollback Procedures](#rollback-procedures)

---

## Overview

This document outlines the step-by-step implementation plan for Pavilion360 V2.0. Each phase builds upon the previous one, with clear testing checkpoints to ensure stability.

### Implementation Principles

1. **Module-by-Module:** Complete one module fully before moving to the next
2. **Test at Each Checkpoint:** Verify functionality before proceeding
3. **Parallel Work Where Possible:** Some tasks can be done simultaneously
4. **Backward Compatibility:** Public site remains functional throughout migration
5. **Auth Last:** Authentication layer is the final integration

---

## Phase Summary

| Phase | Duration | Description | Dependencies |
|-------|----------|-------------|--------------|
| **Phase 0** | 1 day | Foundation & Setup | None |
| **Phase 1** | 2-3 days | Core Infrastructure | Phase 0 |
| **Phase 2** | 3-4 weeks | CMS Modules (8 modules) | Phase 1 |
| **Phase 3** | 1-2 weeks | Public Site Refactor | Phase 2 |
| **Phase 4** | 3-4 days | CRM & Analytics | Phase 2, 3 |
| **Phase 5** | 2-3 days | Authentication | Phase 1-4 |
| **Phase 6** | 3-4 days | Polish & Deploy | All |

---

## Phase 0: Foundation

**Duration:** 1 day  
**Goal:** Set up the project infrastructure and documentation

### Tasks

#### 0.1 Documentation Setup
- [x] Create `/docs/v2/` directory
- [x] Create `ARCHITECTURE_V2.md`
- [x] Create `WORKFLOW_V2.md` (this document)
- [x] Create `SCHEMA_V1.sql`
- [x] Create `CMS_UI_TEMPLATE.md`

#### 0.2 Project Structure Setup
- [ ] Create new directory structure as per architecture
  ```
  mkdir -p app/\(cms\)/cms
  mkdir -p app/api/public
  mkdir -p app/api/cms
  mkdir -p components/public
  mkdir -p components/cms/layout
  mkdir -p components/cms/forms
  mkdir -p components/cms/data-table
  mkdir -p components/cms/shared
  mkdir -p hooks/public
  mkdir -p hooks/cms
  mkdir -p lib/supabase
  mkdir -p lib/schemas
  mkdir -p scripts
  ```

#### 0.3 Dependencies Installation
- [ ] Install new dependencies:
  ```bash
  pnpm add @supabase/supabase-js @supabase/ssr @tanstack/react-query @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/extension-placeholder
  ```

### Checkpoint 0
- [ ] All directories created
- [ ] Dependencies installed
- [ ] Project builds successfully
- [ ] Documentation files accessible

---

## Phase 1: Core Infrastructure

**Duration:** 2-3 days  
**Goal:** Set up Supabase integration and core utilities

### Tasks

#### 1.1 Supabase Client Setup
- [ ] Create `lib/supabase/client.ts` (browser client)
- [ ] Create `lib/supabase/server.ts` (server client)
- [ ] Create `lib/supabase/admin.ts` (admin client for scripts)
- [ ] Add environment variables to `.env.local`
- [ ] Test connection to Supabase

#### 1.2 Database Schema Execution
- [ ] **USER ACTION:** Execute `SCHEMA_V1.sql` in Supabase SQL Editor
- [ ] Verify all tables created
- [ ] Verify RLS policies active
- [ ] Verify storage bucket created

#### 1.3 Type Generation
- [ ] Create `scripts/generate-types.ts`
- [ ] Generate types from Supabase schema
- [ ] Create `lib/supabase/types.ts`

#### 1.4 Query Client Setup
- [ ] Create TanStack Query provider
- [ ] Add to root layout
- [ ] Create `lib/constants/query-keys.ts`

#### 1.5 Core Utilities
- [ ] Create `lib/utils/api-error.ts` (API error handling)
- [ ] Create `lib/utils/slug.ts` (slug generation)
- [ ] Create `lib/utils/storage.ts` (file upload utilities)
- [ ] Create `lib/utils/format.ts` (formatting helpers)

#### 1.6 Notification System
- [ ] Verify Sonner is configured
- [ ] Create toast notification patterns
- [ ] Test success/error toasts

### Checkpoint 1
- [ ] Supabase connected successfully
- [ ] All database tables visible in Supabase dashboard
- [ ] Types generated and TypeScript compiles
- [ ] TanStack Query provider working
- [ ] Test query/mutation cycle works

---

## Phase 2: CMS Modules

**Duration:** 3-4 weeks  
**Goal:** Build all 8 CMS modules with full CRUD functionality

### Module Implementation Order

1. **Services** (simplest, establishes patterns)
2. **Testimonials** (simple, validates patterns)
3. **FAQs** (simple with categories)
4. **Venues** (introduces event types relation)
5. **Team Members** (image upload patterns)
6. **Rentals** (complex with categories, tags, images)
7. **Portfolio** (complex with relations)
8. **Blog** (most complex with TipTap editor)

### Per-Module Checklist

For each module, complete these tasks in order:

#### A. Schema & Types
- [ ] Create Zod schema: `lib/schemas/{module}.schema.ts`
- [ ] Create TypeScript types: `lib/types/{module}.types.ts`
- [ ] Validate against database schema

#### B. API Routes
- [ ] Create CMS routes: `app/api/cms/{module}/route.ts` (GET all, POST)
- [ ] Create CMS routes: `app/api/cms/{module}/[id]/route.ts` (GET, PUT, DELETE)
- [ ] Create Public routes: `app/api/public/{module}/route.ts` (GET)
- [ ] Test all endpoints with Postman/Thunder Client

#### C. Hooks
- [ ] Create CMS query hook: `hooks/cms/use-{module}.ts`
- [ ] Create CMS mutation hooks: `hooks/cms/use-{module}-mutations.ts`
- [ ] Create public hook: `hooks/public/use-{module}.ts`
- [ ] Test hooks in isolation

#### D. CMS UI Components
- [ ] Create list page: `app/(cms)/cms/{module}/page.tsx`
- [ ] Create new page: `app/(cms)/cms/{module}/new/page.tsx`
- [ ] Create detail page: `app/(cms)/cms/{module}/[id]/page.tsx`
- [ ] Create edit page: `app/(cms)/cms/{module}/[id]/edit/page.tsx`
- [ ] Module-specific form components if needed

#### E. Testing
- [ ] Test create flow
- [ ] Test read/list flow
- [ ] Test update flow
- [ ] Test delete flow
- [ ] Test validation errors
- [ ] Test image upload (if applicable)

---

### 2.1 CMS Layout Components (Before Modules)

Before building modules, create the shared CMS layout:

- [ ] Create `components/cms/layout/cms-shell.tsx`
- [ ] Create `components/cms/layout/cms-header.tsx`
- [ ] Create `components/cms/layout/cms-sidebar.tsx`
- [ ] Create `components/cms/layout/cms-breadcrumb.tsx`
- [ ] Create `app/(cms)/layout.tsx` (CMS layout wrapper)
- [ ] Create navigation configuration: `lib/constants/navigation.ts`

### 2.2 Reusable CMS Components (Before Modules)

- [ ] Create `components/cms/data-table/data-table.tsx`
- [ ] Create `components/cms/data-table/data-table-toolbar.tsx`
- [ ] Create `components/cms/data-table/data-table-pagination.tsx`
- [ ] Create `components/cms/data-table/data-table-column-header.tsx`
- [ ] Create `components/cms/data-table/data-table-row-actions.tsx`
- [ ] Create `components/cms/forms/form-field.tsx`
- [ ] Create `components/cms/forms/image-upload.tsx`
- [ ] Create `components/cms/forms/slug-input.tsx`
- [ ] Create `components/cms/shared/page-header.tsx`
- [ ] Create `components/cms/shared/empty-state.tsx`
- [ ] Create `components/cms/shared/loading-skeleton.tsx`
- [ ] Create `components/cms/shared/confirm-dialog.tsx`
- [ ] Create `components/cms/shared/status-badge.tsx`

### Checkpoint 2.0 (Layout Ready)
- [ ] CMS layout renders correctly
- [ ] Sidebar navigation works
- [ ] Mobile responsive sidebar
- [ ] Data table component works with mock data
- [ ] Image upload component uploads to Supabase

---

### 2.3 Module: Services

**Duration:** 2-3 days  
**Complexity:** Medium (establishes all patterns)

#### Schema
```typescript
// lib/schemas/service.schema.ts
export const serviceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().min(1, 'Icon is required'),
  thumbnail: z.string().url().optional(),
  what_we_do: z.array(z.string()),
  use_cases: z.array(useCaseSchema),
  process_steps: z.array(processStepSchema),
  packages: z.array(packageSchema).optional(),
  gallery: z.array(z.string().url()),
  related_service_ids: z.array(z.string().uuid()),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
});
```

#### Tasks
- [ ] A. Schema & Types
- [ ] B. API Routes (including nested use_cases, process_steps)
- [ ] C. Hooks
- [ ] D. CMS UI (list, new, detail, edit)
- [ ] E. Testing

#### Checkpoint 2.1 (Services)
- [ ] Can create a new service with all fields
- [ ] Can view service list with pagination
- [ ] Can view service detail
- [ ] Can edit service
- [ ] Can delete service (soft delete)
- [ ] Can upload thumbnail and gallery images
- [ ] Use cases and process steps work as nested forms

---

### 2.4 Module: Testimonials

**Duration:** 1 day  
**Complexity:** Low

#### Tasks
- [ ] A. Schema & Types
- [ ] B. API Routes
- [ ] C. Hooks
- [ ] D. CMS UI
- [ ] E. Testing

#### Checkpoint 2.2 (Testimonials)
- [ ] CRUD operations work
- [ ] Author image upload works
- [ ] Can link to portfolio project (optional)
- [ ] Featured toggle works

---

### 2.5 Module: FAQs

**Duration:** 1 day  
**Complexity:** Low

#### Tasks
- [ ] A. Schema & Types (with category relation)
- [ ] B. API Routes (including FAQ categories)
- [ ] C. Hooks
- [ ] D. CMS UI (including category management)
- [ ] E. Testing

#### Checkpoint 2.3 (FAQs)
- [ ] CRUD operations work
- [ ] Category filtering works
- [ ] Order/sort works
- [ ] Category management works

---

### 2.6 Module: Venues

**Duration:** 1-2 days  
**Complexity:** Medium (event types relation)

#### Tasks
- [ ] A. Schema & Types
- [ ] B. API Routes (including event types junction)
- [ ] C. Hooks
- [ ] D. CMS UI (multi-select for event types)
- [ ] E. Testing

#### Checkpoint 2.4 (Venues)
- [ ] CRUD operations work
- [ ] Thumbnail upload works
- [ ] Event types multi-select works
- [ ] Capacity range inputs work
- [ ] External link and managed flag work

---

### 2.7 Module: Team Members

**Duration:** 1 day  
**Complexity:** Low

#### Tasks
- [ ] A. Schema & Types
- [ ] B. API Routes
- [ ] C. Hooks
- [ ] D. CMS UI (image upload prominent)
- [ ] E. Testing

#### Checkpoint 2.5 (Team)
- [ ] CRUD operations work
- [ ] Profile image upload works
- [ ] Order/sort works
- [ ] LinkedIn URL works

---

### 2.8 Module: Rentals

**Duration:** 3-4 days  
**Complexity:** High (categories, tags, event types, images)

#### Additional Tasks
- [ ] Category management (separate sub-module)
- [ ] Tag management (global tags)
- [ ] Multi-image gallery upload
- [ ] Specs as JSONB editor or dynamic list

#### Tasks
- [ ] A. Schema & Types (complex with relations)
- [ ] B. API Routes (with categories, tags, event types)
- [ ] C. Hooks (with filtering)
- [ ] D. CMS UI (complex form with nested data)
- [ ] E. Testing

#### Checkpoint 2.6 (Rentals)
- [ ] CRUD operations work
- [ ] Category selection works
- [ ] Tag management works
- [ ] Event types multi-select works
- [ ] Multiple image upload works
- [ ] Specs array management works
- [ ] Popular toggle works
- [ ] SKU validation works

---

### 2.9 Module: Portfolio

**Duration:** 2-3 days  
**Complexity:** High (services relation, gallery, client quote)

#### Tasks
- [ ] A. Schema & Types (with service relations)
- [ ] B. API Routes (including portfolio_services junction)
- [ ] C. Hooks
- [ ] D. CMS UI (service multi-select, gallery, quote form)
- [ ] E. Testing

#### Checkpoint 2.7 (Portfolio)
- [ ] CRUD operations work
- [ ] Services multi-select works
- [ ] Event type selection works
- [ ] Gallery image upload works
- [ ] Technical highlights list works
- [ ] Client quote section works
- [ ] Date picker works

---

### 2.10 Module: Blog

**Duration:** 3-4 days  
**Complexity:** Highest (TipTap editor, categories, tags, SEO)

#### Additional Tasks
- [ ] Create `components/cms/forms/rich-text-editor.tsx` (TipTap integration)
- [ ] Configure TipTap extensions (image, link, placeholder)
- [ ] Blog category management
- [ ] Create blog card renderer for public site

#### Tasks
- [ ] A. Schema & Types (with TipTap JSON content)
- [ ] B. API Routes (with categories, tags)
- [ ] C. Hooks
- [ ] D. CMS UI (rich text editor, thumbnail, SEO fields)
- [ ] E. Testing

#### Checkpoint 2.8 (Blog)
- [ ] CRUD operations work
- [ ] TipTap editor renders and saves content
- [ ] Image insertion in TipTap works
- [ ] Link insertion works
- [ ] Category selection works
- [ ] Tag management works
- [ ] Thumbnail upload works
- [ ] SEO fields work
- [ ] Read time auto-calculated
- [ ] Published date works

---

### 2.11 CMS Dashboard

**Duration:** 1 day  
**Complexity:** Medium

#### Tasks
- [ ] Create `app/(cms)/cms/page.tsx` (dashboard)
- [ ] Create `components/cms/dashboard/stats-card.tsx`
- [ ] Create `components/cms/dashboard/recent-activity.tsx`
- [ ] Create `components/cms/dashboard/quick-actions.tsx`
- [ ] Create analytics API: `app/api/cms/analytics/route.ts`
- [ ] Create `hooks/cms/use-analytics.ts`

#### Checkpoint 2.9 (Dashboard)
- [ ] Dashboard shows content counts
- [ ] Recent activity displays
- [ ] Quick action links work
- [ ] Stats cards animate

---

### Phase 2 Final Checkpoint
- [ ] All 8 CMS modules complete
- [ ] All CRUD operations working
- [ ] All image uploads working
- [ ] TipTap editor fully functional
- [ ] Dashboard showing stats
- [ ] Data tables paginate correctly
- [ ] Forms validate correctly
- [ ] Delete confirmations work
- [ ] Navigation complete

---

## Phase 3: Public Site Refactor

**Duration:** 1-2 weeks  
**Goal:** Migrate all public pages to use Supabase data

### 3.1 Data Migration Script

- [ ] Create `scripts/migrate-images.ts`
  - Scan `/public/` for rental/service/portfolio images
  - Upload to Supabase Storage
  - Generate URL mapping
  - Output migration report
- [ ] Create `scripts/seed-data.ts`
  - Read from existing `/lib/data/*.ts` files
  - Transform to new schema format
  - Map old image paths to new Supabase URLs
  - Insert into database
  - Handle relations (services ↔ portfolio, etc.)
- [ ] **USER ACTION:** Run migration scripts
- [ ] Verify data in Supabase dashboard
- [ ] Verify images accessible from Supabase URLs

### Checkpoint 3.0 (Data Migrated)
- [ ] All existing data in database
- [ ] All images in Supabase Storage
- [ ] Old static data files can be removed (backup first)

---

### 3.2 Public Hooks Creation

For each module, create public data hooks:

- [ ] `hooks/public/use-services.ts` + `use-service.ts`
- [ ] `hooks/public/use-rentals.ts` + `use-rental.ts`
- [ ] `hooks/public/use-portfolio.ts` + `use-portfolio-project.ts`
- [ ] `hooks/public/use-venues.ts`
- [ ] `hooks/public/use-testimonials.ts`
- [ ] `hooks/public/use-faqs.ts`
- [ ] `hooks/public/use-blog-posts.ts` + `use-blog-post.ts`
- [ ] `hooks/public/use-team.ts`

### Checkpoint 3.1 (Public Hooks)
- [ ] All public hooks fetch data successfully
- [ ] Loading states work
- [ ] Error states work

---

### 3.3 Page Refactoring

Refactor each public page to use hooks instead of static imports:

#### Home Page (`/`)
- [ ] Refactor to use `useServices()` for featured services
- [ ] Refactor to use `useTestimonials()` for testimonials
- [ ] Update image URLs
- [ ] Add loading skeletons

#### Services
- [ ] Refactor `/services/page.tsx` to use `useServices()`
- [ ] Refactor `/services/[slug]/page.tsx` to use `useService(slug)`
- [ ] Move service components to `components/public/services/`
- [ ] Add loading skeletons
- [ ] Update image handling

#### Rentals
- [ ] Refactor `/rentals/page.tsx` to use `useRentals()`
- [ ] Move rental components to `components/public/rentals/`
- [ ] Update filter to use categories from database
- [ ] Add loading skeletons
- [ ] Update quote basket for new data structure

#### Portfolio
- [ ] Refactor `/portfolio/page.tsx` to use `usePortfolio()`
- [ ] Refactor `/portfolio/[slug]/page.tsx` to use `usePortfolioProject(slug)`
- [ ] Move components to `components/public/portfolio/`
- [ ] Add loading skeletons

#### Venues
- [ ] Refactor `/venues/page.tsx` to use `useVenues()`
- [ ] Move components to `components/public/venues/`
- [ ] Add loading skeletons

#### FAQs
- [ ] Refactor `/faqs/page.tsx` to use `useFaqs()`
- [ ] Update category filters to use database categories
- [ ] Add loading skeletons

#### Blog
- [ ] Refactor `/blog/page.tsx` to use `useBlogPosts()`
- [ ] Create `/blog/[slug]/page.tsx` for individual posts
- [ ] Create TipTap content renderer component
- [ ] Move components to `components/public/blog/`
- [ ] Add loading skeletons

#### About
- [ ] Refactor to use `useTeam()` for team members section
- [ ] Refactor to use `useTestimonials()` for testimonials
- [ ] Consider making timeline data dynamic (site settings)

#### Resources
- [ ] Consider any dynamic content needs

### Checkpoint 3.2 (Public Site)
- [ ] All pages load data from Supabase
- [ ] No references to old static data files
- [ ] All images loading from Supabase Storage
- [ ] Loading skeletons display correctly
- [ ] Error states handled gracefully
- [ ] SEO still working (check meta tags)
- [ ] Site performance acceptable

---

### 3.4 Cleanup

- [ ] Remove `/lib/data/*.ts` static files (after backup)
- [ ] Remove old `/lib/types/*.ts` (replaced by new types)
- [ ] Update any remaining hardcoded content
- [ ] Remove unused imports

### Phase 3 Final Checkpoint
- [ ] Public site fully functional with Supabase data
- [ ] All images loading from Supabase Storage
- [ ] Quote basket works with new rental data
- [ ] Blog posts render TipTap content correctly
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Build succeeds

---

## Phase 4: CRM & Analytics

**Duration:** 3-4 days  
**Goal:** Implement quote request flow and analytics tracking

### 4.1 Quote Request Flow

#### Quote Basket Enhancement
- [ ] Update `lib/context/quote-basket-context.tsx` for new data structure
- [ ] Store rental item IDs and quantities
- [ ] Add event details (date, type, guest count)
- [ ] Persist to localStorage

#### Quote Request Form
- [ ] Create quote request form component
- [ ] Integrate with quote basket
- [ ] Add customer details fields (name, email, phone, company)
- [ ] Add event details fields
- [ ] Add message field

#### API & Database
- [ ] Create `app/api/public/quote-request/route.ts`
- [ ] Insert quote request with items to database
- [ ] Send notification (optional: email via Supabase Edge Function)

### Checkpoint 4.1 (Quote Flow)
- [ ] Can add items to quote basket
- [ ] Can fill out quote request form
- [ ] Quote request saves to database
- [ ] Can view quote requests in CMS

---

### 4.2 CMS Quote Management

- [ ] Create `app/(cms)/cms/quotes/page.tsx` (list)
- [ ] Create `app/(cms)/cms/quotes/[id]/page.tsx` (detail)
- [ ] Add status management (new, reviewed, contacted, closed)
- [ ] Add notes field for admin
- [ ] Show quote items with details
- [ ] Create `hooks/cms/use-quotes.ts`
- [ ] Create `hooks/cms/use-quote-mutations.ts`

### Checkpoint 4.2 (Quote CMS)
- [ ] Quote list displays correctly
- [ ] Can view quote details
- [ ] Can update quote status
- [ ] Can add admin notes

---

### 4.3 Contact Form Integration

- [ ] Update `app/api/public/contact/route.ts` to save to database
- [ ] Create `app/(cms)/cms/inquiries/page.tsx` (list)
- [ ] Create `app/(cms)/cms/inquiries/[id]/page.tsx` (detail)
- [ ] Add status management
- [ ] Create hooks

### Checkpoint 4.3 (Inquiries)
- [ ] Contact form saves to database
- [ ] Can view inquiries in CMS
- [ ] Can update inquiry status

---

### 4.4 Analytics Implementation

#### Page View Tracking
- [ ] Create `app/api/public/analytics/track/route.ts`
- [ ] Create `hooks/public/use-track-view.ts`
- [ ] Add tracking to service detail pages
- [ ] Add tracking to rental detail pages
- [ ] Add tracking to portfolio detail pages
- [ ] Add tracking to blog post pages

#### Dashboard Analytics
- [ ] Update dashboard to show:
  - Total content counts
  - Quote requests (by status)
  - Inquiries (by status)
  - Top viewed services
  - Top viewed rentals
  - Top blog posts
  - Views over time (chart)

### Checkpoint 4.4 (Analytics)
- [ ] Page views tracking works
- [ ] Dashboard shows analytics
- [ ] Charts render correctly

### Phase 4 Final Checkpoint
- [ ] Quote flow complete
- [ ] Contact form integrated
- [ ] CRM modules working
- [ ] Analytics tracking working
- [ ] Dashboard showing real data

---

## Phase 5: Authentication

**Duration:** 2-3 days  
**Goal:** Implement admin authentication

### 5.1 Auth Setup

- [ ] Create `lib/supabase/auth.ts` (auth utilities)
- [ ] Create `lib/context/auth-context.tsx`
- [ ] Update `app/proxy.ts` for route protection

### 5.2 Login Page

- [ ] Create `app/(cms)/login/page.tsx`
- [ ] Create login form with email/password
- [ ] Handle login errors
- [ ] Redirect to dashboard on success

### 5.3 User Menu

- [ ] Update `components/cms/layout/cms-header.tsx` with user menu
- [ ] Show user name/email
- [ ] Add logout functionality

### 5.4 Route Protection

- [ ] Implement proxy.ts middleware
- [ ] Protect all `/cms/*` routes
- [ ] Protect all `/api/cms/*` routes
- [ ] Verify admin role in user_metadata

### 5.5 Initial Admin User

- [ ] **USER ACTION:** Create admin user in Supabase Auth dashboard
- [ ] **USER ACTION:** Set user_metadata: `{ "role": "admin", "full_name": "Admin Name" }`
- [ ] Test login flow

### Checkpoint 5 (Auth Complete)
- [ ] Can log in with admin credentials
- [ ] Non-admin users rejected
- [ ] Unauthenticated users redirected to login
- [ ] Session persists across refreshes
- [ ] Logout works correctly
- [ ] API routes protected

---

## Phase 6: Polish & Deploy

**Duration:** 3-4 days  
**Goal:** Final polish and production deployment

### 6.1 UI Polish

- [ ] Review all CMS pages for consistency
- [ ] Verify all animations working
- [ ] Check mobile responsiveness
- [ ] Fix any UI bugs
- [ ] Add loading states everywhere needed
- [ ] Add empty states everywhere needed

### 6.2 Performance Optimization

- [ ] Review TanStack Query cache settings
- [ ] Optimize image loading (next/image with Supabase URLs)
- [ ] Add appropriate indexes (if not in schema)
- [ ] Review API query performance
- [ ] Test with larger datasets

### 6.3 Error Handling

- [ ] Add error boundaries
- [ ] Handle network errors gracefully
- [ ] Handle auth errors gracefully
- [ ] Add user-friendly error messages

### 6.4 Accessibility

- [ ] Keyboard navigation in CMS
- [ ] ARIA labels on interactive elements
- [ ] Color contrast check
- [ ] Screen reader testing

### 6.5 Testing

- [ ] Full end-to-end testing of all modules
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Test slow network conditions
- [ ] Test auth edge cases

### 6.6 Documentation

- [ ] Update README.md
- [ ] Document environment variables
- [ ] Document admin user setup
- [ ] Document backup procedures

### 6.7 Deployment

- [ ] Verify all environment variables in production
- [ ] Deploy to Vercel (or chosen platform)
- [ ] Test production deployment
- [ ] Verify Supabase connection in production
- [ ] Set up monitoring (optional)

### Phase 6 Final Checkpoint (Launch Ready)
- [ ] All features working in production
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Admin can log in and manage content
- [ ] Public site displays content correctly
- [ ] Quote flow works end-to-end
- [ ] Analytics tracking in production

---

## Testing Checkpoints

### Development Testing

Each module should pass these tests before moving on:

#### Unit Tests (Optional for V2.0)
- [ ] Schema validation tests
- [ ] Utility function tests

#### Integration Tests
- [ ] API routes return correct data
- [ ] CRUD operations work
- [ ] Relations populate correctly

#### E2E Tests (Manual for V2.0)
- [ ] User flows work end-to-end
- [ ] Forms submit correctly
- [ ] Navigation works
- [ ] Error states display

### Pre-Launch Checklist

- [ ] All CMS modules functioning
- [ ] All public pages loading data
- [ ] Authentication working
- [ ] Quote flow complete
- [ ] No broken images
- [ ] No broken links
- [ ] Mobile responsive
- [ ] Performance acceptable
- [ ] SEO tags present
- [ ] Analytics tracking

---

## Rollback Procedures

### Database Rollback

If database issues occur:

1. **Soft Rollback:** Use soft-deleted data to restore
2. **Table Rollback:** Drop and recreate affected tables
3. **Full Rollback:** Restore from Supabase backup

### Code Rollback

1. **Git Revert:** Revert to last stable commit
2. **Feature Flags:** Disable new features via environment variables
3. **Branch Deployment:** Deploy from stable branch

### Data Migration Rollback

1. Keep static data files as backup until V2.0 stable
2. Can revert to static data by uncommenting old imports
3. Images remain in `/public/` until migration verified

---

## Quick Reference

### Key Commands

```bash
# Development
pnpm dev

# Build
pnpm build

# Type generation
pnpm run generate-types

# Data seeding
pnpm run seed-data

# Image migration
pnpm run migrate-images
```

### Key Files

| File | Purpose |
|------|---------|
| `app/proxy.ts` | Auth middleware |
| `lib/supabase/client.ts` | Browser Supabase client |
| `lib/supabase/server.ts` | Server Supabase client |
| `lib/constants/query-keys.ts` | TanStack Query keys |
| `lib/constants/navigation.ts` | CMS navigation config |

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

---

*This workflow document should be updated as implementation progresses. Check off completed items and add notes for any deviations from the plan.*
