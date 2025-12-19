// app/api/cms/rentals/[id]/route.ts
// CMS API for single rental - GET, PUT, DELETE
import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { updateRentalSchema } from '@/lib/schemas/rental.schema';
import { ApiError, handleApiError, successResponse } from '@/lib/utils/api-error';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    
    // Get rental with category
    const { data: rental, error } = await supabase
      .from('rental_items')
      .select(`
        *,
        rental_categories (
          id,
          name,
          slug
        )
      `)
      .eq('id', id)
      .is('deleted_at', null)
      .single();
    
    if (error || !rental) {
      throw ApiError.notFound('Rental item');
    }
    
    return Response.json(successResponse(rental));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const body = await request.json();
    
    // Validate input
    const validationResult = updateRentalSchema.safeParse({ ...body, id });
    if (!validationResult.success) {
      throw ApiError.badRequest('Validation failed', {
        validation: validationResult.error.errors.map((e) => e.message),
      });
    }
    
    const rentalData = validationResult.data;
    
    // Check rental exists
    const { data: existingRental } = await supabase
      .from('rental_items')
      .select('id, slug')
      .eq('id', id)
      .is('deleted_at', null)
      .single();
    
    if (!existingRental) {
      throw ApiError.notFound('Rental item');
    }
    
    // Check for duplicate slug (if changed)
    if (rentalData.slug && rentalData.slug !== existingRental.slug) {
      const { data: duplicateSlug } = await supabase
        .from('rental_items')
        .select('id')
        .eq('slug', rentalData.slug)
        .is('deleted_at', null)
        .neq('id', id)
        .single();
      
      if (duplicateSlug) {
        throw ApiError.conflict('A rental item with this slug already exists');
      }
    }
    
    // Update rental
    const { data: rental, error: rentalError } = await supabase
      .from('rental_items')
      .update(rentalData)
      .eq('id', id)
      .select()
      .single();
    
    if (rentalError) {
      throw ApiError.internal(rentalError.message);
    }
    
    return Response.json(successResponse(rental));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    
    // Soft delete
    const { error } = await supabase
      .from('rental_items')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id)
      .is('deleted_at', null);
    
    if (error) {
      throw ApiError.internal(error.message);
    }
    
    return Response.json(successResponse({ deleted: true }));
  } catch (error) {
    return handleApiError(error);
  }
}