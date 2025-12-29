import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {getCurrentUser} from '@/lib/supabase/server';

export async function proxy(request: NextRequest) {

  console.log('Proxy middleware executed at URL:', request.nextUrl.pathname);

  const currentUser = await getCurrentUser();
  const hasAuth = currentUser ? true : false;

  console.log('User authenticated:', hasAuth);
  if (hasAuth) {
    console.log('Current Email:', currentUser?.email);
  }
 
  const isRoot = request.nextUrl.pathname === '/';  
  const isSignUpPage = request.nextUrl.pathname === '/signup';
  const isLoginPage = request.nextUrl.pathname.startsWith('/login');
  const isProfilePage = request.nextUrl.pathname.startsWith('/profile');

  if (!hasAuth && isSignUpPage) {
    return NextResponse.redirect(new URL('/signup', request.url));
  }

  if (!hasAuth && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (hasAuth && (isLoginPage || isSignUpPage || isRoot)) {
    return NextResponse.redirect(new URL('/home', request.url));
  }
  if (hasAuth && isProfilePage) {
    console.log('Redirecting profile to username');
    return NextResponse.redirect(new URL('/jeevanand', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};