// app/api/public/testimonials/route.ts
import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  
  const featured = searchParams.get('featured') === 'true';
  const limit = parseInt(searchParams.get('limit') || '10');
  
  let query = supabase
    .from('testimonials')
    .select('*')
    .is('deleted_at', null)
    .order('display_order', { ascending: true })
    .limit(limit);
  
  if (featured) {
    query = query.eq('is_featured', true);
  }
  
  const { data, error } = await query;
  
  if (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
  
  return Response.json({ success: true, data });
}