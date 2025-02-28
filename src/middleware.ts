import { AUTH, ROUTES } from "@/config/constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH.COOKIE_TOKEN)?.value || "";
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  const isPublicPath = request.nextUrl.pathname === "/";

  // Allow public paths without authentication
  if (isPublicPath) {
    return NextResponse.next();
  }

  // If trying to access auth page while already logged in
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  // If trying to access protected route without token
  if (!isAuthPage && !token) {
    return NextResponse.redirect(new URL(ROUTES.AUTH_LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
