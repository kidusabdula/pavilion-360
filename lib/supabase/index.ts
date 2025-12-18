// lib/supabase/index.ts
// Barrel exports for Supabase utilities
export { createClient } from './client';
export { createClient as createServerClient } from './server';
export { createAdminClient } from './admin';
export type { Database, Tables, InsertTables, UpdateTables, Enums, Json } from './types';