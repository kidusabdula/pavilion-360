// lib/supabase/admin.ts
// Admin Supabase client with service role - ONLY use in scripts and trusted server code
// This bypasses Row Level Security!
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables for admin client');
  }
  
  return createSupabaseClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}