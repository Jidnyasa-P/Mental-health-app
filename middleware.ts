import { updateSession } from '@/lib/supabase/proxy'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // Get the session
  const response = await updateSession(request)
  
  // Protected routes that require authentication
  const protectedPaths = ['/dashboard', '/protected']
  const publicPaths = ['/', '/auth/login', '/auth/signup', '/privacy', '/terms', '/about', '/contact']
  
  const { pathname } = request.nextUrl
  
  // Check if the route is protected
  const isProtectedRoute = protectedPaths.some(path => pathname.startsWith(path))
  const isPublicRoute = publicPaths.some(path => pathname === path || pathname.startsWith(path))
  
  // Get the session from the response headers
  const sessionCookie = request.cookies.get('sb-access-token')?.value
  
  // If accessing protected route without session, allow for now (demo mode)
  // In production, redirect to login: if (isProtectedRoute && !sessionCookie) return NextResponse.redirect(new URL('/auth/login', request.url))
  
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
