/**
 * Upload Blog Images to Supabase Storage
 *
 * This script:
 * 1. Uploads blog thumbnail images to Supabase Storage (public-bucket)
 * 2. Updates blog_posts table with the correct Supabase Storage URLs
 *
 * Usage: npx tsx scripts/upload-blog-images.ts
 */

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { config } from "dotenv";

// Load environment variables from .env file
config();

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

console.log("🔍 Checking environment variables...");
console.log(
  `   NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? "✅ Found" : "❌ Missing"}`
);
console.log(
  `   SUPABASE_SERVICE_ROLE_KEY: ${
    supabaseServiceKey ? "✅ Found" : "❌ Missing"
  }`
);
console.log("");

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase credentials");
  console.error("💡 Make sure your .env file contains:");
  console.error("   - NEXT_PUBLIC_SUPABASE_URL");
  console.error("   - SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Blog post to image mapping
const blogImageMapping = [
  {
    title: "How to Choose the Right AV Equipment for Your Corporate Event",
    localImagePath: "/modern-event-venue-with-stage-lighting-and-audio-e.jpg",
    storagePath: "blog/av-equipment-corporate-event.jpg",
  },
  {
    title: "Top 5 Event Trends for 2024",
    localImagePath: "/professional-event-services-production.jpg",
    storagePath: "blog/event-trends-2024.jpg",
  },
  {
    title: "Planning a Wedding at The Pavilion: What to Know",
    localImagePath: "/elegant-event-venue-space.jpg",
    storagePath: "blog/wedding-planning-pavilion.jpg",
  },
  {
    title: "Behind the Scenes: Setting Up a Large-Scale Festival",
    localImagePath: "/outdoor-music-festival-stage-crowd.jpg",
    storagePath: "blog/festival-setup-behind-scenes.jpg",
  },
  {
    title: "The Importance of Lighting Design in Events",
    localImagePath: "/event-equipment-rentals.jpg",
    storagePath: "blog/lighting-design-importance.jpg",
  },
];

async function uploadBlogImages() {
  console.log("🚀 Starting blog image upload process...\n");

  const publicDir = path.join(process.cwd(), "public");
  let successCount = 0;
  let errorCount = 0;

  for (const mapping of blogImageMapping) {
    console.log(`📝 Processing: ${mapping.title}`);

    try {
      // Check if local image exists
      const localPath = path.join(publicDir, mapping.localImagePath);
      if (!fs.existsSync(localPath)) {
        console.log(`   ⚠️  Image not found: ${mapping.localImagePath}`);
        console.log(`   ℹ️  Skipping upload, will use placeholder\n`);
        errorCount++;
        continue;
      }

      // Read the image file
      const fileBuffer = fs.readFileSync(localPath);
      const fileExt = path.extname(mapping.localImagePath);
      const contentType =
        fileExt === ".jpg" || fileExt === ".jpeg"
          ? "image/jpeg"
          : fileExt === ".png"
          ? "image/png"
          : "image/jpeg";

      // Upload to Supabase Storage
      console.log(`   📤 Uploading to: ${mapping.storagePath}`);
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("public-bucket")
        .upload(mapping.storagePath, fileBuffer, {
          contentType,
          upsert: true, // Overwrite if exists
        });

      if (uploadError) {
        console.log(`   ❌ Upload failed: ${uploadError.message}\n`);
        errorCount++;
        continue;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("public-bucket")
        .getPublicUrl(mapping.storagePath);

      const publicUrl = urlData.publicUrl;
      console.log(`   ✅ Uploaded: ${publicUrl}`);

      // Update blog post with new URL
      console.log(`   🔄 Updating blog post...`);
      const { error: updateError } = await supabase
        .from("blog_posts")
        .update({ thumbnail_url: publicUrl })
        .eq("title", mapping.title);

      if (updateError) {
        console.log(`   ❌ Update failed: ${updateError.message}\n`);
        errorCount++;
        continue;
      }

      console.log(`   ✅ Blog post updated successfully\n`);
      successCount++;
    } catch (error) {
      console.log(`   ❌ Error: ${error}\n`);
      errorCount++;
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("📊 Upload Summary:");
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${errorCount}`);
  console.log(`   📝 Total: ${blogImageMapping.length}`);
  console.log("=".repeat(60));

  if (errorCount > 0) {
    console.log("\n⚠️  Some images failed to upload. Check the logs above.");
    console.log("💡 Tip: Make sure all images exist in the /public folder");
  } else {
    console.log("\n🎉 All blog images uploaded successfully!");
  }
}

// Run the script
uploadBlogImages()
  .then(() => {
    console.log("\n✨ Script completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Script failed:", error);
    process.exit(1);
  });
