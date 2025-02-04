import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// cookies options
const cookiesOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
};

export async function middleware(request) {
  // const requestData = await request.json();
  // just to resolve css error
  if (request.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const token = request.cookies.get('accessToken') || request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    if (request.nextUrl.pathname == '/auth') {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }
  const accessToken = token.value
  const refreshToken = request.cookies.get('refreshToken').value;
  try {
    const { payload } = await jwtVerify(accessToken, new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET));

   
    const response = NextResponse.next();
    response.cookies.set('user', JSON.stringify(payload), cookiesOptions);


    if (request.nextUrl.pathname.startsWith(`/${payload.userType}`)) {
      return response;
    } else {
      return NextResponse.redirect(new URL(`/${payload.userType}/dashboard`, request.url));
    }

  } catch (error) {
   
      if (request.nextUrl.pathname == '/auth') {
        return NextResponse.next()
      } else {
        return NextResponse.redirect(new URL('/auth', request.url));
      }
    
  }



}


export const config = {

  matcher: ['/student/:path*', '/admin/:path*', '/teacher/:path*'], // Match all routes under /dashboard and other protected routes

}



