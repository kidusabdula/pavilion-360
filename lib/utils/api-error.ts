// lib/utils/api-error.ts
// API Error handling utilities

export interface ApiErrorDetails {
  [key: string]: string[];
}

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: ApiErrorDetails;
  
  constructor(
    statusCode: number,
    code: string,
    message: string,
    details?: ApiErrorDetails
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
  
  static badRequest(message: string, details?: ApiErrorDetails) {
    return new ApiError(400, 'BAD_REQUEST', message, details);
  }
  
  static unauthorized(message = 'Unauthorized') {
    return new ApiError(401, 'UNAUTHORIZED', message);
  }
  
  static forbidden(message = 'Forbidden') {
    return new ApiError(403, 'FORBIDDEN', message);
  }
  
  static notFound(resource = 'Resource') {
    return new ApiError(404, 'NOT_FOUND', `${resource} not found`);
  }
  
  static conflict(message: string) {
    return new ApiError(409, 'CONFLICT', message);
  }
  
  static internal(message = 'Internal server error') {
    return new ApiError(500, 'INTERNAL_ERROR', message);
  }
  
  toJSON() {
    return {
      success: false,
      error: {
        code: this.code,
        message: this.message,
        details: this.details,
      },
    };
  }
}

/**
 * Create a success response
 */
export function successResponse<T>(data: T, meta?: Record<string, unknown>) {
  return {
    success: true,
    data,
    ...(meta && { meta }),
  };
}

/**
 * Create an error response
 */
export function errorResponse(error: ApiError | Error) {
  if (error instanceof ApiError) {
    return error.toJSON();
  }
  
  return {
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: error.message || 'An unexpected error occurred',
    },
  };
}

/**
 * Handle API errors in route handlers
 */
export function handleApiError(error: unknown): Response {
  console.error('API Error:', error);
  
  if (error instanceof ApiError) {
    return Response.json(error.toJSON(), { status: error.statusCode });
  }
  
  if (error instanceof Error) {
    return Response.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred',
        },
      },
      { status: 500 }
    );
  }
  
  return Response.json(
    {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred',
      },
    },
    { status: 500 }
  );
}