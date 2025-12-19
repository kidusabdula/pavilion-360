// lib/supabase/types.ts
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
