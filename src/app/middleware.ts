import { AUTH, ROUTES } from '@/config/constants'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const userToken = request.cookies.get(AUTH.COOKIE_TOKEN)?.value

  if (!userToken)
    return NextResponse.redirect(new URL(ROUTES.AUTH_LOGIN, request.url))
  else return NextResponse.redirect(new URL(ROUTES.HOME, request.url))
}

export const config = {
  matcher:
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
}
