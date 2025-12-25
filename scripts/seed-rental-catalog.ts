// scripts/seed-rental-catalog.ts
// Comprehensive script to seed rental catalog from client Excel export
// Uploads images to Supabase Storage and creates rental items with proper relationships

// Load environment variables first
import * as dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";

// ============================================================
// CONFIGURATION
// ============================================================

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const STORAGE_BUCKET = "public-bucket";
const CATALOG_DIR = path.join(process.cwd(), "Catalog Pavillion");
const CSV_DIR = path.join(CATALOG_DIR, "csv_output");

// Create Supabase admin client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ============================================================
// TYPE DEFINITIONS
// ============================================================

interface CsvRow {
  ITEM: string;
  FILENAME: string;
  COLLECTION: string;
  COLOR: string;
  FINISH: string;
  QUANTITY: string;
  "EVENT TYPE": string;
}

interface RentalCategory {
  id: string;
  name: string;
  slug: string;
}

interface EventType {
  id: string;
  name: string;
  slug: string;
}

interface RentalItemData {
  name: string;
  slug: string;
  category_id: string;
  description: string;
  short_description: string;
  thumbnail_url: string | null;
  images: string[];
  collection: string | null;
  color: string | null;
  finish: string | null;
  quantity: number;
  specs: Record<string, string>;
  is_popular: boolean;
  is_active: boolean;
  display_order: number;
}

// ============================================================
// CATEGORY & IMAGE FOLDER MAPPING
// ============================================================

const CSV_TO_CATEGORY: Record<string, string> = {
  "audio.csv": "Audio",
  "barricades.csv": "Barricades",
  "bars_&_shelves.csv": "Bars & Shelves",
  "decks_&_staging.csv": "Decks & Staging",
  "effects.csv": "Effects",
  "food_&_beverage.csv": "Food & Beverage",
  "lighting.csv": "Lighting",
  "miscellaneous.csv": "Miscellaneous",
  "seating.csv": "Seating",
  "trussing.csv": "Trussing",
  "video.csv": "Video",
};

// Map CSV filename prefixes to actual image folders
const IMAGE_FOLDER_MAP: Record<string, string> = {
  Audio: "Audio",
  Speaker: "Audio",
  Speakers: "Audio",
  Barricades: "Barricades",
  Bars: "Bars - Shelves",
  Divider: "Bars - Shelves",
  Shelves: "Bars - Shelves",
  Staging: "Stage",
  FX: "FX",
  FB: "FB",
  Lighting: "Lights",
  MISC: "MISC",
  Chairs: "Chairs",
  Truss: "Truss",
  Video: "Video",
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special chars
    .replace(/[\s_-]+/g, "-") // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

function generateDescription(
  name: string,
  collection: string | null,
  color: string | null,
  finish: string | null,
  category: string
): string {
  const parts: string[] = [];

  // Base description
  parts.push(`Premium quality ${name.toLowerCase()}`);

  // Add collection info
  if (collection && collection !== "-") {
    parts.push(`from our ${collection} collection`);
  }

  // Add color and finish
  const colorFinish: string[] = [];
  if (color && color !== "-") colorFinish.push(color.toLowerCase());
  if (finish && finish !== "-")
    colorFinish.push(`${finish.toLowerCase()} finish`);

  if (colorFinish.length > 0) {
    parts.push(`featuring ${colorFinish.join(" with ")}`);
  }

  // Category-specific additions
  const categoryDescriptions: Record<string, string> = {
    Audio:
      "Designed for professional sound reinforcement at events of all sizes.",
    Barricades: "Built for crowd management and venue organization.",
    "Bars & Shelves":
      "Perfect for hospitality setups and beverage service areas.",
    "Decks & Staging": "Engineered for safe and stable performance platforms.",
    Effects:
      "Create memorable moments with professional-grade special effects.",
    "Food & Beverage": "Essential equipment for catering and food service.",
    Lighting: "Transform any venue with professional lighting solutions.",
    Miscellaneous: "Versatile equipment to enhance your event experience.",
    Seating: "Comfortable and stylish seating for any occasion.",
    Trussing: "Heavy-duty structural support for lighting and audio systems.",
    Video: "High-impact visual solutions for presentations and entertainment.",
  };

  parts.push(
    categoryDescriptions[category] ||
      "Built for professional event applications."
  );

  return parts.join(". ") + ".";
}

function generateShortDescription(
  name: string,
  collection: string | null,
  color: string | null
): string {
  const parts = [name];
  if (collection && collection !== "-") parts.push(`(${collection})`);
  if (color && color !== "-") parts.push(`- ${color}`);
  return parts.join(" ");
}

function getImageFolder(filename: string): string | null {
  // Extract prefix from filename (e.g., "Audio - Mixer.jpeg" -> "Audio")
  const prefix = filename.split(" - ")[0];
  return IMAGE_FOLDER_MAP[prefix] || null;
}

async function uploadImage(
  localPath: string,
  remotePath: string
): Promise<string | null> {
  try {
    const fileBuffer = fs.readFileSync(localPath);
    const fileName = path.basename(localPath);
    const ext = path.extname(fileName).toLowerCase();

    // Determine content type
    const contentTypes: Record<string, string> = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".webp": "image/webp",
      ".gif": "image/gif",
    };
    const contentType = contentTypes[ext] || "image/jpeg";

    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(remotePath, fileBuffer, {
        contentType,
        upsert: true,
      });

    if (error) {
      console.error(`  ❌ Upload failed for ${fileName}:`, error.message);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(remotePath);

    return urlData.publicUrl;
  } catch (err) {
    console.error(`  ❌ Error uploading ${localPath}:`, err);
    return null;
  }
}

function parseEventTypes(eventTypeStr: string): string[] {
  if (!eventTypeStr || eventTypeStr === "-") return [];

  return eventTypeStr
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0 && t !== "-");
}

function cleanValue(value: string | undefined): string | null {
  if (!value || value === "-" || value.trim() === "") return null;
  return value.trim();
}

// ============================================================
// MAIN SCRIPT
// ============================================================

async function main() {
  console.log("🚀 Pavilion360 Rental Catalog Seeder");
  console.log("=====================================\n");

  // Verify environment
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error("❌ Missing environment variables!");
    console.error(
      "   Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
    );
    process.exit(1);
  }

  // --------------------------------------------------------
  // Step 1: Fetch categories from database
  // --------------------------------------------------------
  console.log("📂 Step 1: Fetching rental categories...");

  const { data: categories, error: catError } = await supabase
    .from("rental_categories")
    .select("id, name, slug");

  if (catError || !categories) {
    console.error("❌ Failed to fetch categories:", catError?.message);
    console.error(
      "   Run the SQL migration first: 002_add_rental_catalog_fields.sql"
    );
    process.exit(1);
  }

  const categoryMap = new Map<string, string>();
  categories.forEach((cat: RentalCategory) => {
    categoryMap.set(cat.name, cat.id);
    categoryMap.set(cat.slug, cat.id);
  });
  console.log(`   ✅ Found ${categories.length} categories\n`);

  // --------------------------------------------------------
  // Step 2: Fetch event types from database
  // --------------------------------------------------------
  console.log("🎪 Step 2: Fetching event types...");

  const { data: eventTypes, error: etError } = await supabase
    .from("event_types")
    .select("id, name, slug");

  if (etError) {
    console.error("❌ Failed to fetch event types:", etError.message);
    process.exit(1);
  }

  const eventTypeMap = new Map<string, string>();
  (eventTypes || []).forEach((et: EventType) => {
    eventTypeMap.set(et.name.toLowerCase(), et.id);
    eventTypeMap.set(et.slug.toLowerCase(), et.id);
  });
  console.log(`   ✅ Found ${eventTypes?.length || 0} event types\n`);

  // --------------------------------------------------------
  // Step 3: Process each CSV file
  // --------------------------------------------------------
  console.log("📄 Step 3: Processing CSV files...\n");

  const csvFiles = Object.keys(CSV_TO_CATEGORY);
  let totalItems = 0;
  let successCount = 0;
  let failCount = 0;
  const allRentalItems: Array<{
    rental: RentalItemData;
    eventTypeIds: string[];
  }> = [];

  for (const csvFile of csvFiles) {
    const csvPath = path.join(CSV_DIR, csvFile);

    if (!fs.existsSync(csvPath)) {
      console.log(`   ⚠️ Skipping ${csvFile} (file not found)`);
      continue;
    }

    console.log(`   📁 Processing: ${csvFile}`);

    const categoryName = CSV_TO_CATEGORY[csvFile];
    const categoryId = categoryMap.get(categoryName);

    if (!categoryId) {
      console.log(`      ⚠️ Category "${categoryName}" not found, skipping`);
      continue;
    }

    // Parse CSV
    const csvContent = fs.readFileSync(csvPath, "utf-8");
    const records: CsvRow[] = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    let displayOrder = 0;

    for (const row of records) {
      // Skip empty rows
      if (!row.ITEM || row.ITEM.trim() === "") continue;

      totalItems++;
      displayOrder++;

      const name = row.ITEM.trim();
      const filename = row.FILENAME?.trim() || "";
      const collection = cleanValue(row.COLLECTION);
      const color = cleanValue(row.COLOR);
      const finish = cleanValue(row.FINISH);
      const quantity = parseInt(row.QUANTITY) || 0;
      const eventTypeNames = parseEventTypes(row["EVENT TYPE"]);

      // Generate unique slug (include collection/color for variants)
      let slug = slugify(name);
      if (collection) slug += `-${slugify(collection)}`;
      if (color) slug += `-${slugify(color)}`;
      if (finish) slug += `-${slugify(finish)}`;

      // Find image file
      let imageUrl: string | null = null;
      if (filename) {
        const imageFolder = getImageFolder(filename);
        if (imageFolder) {
          const imagePath = path.join(CATALOG_DIR, imageFolder, filename);

          if (fs.existsSync(imagePath)) {
            // Upload to Supabase
            const remotePath = `rentals/${categoryName
              .toLowerCase()
              .replace(/\s+/g, "-")}/${filename.replace(/\s+/g, "_")}`;
            console.log(`      📤 Uploading: ${filename}`);
            imageUrl = await uploadImage(imagePath, remotePath);
          } else {
            console.log(`      ⚠️ Image not found: ${imagePath}`);
          }
        }
      }

      // Map event types to IDs
      const eventTypeIds: string[] = [];
      for (const etName of eventTypeNames) {
        const etId = eventTypeMap.get(etName.toLowerCase());
        if (etId) {
          eventTypeIds.push(etId);
        }
      }

      // Build specs object
      const specs: Record<string, string> = {};
      if (collection) specs["Collection"] = collection;
      if (color) specs["Color"] = color;
      if (finish) specs["Finish"] = finish;

      // Create rental item data
      const rentalData: RentalItemData = {
        name,
        slug,
        category_id: categoryId,
        description: generateDescription(
          name,
          collection,
          color,
          finish,
          categoryName
        ),
        short_description: generateShortDescription(name, collection, color),
        thumbnail_url: imageUrl,
        images: imageUrl ? [imageUrl] : [],
        collection,
        color,
        finish,
        quantity,
        specs,
        is_popular: false,
        is_active: true,
        display_order: displayOrder,
      };

      allRentalItems.push({ rental: rentalData, eventTypeIds });
    }

    console.log(
      `      ✅ Processed ${records.filter((r) => r.ITEM).length} items\n`
    );
  }

  // --------------------------------------------------------
  // Step 4: Insert rental items into database
  // --------------------------------------------------------
  console.log("💾 Step 4: Inserting rental items into database...\n");

  for (const { rental, eventTypeIds } of allRentalItems) {
    try {
      // Check if slug exists and make unique if needed
      const { data: existing } = await supabase
        .from("rental_items")
        .select("id")
        .eq("slug", rental.slug)
        .is("deleted_at", null)
        .single();

      if (existing) {
        // Append random suffix for uniqueness
        rental.slug = `${rental.slug}-${Date.now().toString(36)}`;
      }

      // Insert rental item
      const { data: insertedRental, error: insertError } = await supabase
        .from("rental_items")
        .insert(rental)
        .select("id")
        .single();

      if (insertError) {
        console.log(
          `   ❌ Failed to insert "${rental.name}": ${insertError.message}`
        );
        failCount++;
        continue;
      }

      // Insert event type relationships
      if (eventTypeIds.length > 0 && insertedRental) {
        const junctionData = eventTypeIds.map((etId) => ({
          rental_item_id: insertedRental.id,
          event_type_id: etId,
        }));

        const { error: junctionError } = await supabase
          .from("rental_item_event_types")
          .insert(junctionData);

        if (junctionError) {
          console.log(
            `   ⚠️ Failed to link event types for "${rental.name}": ${junctionError.message}`
          );
        }
      }

      successCount++;
      console.log(`   ✅ Inserted: ${rental.name}`);
    } catch (err) {
      console.log(`   ❌ Error processing "${rental.name}":`, err);
      failCount++;
    }
  }

  // --------------------------------------------------------
  // Summary
  // --------------------------------------------------------
  console.log("\n=====================================");
  console.log("📊 SEED COMPLETE");
  console.log("=====================================");
  console.log(`   Total items processed: ${totalItems}`);
  console.log(`   ✅ Successfully inserted: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📦 Categories: ${categories.length}`);
  console.log(`   🎪 Event types: ${eventTypes?.length || 0}`);
  console.log("=====================================\n");
}

// Run the script
main().catch(console.error);
