import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const token = request.cookies.get('accessToken') || request.headers.get('Authorization')?.split(' ')[1];
  const accessToken = token.value
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const { payload } = await jwtVerify(accessToken, new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET));
    request.user = payload;
  } catch (error) {
     return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
const protectedRoutes = ["/dashboard" ,"/dashboard/:any*"];


