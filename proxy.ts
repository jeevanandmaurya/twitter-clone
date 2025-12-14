import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {

  console.log('Proxy middleware executed at URL:', request.nextUrl.pathname);

  // 1. Check for your auth token (cookie)
  const hasAuth = request.cookies.has('fake-auth-token');
  
  // 2. Determine where the user is trying to go
  const isLoginPage = request.nextUrl.pathname.startsWith('/login');
  const isRoot = request.nextUrl.pathname === '/';  
  const isSignupPage = request.nextUrl.pathname.startsWith('/signup');
  const isProfilePage = request.nextUrl.pathname.startsWith('/profile');

  if (isSignupPage) {
    return NextResponse.next();
  }

  // Scenario A: User is NOT logged in, but trying to see the dashboard
  if (!hasAuth && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Scenario B: User IS logged in, but trying to see the login page
  if (hasAuth && (isRoot)) {
    return NextResponse.redirect(new URL('/home', request.url));
  }
  if (hasAuth && isProfilePage) {
    console.log('Redirecting profile to username');
    return NextResponse.redirect(new URL('/jeevanand', request.url));
  }

  // 3. Allow everything else
  return NextResponse.next();
}

// Configuration to prevent the proxy from running on images/static files
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};