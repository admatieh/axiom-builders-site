import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { ROUTE_PERMISSIONS, hasPermission } from '@/lib/permissions';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Always allow the login page itself (otherwise we'd get an infinite redirect)
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Read the JWT from the HTTP-only cookie
  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Verify the JWT
  const user = await verifyToken(token);

  if (!user) {
    // Token is invalid or expired — redirect to login and clear the bad cookie
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.set('admin_token', '', { maxAge: 0, path: '/' });
    return response;
  }

  // Check route-level permissions
  for (const [routePrefix, requiredPermission] of Object.entries(ROUTE_PERMISSIONS)) {
    if (pathname.startsWith(routePrefix)) {
      if (!hasPermission(user.permissions, requiredPermission)) {
        // Authenticated but not authorized — redirect to dashboard
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      break;
    }
  }

  // Pass user info to downstream Server Components via request header
  // (JSON-serialized so pages can read it without another DB hit)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-admin-user', JSON.stringify(user));

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: '/admin/:path*',
};
