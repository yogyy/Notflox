import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const token =
  process.env.NODE_ENV === 'production'
    ? '__Secure-next-auth.session-token'
    : 'next-auth.session-token';

export function middleware(req: NextRequest) {
  const session = req.cookies.get(token);
  // const session = await getServerSession

  const redirect = (url: string, reqUrl: string) => {
    return NextResponse.redirect(new URL(url, reqUrl));
  };

  // Checks if no session exists
  if (!session) {
    return redirect('/auth', req.url);
  }
}

export const config = {
  matcher: ['/', '/testing', '/anime', '/tv/:path*', '/movie/:path*'],
};
