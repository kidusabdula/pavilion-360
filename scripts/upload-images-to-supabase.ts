import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

// Load environment variables
dotenv.config();
dotenv.config({ path: ".env.local", override: true });

// Configuration - update these with your Supabase credentials
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Use service role for uploads

const BUCKET_NAME = "public-bucket";
const PUBLIC_FOLDER = path.join(process.cwd(), "public");
const OUTPUT_FILE = path.join(process.cwd(), "docs/v2/image-url-mapping.json");

// Image extensions to upload
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];

// Files to skip (logos, placeholders, etc.)
const SKIP_FILES = [
  "placeholder.jpg",
  "placeholder.svg",
  "placeholder-logo.png",
  "placeholder-logo.svg",
  "placeholder-user.jpg",
  "logo.png",
  "icon.svg",
  "robots.txt",
];

async function main() {
  console.log("🚀 Starting image upload to Supabase Storage...\n");

  // Validate environment variables
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error("❌ Missing environment variables!");
    console.error(
      "   Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
    );
    console.error("\n   You can find your service role key in:");
    console.error("   Supabase Dashboard → Settings → API → service_role key");
    process.exit(1);
  }

  // Create Supabase client with service role
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  // Get all image files from public folder
  const files = fs.readdirSync(PUBLIC_FOLDER);
  const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext) && !SKIP_FILES.includes(file);
  });

  console.log(`📁 Found ${imageFiles.length} images to upload\n`);

  const urlMapping: Record<string, string> = {};
  let successCount = 0;
  let errorCount = 0;

  for (const filename of imageFiles) {
    const filePath = path.join(PUBLIC_FOLDER, filename);
    const storagePath = `images/${filename}`;

    try {
      // Read file
      const fileBuffer = fs.readFileSync(filePath);
      const contentType = getContentType(filename);

      // Check if file already exists
      const { data: existingFile } = await supabase.storage
        .from(BUCKET_NAME)
        .list("images", { search: filename });

      if (existingFile && existingFile.length > 0) {
        console.log(`⏭️  Skipping (exists): ${filename}`);
        // Get public URL for existing file
        const { data: urlData } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(storagePath);
        urlMapping[`/${filename}`] = urlData.publicUrl;
        successCount++;
        continue;
      }

      // Upload file
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(storagePath, fileBuffer, {
          contentType,
          upsert: false,
        });

      if (error) {
        console.error(`❌ Error uploading ${filename}: ${error.message}`);
        errorCount++;
        continue;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(storagePath);

      urlMapping[`/${filename}`] = urlData.publicUrl;
      console.log(`✅ Uploaded: ${filename}`);
      successCount++;
    } catch (err) {
      console.error(`❌ Error processing ${filename}:`, err);
      errorCount++;
    }
  }

  // Save URL mapping to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(urlMapping, null, 2));

  console.log("\n" + "=".repeat(50));
  console.log("📊 Upload Summary:");
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📄 URL mapping saved to: ${OUTPUT_FILE}`);
  console.log("=".repeat(50));

  // Generate SQL update statements
  console.log("\n🔧 Generating SQL update script...\n");
  generateSqlUpdates(urlMapping);
}

function getContentType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const types: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
  };
  return types[ext] || "application/octet-stream";
}

function generateSqlUpdates(urlMapping: Record<string, string>) {
  const sqlFile = path.join(process.cwd(), "docs/v2/update-image-urls.sql");

  let sql = `-- Auto-generated SQL to update image URLs to Supabase Storage
-- Generated on: ${new Date().toISOString()}
-- Run this AFTER seed-services.sql and seed-all-data.sql to update all image URLs

`;

  // SERVICES
  sql += `-- ============================================================================\n`;
  sql += `-- SERVICES\n`;
  sql += `-- ============================================================================\n\n`;

  sql += `-- Update services thumbnail URLs\n`;
  for (const [oldUrl, newUrl] of Object.entries(urlMapping)) {
    sql += `UPDATE services SET thumbnail_url = '${newUrl}' WHERE thumbnail_url = '${oldUrl}';\n`;
  }

  sql += `\n-- Update services gallery arrays\n`;
  for (const [oldUrl, newUrl] of Object.entries(urlMapping)) {
    sql += `UPDATE services SET gallery = array_replace(gallery, '${oldUrl}', '${newUrl}');\n`;
  }

  sql += `\n-- Update service_use_cases image URLs\n`;
  for (const [oldUrl, newUrl] of Object.entries(urlMapping)) {
    sql += `UPDATE service_use_cases SET image_url = '${newUrl}' WHERE image_url = '${oldUrl}';\n`;
  }

  // RENTALS
  sql += `\n-- ============================================================================\n`;
  sql += `-- RENTAL ITEMS\n`;
  sql += `-- ============================================================================\n\n`;

  sql += `-- Update rental_items thumbnail URLs\n`;
  for (const [oldUrl, newUrl] of Object.entries(urlMapping)) {
    sql += `UPDATE rental_items SET thumbnail_url = '${newUrl}' WHERE thumbnail_url = '${oldUrl}';\n`;
  }

  sql += `\n-- Update rental_items images arrays\n`;
  for (const [oldUrl, newUrl] of Object.entries(urlMapping)) {
    sql += `UPDATE rental_items SET images = array_replace(images, '${oldUrl}', '${newUrl}');\n`;
  }

  // PORTFOLIO
  sql += `\n-- ============================================================================\n`;
  sql += `-- PORTFOLIO PROJECTS\n`;
  sql += `-- ============================================================================\n\n`;

  sql += `-- Update portfolio_projects thumbnail URLs\n`;
  for (const [oldUrl, newUrl] of Object.entries(urlMapping)) {
    sql += `UPDATE portfolio_projects SET thumbnail_url = '${newUrl}' WHERE thumbnail_url = '${oldUrl}';\n`;
  }

  sql += `\n-- Update portfolio_projects gallery arrays\n`;
  for (const [oldUrl, newUrl] of Object.entries(urlMapping)) {
    sql += `UPDATE portfolio_projects SET gallery = array_replace(gallery, '${oldUrl}', '${newUrl}');\n`;
  }

  // VENUES
  sql += `\n-- ============================================================================\n`;
  sql += `-- VENUES\n`;
  sql += `-- ============================================================================\n\n`;

  sql += `-- Update venues thumbnail URLs\n`;
  for (const [oldUrl, newUrl] of Object.entries(urlMapping)) {
    sql += `UPDATE venues SET thumbnail_url = '${newUrl}' WHERE thumbnail_url = '${oldUrl}';\n`;
  }

  // RENTAL CATEGORIES
  sql += `\n-- ============================================================================\n`;
  sql += `-- RENTAL CATEGORIES\n`;
  sql += `-- ============================================================================\n\n`;

  sql += `-- Update rental_categories thumbnail URLs\n`;
  for (const [oldUrl, newUrl] of Object.entries(urlMapping)) {
    sql += `UPDATE rental_categories SET thumbnail_url = '${newUrl}' WHERE thumbnail_url = '${oldUrl}';\n`;
  }

  fs.writeFileSync(sqlFile, sql);
  console.log(`📝 SQL update script saved to: ${sqlFile}`);
}

main().catch(console.error);
