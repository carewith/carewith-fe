import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  console.log(url)
  const accessToken = url.searchParams.get('accessToken');
  const refreshToken = url.searchParams.get('refreshToken');

  if (accessToken && refreshToken) {
    const response = NextResponse.redirect(new URL('/', request.url));
    
    response.cookies.set('accessToken', accessToken);
    response.cookies.set('refreshToken', refreshToken);

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
