// app/api/public/faqs/route.ts
import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  
  // Optional filters
  const categorySlug = searchParams.get('category');
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
  
  const { data, error } = await supabase
    .from('faqs')
    .select(`
      id,
      question,
      answer,
      display_order,
      faq_categories!inner (
        id,
        name,
        slug
      )
    `)
    .eq('is_active', true)
    .is('deleted_at', null)
    .order('display_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching FAQs:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
  
  // Post-process filters
  let filteredData = data || [];
  
  // Filter by category
  if (categorySlug && categorySlug !== 'all') {
    filteredData = filteredData.filter(faq =>
      faq.faq_categories?.slug === categorySlug
    );
  }
  
  // Apply limit
  if (limit) {
    filteredData = filteredData.slice(0, limit);
  }
  
  return Response.json({ success: true, data: filteredData });
}