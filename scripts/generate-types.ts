// scripts/generate-types.ts
// Script to generate TypeScript types from Supabase schema
// Usage: pnpm generate-types
import { exec } from 'child_process';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const SUPABASE_PROJECT_REF = process.env.NEXT_PUBLIC_SUPABASE_URL?.match(
  /https:\/\/([^.]+)\.supabase\.co/
)?.[1];

if (!SUPABASE_PROJECT_REF) {
  console.error('❌ Could not extract project ref from NEXT_PUBLIC_SUPABASE_URL');
  console.error('   Make sure your .env.local file is configured correctly');
  process.exit(1);
}

const OUTPUT_PATH = join(process.cwd(), 'lib', 'supabase', 'database.types.ts');

console.log('🔄 Generating Supabase types...');
console.log(`   Project: ${SUPABASE_PROJECT_REF}`);
console.log(`   Output: ${OUTPUT_PATH}`);

// Ensure output directory exists
const outputDir = join(process.cwd(), 'lib', 'supabase');
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// Generate types using Supabase CLI
const command = `npx supabase gen types typescript --project-id ${SUPABASE_PROJECT_REF} --schema public`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Error generating types:');
    console.error(stderr || error.message);
    console.log('\n💡 Make sure you have logged in with: npx supabase login');
    process.exit(1);
  }
  
  if (stdout) {
    // Write the generated types
    writeFileSync(OUTPUT_PATH, stdout, 'utf-8');
    console.log('✅ Types generated successfully!');
    console.log(`   Output: ${OUTPUT_PATH}`);
    
    // Also update the types.ts to re-export
    const typesPath = join(process.cwd(), 'lib', 'supabase', 'types.ts');
    const typesContent = `// lib/supabase/types.ts
// Re-export generated database types
// To regenerate: pnpm generate-types
export * from './database.types';

// Convenience type aliases
import type { Database as GeneratedDatabase } from './database.types';

export type Database = GeneratedDatabase;
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];
`;
    writeFileSync(typesPath, typesContent, 'utf-8');
    console.log('✅ types.ts updated to re-export generated types');
  } else {
    console.error('❌ No output from Supabase CLI');
    process.exit(1);
  }
});