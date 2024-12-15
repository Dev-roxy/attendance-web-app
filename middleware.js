import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request) {

 

  const token =  request.headers.get('Authorization')?.split(' ')[1] || null;

  
  if (!token) {
    return NextResponse.redirect(new URL('/login' ,request.nextUrl).href);
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      return NextResponse.redirect(new URL('/login' ,request.nextUrl.origin).href);
    }
    console.log("decoded",decoded);
    request.user = decoded;
    return NextResponse.redirect(new URL('/dashboard' ,request.nextUrl.origin).href);

  } catch (error) {
    console.log(error.message);
    
  }

}

export const config = {
  matcher: '/:any*',
};