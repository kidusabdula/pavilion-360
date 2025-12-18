// lib/utils/storage.ts
// Supabase Storage utilities for file uploads
import { createClient } from '@/lib/supabase/client';

const BUCKET_NAME = 'public-bucket';

export interface UploadResult {
  url: string;
  path: string;
  error?: string;
}

export interface UploadOptions {
  folder?: string;
  filename?: string;
  upsert?: boolean;
}

/**
 * Generate a unique filename with timestamp and random string
 */
function generateFilename(originalName: string, customName?: string): string {
  const ext = originalName.split('.').pop()?.toLowerCase() || 'jpg';
  const name = customName || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return `${name}.${ext}`;
}

/**
 * Upload a file to Supabase Storage
 */
export async function uploadFile(
  file: File,
  options: UploadOptions = {}
): Promise<UploadResult> {
  const { folder = 'general', filename, upsert = false } = options;
  
  const supabase = createClient();
  const generatedFilename = generateFilename(file.name, filename);
  const path = `${folder}/${generatedFilename}`;
  
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file, {
      cacheControl: '3600',
      upsert,
    });
    
  if (error) {
    console.error('Upload error:', error);
    return {
      url: '',
      path: '',
      error: error.message,
    };
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path);
    
  return {
    url: publicUrl,
    path,
  };
}

/**
 * Upload multiple files to Supabase Storage
 */
export async function uploadFiles(
  files: File[],
  options: UploadOptions = {}
): Promise<UploadResult[]> {
  const results = await Promise.all(
    files.map((file) => uploadFile(file, options))
  );
  return results;
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFile(path: string): Promise<{ error?: string }> {
  const supabase = createClient();
  
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([path]);
    
  if (error) {
    console.error('Delete error:', error);
    return { error: error.message };
  }
  return {};
}

/**
 * Delete multiple files from Supabase Storage
 */
export async function deleteFiles(paths: string[]): Promise<{ error?: string }> {
  const supabase = createClient();
  
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove(paths);
    
  if (error) {
    console.error('Delete error:', error);
    return { error: error.message };
  }
  return {};
}

/**
 * Get the public URL for a storage path
 */
export function getPublicUrl(path: string): string {
  const supabase = createClient();
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path);
  return publicUrl;
}

/**
 * List files in a folder
 */
export async function listFiles(folder: string): Promise<{
  files: { name: string; url: string }[];
  error?: string;
}> {
  const supabase = createClient();
  
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list(folder);
    
  if (error) {
    console.error('List error:', error);
    return { files: [], error: error.message };
  }
  
  const files = (data || []).map((file) => ({
    name: file.name,
    url: getPublicUrl(`${folder}/${file.name}`),
  }));
  
  return { files };
}

// Storage folder constants
export const STORAGE_FOLDERS = {
  SERVICES: {
    THUMBNAILS: 'services/thumbnails',
    GALLERY: 'services/gallery',
    USE_CASES: 'services/use-cases',
  },
  RENTALS: {
    THUMBNAILS: 'rentals/thumbnails',
    GALLERY: 'rentals/gallery',
  },
  PORTFOLIO: {
    THUMBNAILS: 'portfolio/thumbnails',
    GALLERY: 'portfolio/gallery',
  },
  BLOG: {
    THUMBNAILS: 'blog/thumbnails',
    CONTENT: 'blog/content',
  },
  TEAM: 'team',
  VENUES: 'venues',
  TESTIMONIALS: 'testimonials',
} as const;