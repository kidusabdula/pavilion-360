import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function proxy(request: NextRequest) {
  // Create response to modify
  let response = NextResponse.next({ request });
  
  // Create Supabase client with cookie handling
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response = NextResponse.next({ request });
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );
  
  // IMPORTANT: Refresh session - this validates the token
  const { data: { user }, error } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;
  
  // Define protected routes
  const isLoginPage = pathname === '/cms/login';
  const isAuthCallback = pathname === '/api/auth/callback';
  const isProtectedPage = pathname.startsWith('/cms') && !isLoginPage;
  const isProtectedApi = pathname.startsWith('/api/cms');
  
  // Allow auth callback through
  if (isAuthCallback) {
    return response;
  }
  
  // If on login page and already authenticated, redirect to dashboard
  if (isLoginPage && user) {
    const role = user.user_metadata?.role;
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/cms', request.url));
    }
  }
  
  // Check protected routes
  if (isProtectedPage || isProtectedApi) {
    // No user = redirect to login (for pages) or return 401 (for API)
    if (!user) {
      if (isProtectedApi) {
        return NextResponse.json(
          { success: false, error: { message: 'Unauthorized', code: 'UNAUTHORIZED' } },
          { status: 401 }
        );
      }
      const loginUrl = new URL('/cms/login', request.url);
      loginUrl.searchParams.set('returnTo', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Check admin role
    const role = user.user_metadata?.role;
    if (role !== 'admin') {
      if (isProtectedApi) {
        return NextResponse.json(
          { success: false, error: { message: 'Forbidden - Admin access required', code: 'FORBIDDEN' } },
          { status: 403 }
        );
      }
      // Redirect non-admins to access denied or home
      return NextResponse.redirect(new URL('/?error=access_denied', request.url));
    }
  }
  
  return response;
}

export const config = {
  matcher: [
    '/cms/:path*',
    '/api/cms/:path*',
    '/api/auth/:path*',
  ],
};