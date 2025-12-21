import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ApiError, handleApiError, successResponse } from '@/lib/utils/api-error';
import { updateBlogSchema } from '@/lib/schemas/blog.schema';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        blog_categories (
          id,
          name,
          slug
        )
      `)
      .eq('id', id)
      .is('deleted_at', null)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        throw ApiError.notFound('Blog post');
      }
      throw ApiError.internal(error.message);
    }
    
    return Response.json(successResponse(data));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const body = await request.json();
    
    const validation = updateBlogSchema.safeParse({ id, ...body });
    if (!validation.success) {
      throw ApiError.badRequest('Validation failed', validation.error.flatten().fieldErrors);
    }
    
    const { data, error } = await supabase
      .from('blog_posts')
      .update(validation.data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        throw ApiError.notFound('Blog post');
      }
      throw ApiError.internal(error.message);
    }
    
    return Response.json(successResponse(data));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('blog_posts')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') {
        throw ApiError.notFound('Blog post');
      }
      throw ApiError.internal(error.message);
    }
    
    return Response.json(successResponse({ id }));
  } catch (error) {
    return handleApiError(error);
  }
}