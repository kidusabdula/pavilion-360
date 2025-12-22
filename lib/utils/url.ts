// lib/utils/url.ts

/**
 * Ensures a URL has a protocol (https:// or http://)
 * @param url - The URL to normalize
 * @returns The URL with protocol
 */
export function ensureProtocol(url: string): string {
  if (!url) return "http://localhost:3000";

  // If URL already has a protocol, return as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // For localhost, use http
  if (url.includes("localhost")) {
    return `http://${url}`;
  }

  // For all other URLs (production), use https
  return `https://${url}`;
}

/**
 * Gets the base URL for the application
 * Ensures it always has the correct protocol
 */
export function getBaseUrl(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return ensureProtocol(siteUrl);
}
