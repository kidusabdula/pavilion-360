// app/api/public/venues/route.ts
import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  
  // Optional filters
  const eventTypeSlug = searchParams.get('eventType');
  const managed = searchParams.get('managed');
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
  
  const { data, error } = await supabase
    .from('venues')
    .select(`
      id,
      name,
      slug,
      location,
      thumbnail_url,
      description,
      capacity_min,
      capacity_max,
      is_managed,
      external_link,
      display_order,
      venue_event_types (
        event_types (
          id,
          name,
          slug
        )
      )
    `)
    .eq('is_active', true)
    .is('deleted_at', null)
    .order('display_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching venues:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
  
  // Post-process filters
  let filteredData = data || [];
  
  // Filter by event type
  if (eventTypeSlug) {
    filteredData = filteredData.filter(venue =>
      venue.venue_event_types?.some(
        (vet: any) => vet.event_types?.slug === eventTypeSlug
      )
    );
  }
  
  // Filter by managed status
  if (managed === 'true') {
    filteredData = filteredData.filter(venue => venue.is_managed === true);
  } else if (managed === 'false') {
    filteredData = filteredData.filter(venue => venue.is_managed === false);
  }
  
  // Apply limit
  if (limit) {
    filteredData = filteredData.slice(0, limit);
  }
  
  return Response.json({ success: true, data: filteredData });
}