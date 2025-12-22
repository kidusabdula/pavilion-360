// app/api/public/services/[slug]/route.ts
import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

type Params = { params: Promise<{ slug: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: service, error } = await supabase
    .from('services')
    .select(`
      id,
      name,
      slug,
      tagline,
      description,
      icon,
      thumbnail_url,
      what_we_do,
      gallery,
      display_order,
      service_use_cases (
        id,
        title,
        description,
        image_url,
        display_order
      ),
      service_process_steps (
        id,
        step_number,
        title,
        description
      ),
      service_packages (
        id,
        name,
        description,
        starting_price,
        features,
        display_order
      )
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .is('deleted_at', null)
    .single();
  
  if (error || !service) {
    return Response.json(
      { success: false, error: 'Service not found' },
      { status: 404 }
    );
  }
  
  // Get related services (other active services, limit 3)
  const { data: relatedServices } = await supabase
    .from('services')
    .select('id, name, slug, tagline, icon')
    .neq('id', service.id)
    .eq('is_active', true)
    .is('deleted_at', null)
    .order('display_order', { ascending: true })
    .limit(3);
  
  return Response.json({
    success: true,
    data: {
      ...service,
      relatedServices: relatedServices || [],
    },
  });
}