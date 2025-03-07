import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token");
  const { pathname } = request.nextUrl;

  if (authToken && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!authToken) {
    const publicPaths = ["/auth/signin", "/auth/register"];
    if (publicPaths.includes(pathname)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*", "/dashboard/:path*"],
};
