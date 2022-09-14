import { NextResponse } from 'next/server'

export function middleware(request) {
  const cookie = request.cookies.get('app_accessToken')

  return !cookie ? NextResponse.redirect(new URL('/auth/login', request.url)) : NextResponse.next()
}

export const config = {
  matcher: '/property/:path*',
}
