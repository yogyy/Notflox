import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function middleware(req: NextRequest) {
  const sessionCookie = getSessionCookie(req, {
    cookiePrefix: "notflox-app",
  });

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
}

export const config = {
  matcher: ["/", "/search", "/anime", "/tv/:path*", "/movie/:path*"],
};
