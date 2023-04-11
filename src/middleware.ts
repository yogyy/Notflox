import { NextResponse } from 'next/server';

export default function middleware(request: {
  url: string | URL | undefined;
  nextUrl: { pathname: string };
}) {
  if (request.nextUrl.pathname.startsWith('/tv/')) {
    return NextResponse.redirect(new URL('/series', request.url));
  }
  if (request.nextUrl.pathname === '/movie/') {
    return NextResponse.redirect(new URL('/movies', request.url));
  }
  return NextResponse.next();
}
