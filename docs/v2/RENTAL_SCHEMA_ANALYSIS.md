# Rental Schema Mismatch Analysis

## Database Schema vs Form Schema Comparison

### ✅ Matching Fields (No Issues)
These fields match perfectly between the database and form:

| Field | DB Type | Form Type | Status |
|-------|---------|-----------|--------|
| `id` | uuid | - | ✅ Auto-generated |
| `name` | varchar(255) | string | ✅ Match |
| `slug` | varchar(255) | string | ✅ Match |
| `category_id` | uuid | string (uuid) | ✅ Match |
| `short_description` | text | string (nullable) | ✅ Match |
| `description` | text | string | ✅ Match |
| `thumbnail_url` | text | string (url, nullable) | ✅ Match |
| `images` | text[] | string[] (urls) | ✅ Match |
| `daily_rate` | varchar(50) | string (nullable) | ✅ Match |
| `is_active` | boolean | boolean | ✅ Match |
| `display_order` | integer | number | ✅ Match |
| `created_at` | timestamptz | - | ✅ Auto-generated |
| `updated_at` | timestamptz | - | ✅ Auto-generated |
| `deleted_at` | timestamptz | - | ✅ Soft delete |

### ⚠️ Mismatched Fields (Need Fixing)

#### 1. **`is_popular` (DB) vs `is_featured` (Form)**
- **Database:** `is_popular boolean`
- **Form Schema:** `is_featured boolean`
- **Issue:** The form uses `is_featured` but the database has `is_popular`
- **Impact:** When creating/updating rentals, the `is_featured` value won't be saved

#### 2. **`specs` Field Type Mismatch**
- **Database:** `specs jsonb default '[]'` (expects an array)
- **Form Schema:** `specs: z.record(z.string(), z.string())` (sends an object/dictionary)
- **Issue:** The form sends `{"key": "value"}` but the database expects `[]`
- **Impact:** Data type mismatch will cause insertion errors

### 🚫 Fields in Form but NOT in Database

#### 3. **`tags` Field**
- **Form Schema:** `tags: z.array(z.string())`
- **Database:** ❌ No `tags` column
- **Note:** There's a junction table `rental_item_tags` for many-to-many relationship
- **Impact:** The `tags` array from the form is being sent to the API but can't be inserted into `rental_items` table

#### 4. **`features` Field**
- **Form Schema:** `features: z.array(z.string())`
- **Database:** ❌ No `features` column
- **Impact:** The `features` array from the form is being sent to the API but can't be inserted into `rental_items` table

### 📝 Fields in Database but NOT in Form

#### 5. **`sku` Field**
- **Database:** `sku varchar(50)` (unique, nullable)
- **Form:** ❌ Not in form
- **Impact:** SKU cannot be set through the CMS form

#### 6. **`subcategory` Field**
- **Database:** `subcategory varchar(100)` (nullable)
- **Form:** ❌ Not in form
- **Impact:** Subcategory cannot be set through the CMS form

#### 7. **`seo_title` Field**
- **Database:** `seo_title varchar(255)` (nullable)
- **Form:** ❌ Not in form
- **Impact:** SEO title cannot be set through the CMS form

#### 8. **`seo_description` Field**
- **Database:** `seo_description text` (nullable)
- **Form:** ❌ Not in form
- **Impact:** SEO description cannot be set through the CMS form

#### 9. **`view_count` Field**
- **Database:** `view_count integer default 0`
- **Form:** ❌ Not in form (correct - should be auto-managed)
- **Impact:** None - this is fine, view count should be managed by the system

---

## 🔧 Required Fixes

### Option A: Update Form to Match Database (Recommended)

This approach keeps the database schema as-is and updates the form/schema to match.

#### Changes Needed:

1. **Rename `is_featured` to `is_popular` in form schema**
   - File: `lib/schemas/rental.schema.ts`
   - Change: `is_featured` → `is_popular`
   - Also update: Form component, API routes, edit page

2. **Fix `specs` type**
   - Database expects: `jsonb` array format `[]`
   - Form sends: object `{}`
   - **Decision needed:** Should specs be an array or object?
     - If array: Change DB default to `'{}'::jsonb`
     - If object: Keep as-is (object is more flexible for key-value pairs)

3. **Handle `tags` properly**
   - Remove `tags` from the main insert
   - After rental creation, insert tags into `rental_item_tags` junction table
   - Requires additional API logic

4. **Handle `features` properly**
   - **Decision needed:** Where should features be stored?
     - Option 1: Store in `specs` as part of the object
     - Option 2: Add a `features` text[] column to database
     - Option 3: Remove from form if not needed

5. **Add missing fields to form (optional)**
   - `sku` - Product SKU/code
   - `subcategory` - Additional categorization
   - `seo_title` - SEO meta title
   - `seo_description` - SEO meta description

### Option B: Update Database to Match Form

This approach updates the database to match the current form schema.

#### SQL Changes Needed:

```sql
-- 1. Rename is_popular to is_featured
ALTER TABLE rental_items 
RENAME COLUMN is_popular TO is_featured;

-- 2. Change specs default from array to object
ALTER TABLE rental_items 
ALTER COLUMN specs SET DEFAULT '{}'::jsonb;

-- 3. Add features column (if storing directly)
ALTER TABLE rental_items 
ADD COLUMN features text[] DEFAULT '{}';

-- 4. Update indexes
DROP INDEX IF EXISTS idx_rental_items_popular;
CREATE INDEX idx_rental_items_featured ON rental_items(is_featured) 
WHERE is_active = true AND deleted_at IS NULL;
```

---

## 💡 Recommended Solution

**I recommend Option A** (Update Form to Match Database) with these specific changes:

### 1. Keep `is_popular` in Database
- The database uses `is_popular` which is semantically correct
- Update form to use `is_popular` instead of `is_featured`

### 2. Keep `specs` as Object (JSONB)
- The current form implementation (key-value pairs) is more flexible
- Change database default from `'[]'` to `'{}'`

### 3. Store `features` in `specs`
- Instead of a separate column, store features as part of specs
- Or add a `features text[]` column if you want them separate

### 4. Handle `tags` with Junction Table
- Keep the many-to-many relationship via `rental_item_tags`
- Update API to handle tag insertion after rental creation

### 5. Add Optional Fields to Form
- Add `sku`, `subcategory`, `seo_title`, `seo_description` as optional fields
- These enhance the CMS functionality

---

## Next Steps

1. **Decide on the approach** (A or B)
2. **Update the schema** (either form or database)
3. **Update API routes** to handle tags and features properly
4. **Test create/update operations**
5. **Regenerate TypeScript types**

Would you like me to implement Option A or Option B?
