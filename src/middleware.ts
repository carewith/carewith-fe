import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (url.pathname === '/home') {
    const accessToken = url.searchParams.get('accessToken');
    const refreshToken = url.searchParams.get('refreshToken');
    if (accessToken && refreshToken) {
      const response = NextResponse.next();
      
      response.cookies.set('accessToken', accessToken, { 
      });
      response.cookies.set('refreshToken', refreshToken, {
      });

      return response;
    }
  }
  if (url.pathname === '/home' && !request.cookies.get('accessToken')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/home'],
};
