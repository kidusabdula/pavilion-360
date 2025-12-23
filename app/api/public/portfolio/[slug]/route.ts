// app/api/public/portfolio/[slug]/route.ts
import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

type Params = { params: Promise<{ slug: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const { slug } = await params;
  const supabase = await createClient();
  
  // Fetch project with all related data
  const { data: project, error } = await supabase
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
      seo_title,
      seo_description,
      event_types (
        id,
        name,
        slug
      ),
      portfolio_project_services (
        services (
          id,
          name,
          slug,
          icon
        )
      )
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .is('deleted_at', null)
    .single();
  
  if (error || !project) {
    return Response.json(
      { success: false, error: 'Portfolio project not found' },
      { status: 404 }
    );
  }
  
  // Get other projects for "More Projects" section (exclude current)
  const { data: relatedProjects } = await supabase
    .from('portfolio_projects')
    .select(`
      id,
      title,
      slug,
      thumbnail_url,
      event_types (
        name
      )
    `)
    .neq('id', project.id)
    .eq('is_active', true)
    .is('deleted_at', null)
    .order('display_order', { ascending: true })
    .limit(3);
  
  return Response.json({
    success: true,
    data: {
      ...project,
      relatedProjects: relatedProjects || [],
    },
  });
}