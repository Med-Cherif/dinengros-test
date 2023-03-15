import { protectedRoutes, authRoutes } from './utils/urls';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const token = request.cookies.get('front_token');

    if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
        const response = NextResponse.redirect(new URL('/login', request.url))
        return response
    }
    
    if (authRoutes.includes(request.nextUrl.pathname) && !!token) {
        const response = NextResponse.redirect(new URL('/', request.url))
        return response
    }

    
    return response
}