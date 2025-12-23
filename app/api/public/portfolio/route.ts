// app/api/public/portfolio/route.ts
import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  
  // Optional filters
  const eventTypeSlug = searchParams.get('eventType');
  const featured = searchParams.get('featured') === 'true';
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
  
  const { data, error } = await supabase
    .from('portfolio_projects')
    .select(`
      id,
      title,
      slug,
      venue,
      event_date,
      thumbnail_url,
      gallery,
      description,
      goals,
      technical_highlights,
      attendee_count,
      client_quote_text,
      client_quote_author,
      client_quote_role,
      is_featured,
      display_order,
      event_types (
        id,
        name,
        slug
      ),
      portfolio_project_services (
        services (
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
    console.error('Error fetching portfolio projects:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
  
  // Post-process filters
  let filteredData = data || [];
  
  // Filter by event type
  if (eventTypeSlug) {
    filteredData = filteredData.filter(project =>
      project.event_types?.slug === eventTypeSlug
    );
  }
  
  // Filter by featured
  if (featured) {
    filteredData = filteredData.filter(project => project.is_featured);
  }
  
  // Apply limit
  if (limit) {
    filteredData = filteredData.slice(0, limit);
  }
  
  return Response.json({ success: true, data: filteredData });
}