// components/venues/venues-content.tsx
import { VenuesClientView } from './venues-client-view';
import { adaptDbVenuesToVenues } from '@/lib/utils/venue-adapter';

async function getVenues() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const res = await fetch(`${baseUrl}/api/public/venues`, {
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) {
    console.error('Failed to fetch venues');
    return [];
  }
  
  const { data } = await res.json();
  return adaptDbVenuesToVenues(data || []);
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

export async function VenuesContent() {
  const [venues, eventTypes] = await Promise.all([
    getVenues(),
    getEventTypes(),
  ]);
  
  // Filter to only venue-relevant event types
  const venueEventTypes = eventTypes.filter((et: any) =>
    ['Corporate', 'Wedding', 'Gala', 'Festival', 'Social', 'Nonprofit'].includes(et.name)
  );
  
  return (
    <VenuesClientView
      initialVenues={venues}
      eventTypes={venueEventTypes}
    />
  );
}