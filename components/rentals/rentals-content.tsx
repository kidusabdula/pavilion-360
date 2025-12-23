// components/rentals/rentals-content.tsx
import { RentalsClientView } from './rentals-client-view';
import { adaptDbRentalsToRentals } from '@/lib/utils/rental-adapter';

async function getRentals() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const res = await fetch(`${baseUrl}/api/public/rentals`, {
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) {
    console.error('Failed to fetch rentals');
    return [];
  }
  
  const { data } = await res.json();
  return adaptDbRentalsToRentals(data || []);
}

async function getCategories() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const res = await fetch(`${baseUrl}/api/public/rental-categories`, {
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) return [];
  const { data } = await res.json();
  return data || [];
}

async function getEventTypes() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const res = await fetch(`${baseUrl}/api/public/event-types`, {
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) return [];
  const { data } = await res.json();
  return data || [];
}

async function getTags() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const res = await fetch(`${baseUrl}/api/public/tags`, {
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) return [];
  const { data } = await res.json();
  return data || [];
}

export async function RentalsContent() {
  const [rentals, categories, eventTypes, tags] = await Promise.all([
    getRentals(),
    getCategories(),
    getEventTypes(),
    getTags(),
  ]);
  
  // Extract unique tags from rentals as fallback
  const allTags = tags.length > 0 
    ? tags.map((t: any) => t.name).sort()
    : Array.from(new Set(rentals.flatMap(r => r.tags))).sort();
  
  return (
    <RentalsClientView
      initialRentals={rentals}
      categories={categories}
      eventTypes={eventTypes}
      allTags={allTags}
    />
  );
}