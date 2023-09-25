import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const session = req.cookies.get('next-auth.session-token');
  // const session = await getServerSession

  const redirect = (url: string, reqUrl: string) => {
    return NextResponse.redirect(new URL(url, reqUrl));
  };

  const startsWith = (url: string) => {
    return req.nextUrl.pathname.startsWith(url);
  };

  // Checks if no session exists
  if (!session) {
    return redirect('/auth', req.url);
  }

  if (session && startsWith('/auth')) return redirect('/profiles', req.url);
}

export const config = {
  matcher: ['/', '/testing', '/anime', '/tv/:path*', '/movie/:path*'],
};
