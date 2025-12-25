# Quick Migration Guide

## Run This in Supabase SQL Editor

```sql
-- 1. Add daily_rate column to rental_items table
ALTER TABLE rental_items 
ADD COLUMN IF NOT EXISTS daily_rate VARCHAR(50);

-- 2. Add description column
ALTER TABLE rental_items 
ADD COLUMN IF NOT EXISTS description TEXT;

-- 3. Fix specs default from array to object
ALTER TABLE rental_items 
ALTER COLUMN specs SET DEFAULT '{}'::jsonb;
```

## Then Run This in Your Terminal

```bash
# Regenerate TypeScript types
pnpm supabase:types
```

## Verify Environment Variables

Check your `.env.local` has:
```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

That's it! Your image uploads and rental forms should now work. ✅
create table public.rental_items (
  id uuid not null default extensions.uuid_generate_v4 (),
  name character varying(255) not null,
  slug character varying(255) not null,
  sku character varying(50) null,
  category_id uuid not null,
  subcategory character varying(100) null,
  thumbnail_url text null,
  images text[] null default '{}'::text[],
  short_description text null,
  description text null,
  specs jsonb null default '[]'::jsonb,
  is_popular boolean null default false,
  is_active boolean null default true,
  display_order integer null default 0,
  view_count integer null default 0,
  seo_title character varying(255) null,
  seo_description text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  deleted_at timestamp with time zone null,
  daily_rate character varying(50) null,
  constraint rental_items_pkey primary key (id),
  constraint rental_items_sku_key unique (sku),
  constraint rental_items_slug_key unique (slug),
  constraint rental_items_category_id_fkey foreign KEY (category_id) references rental_categories (id)
) TABLESPACE pg_default;

create index IF not exists idx_rental_items_slug on public.rental_items using btree (slug) TABLESPACE pg_default
where
  (deleted_at is null);

create index IF not exists idx_rental_items_category on public.rental_items using btree (category_id) TABLESPACE pg_default
where
  (deleted_at is null);

create index IF not exists idx_rental_items_sku on public.rental_items using btree (sku) TABLESPACE pg_default;

create index IF not exists idx_rental_items_popular on public.rental_items using btree (is_popular) TABLESPACE pg_default
where
  (
    (is_active = true)
    and (deleted_at is null)
  );

create index IF not exists idx_rental_items_search on public.rental_items using gin (
  to_tsvector(
    'english'::regconfig,
    (
      ((name)::text || ' '::text) || COALESCE(short_description, ''::text)
    )
  )
) TABLESPACE pg_default;

create trigger update_rental_items_updated_at BEFORE
update on rental_items for EACH row
execute FUNCTION update_updated_at_column ();