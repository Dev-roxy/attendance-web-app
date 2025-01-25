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
    if (request.nextUrl.pathname == '/login'){
      return NextResponse.next()
    }else{
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  const accessToken = token.value
  const refreshToken = request.cookies.get('refreshToken').value;
  try {
    const { payload } = await jwtVerify(accessToken, new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET));
    const response = NextResponse.next();
    response.cookies.set('user', JSON.stringify(payload), cookiesOptions);
    console.log(payload);
    
    if (request.nextUrl.pathname.startsWith(`/${payload.userType}`)) {
      return response;
    } else {
      return NextResponse.redirect(new URL(`/${payload.userType}/dashboard`, request.url));
    }
    
  } catch (error) {
    let response = await fetch('/api/user/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
    if (response.ok) {
      const data = await response.json();
      const { payload } = await jwtVerify(data.accessToken, new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET));
      const response = NextResponse.next();
      response.cookies.set('accessToken', data.accessToken, cookiesOptions);
      response.cookies.set('refreshToken', data.refreshToken, cookiesOptions);
      response.cookies.set('user', JSON.stringify(payload), cookiesOptions);
      if (request.nextUrl.pathname.startsWith(`/${payload.userType}`)) {
        return response;
      } else {
        return NextResponse.redirect(new URL(`/${payload.userType}/dashboard`, request.url));
      }
    }
    if (response.status === 401) {
      if (request.nextUrl.pathname == '/login'){
        return NextResponse.next()
      }else{
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }
  
  
  
}


export const config={

    matcher: ['/student/:path*', '/admin/:path*', '/teacher/:path*','/:any*' ], // Match all routes under /dashboard and other protected routes
 
}



