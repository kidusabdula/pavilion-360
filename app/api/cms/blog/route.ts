import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ApiError, handleApiError, successResponse } from '@/lib/utils/api-error';
import { createBlogSchema } from '@/lib/schemas/blog.schema';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category');
    
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        blog_categories (
          id,
          name,
          slug
        )
      `, { count: 'exact' })
      .is('deleted_at', null)
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (search) {
      query = query.ilike('title', `%${search}%`);
    }
    
    if (category && category !== 'all') {
      query = query.eq('category_id', category);
    }
    
    const { data, error, count } = await query;
    
    if (error) throw ApiError.internal(error.message);
    
    return Response.json(successResponse(data, {
      page, limit, total: count || 0, totalPages: Math.ceil((count || 0) / limit)
    }));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    
    const validation = createBlogSchema.safeParse(body);
    if (!validation.success) {
      throw ApiError.badRequest('Validation failed', validation.error.flatten().fieldErrors);
    }
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(validation.data)
      .select()
      .single();
    
    if (error) throw ApiError.internal(error.message);
    
    return Response.json(successResponse(data), { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}