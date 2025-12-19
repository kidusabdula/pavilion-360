// app/api/public/services/[slug]/route.ts
// Public API for single service by slug
import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ApiError, handleApiError, successResponse } from '@/lib/utils/api-error';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const supabase = await createClient();
    
    // Get service
    const { data: service, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .is('deleted_at', null)
      .single();
    
    if (error || !service) {
      throw ApiError.notFound('Service');
    }
    
    // Fetch related data
    const [useCasesRes, processStepsRes, packagesRes] = await Promise.all([
      supabase
        .from('service_use_cases')
        .select('*')
        .eq('service_id', service.id)
        .order('display_order'),
      supabase
        .from('service_process_steps')
        .select('*')
        .eq('service_id', service.id)
        .order('step_number'),
      supabase
        .from('service_packages')
        .select('*')
        .eq('service_id', service.id)
        .order('display_order'),
    ]);
    
    // Increment view count (fire and forget)
    supabase
      .from('services')
      .update({ view_count: (service.view_count || 0) + 1 })
      .eq('id', service.id)
      .then();
    
    return Response.json(
      successResponse({
        ...service,
        use_cases: useCasesRes.data || [],
        process_steps: processStepsRes.data || [],
        packages: packagesRes.data || [],
      })
    );
  } catch (error) {
    return handleApiError(error);
  }
}