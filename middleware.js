import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {

  // just to resolve css error
  if (request.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
    }

  const token = request.cookies.get('accessToken') || request.headers.get('Authorization')?.split(' ')[1];
  console.log(request.nextUrl)
  if (!token) {
    if (request.nextUrl.pathname == '/login'){
      return NextResponse.next()
    }else{
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  const accessToken = token.value
  try {
    const { payload } = await jwtVerify(accessToken, new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET));
    request.user = payload;
  } catch (error) {
     if (request.nextUrl.pathname == '/login'){
      return NextResponse.next()
     }else{
      return NextResponse.redirect(new URL('/login', request.url));
     }
  }

  return NextResponse.next();
}
const protectedRoutes = ["/dashboard" ,"/dashboard/:any*"];



