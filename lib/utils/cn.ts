// lib/utils/cn.ts
// Utility function to conditionally join class names
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and tailwind-merge
 * clsx handles conditional classes and arrays
 * tailwind-merge resolves Tailwind CSS class conflicts
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}