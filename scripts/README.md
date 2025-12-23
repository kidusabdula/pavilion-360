# Scripts

This folder contains utility scripts for the Pavilion360 project.

## Blog Image Upload Script

### Purpose
Uploads blog post thumbnail images to Supabase Storage and updates the database with the correct URLs.

### Prerequisites
1. All blog posts must be seeded in the database first
2. Images should exist in the `/public` folder with the following names:
   - `modern-event-venue-with-stage-lighting-and-audio-e.jpg`
   - `professional-event-services-production.jpg`
   - `elegant-event-venue-space.jpg`
   - `outdoor-music-festival-stage-crowd.jpg`
   - `event-equipment-rentals.jpg`

3. Environment variables must be set in `.env` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

4. Required packages (should already be installed):
   - `dotenv`
   - `@supabase/supabase-js`

### Usage

```bash
# Run the blog image upload script
npx tsx scripts/upload-blog-images.ts
```

### What it does
1. Reads images from the `/public` folder
2. Uploads them to Supabase Storage (`public-bucket/blog/`)
3. Updates each blog post's `thumbnail_url` with the Supabase Storage URL
4. Provides detailed progress and error reporting

### Image Mapping
- **AV Equipment Guide** → `blog/av-equipment-corporate-event.jpg`
- **Event Trends 2024** → `blog/event-trends-2024.jpg`
- **Wedding Planning** → `blog/wedding-planning-pavilion.jpg`
- **Festival Setup** → `blog/festival-setup-behind-scenes.jpg`
- **Lighting Design** → `blog/lighting-design-importance.jpg`

### Troubleshooting

**Images not found?**
- Ensure images exist in `/public` folder
- Check file names match exactly (case-sensitive)

**Upload fails?**
- Verify Supabase credentials are correct
- Check that `public-bucket` exists in Supabase Storage
- Ensure bucket has public access enabled

**Database update fails?**
- Verify blog posts are seeded with exact titles
- Check database connection and permissions
