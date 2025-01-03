import { NextResponse } from "next/server";


export const redirectToPath = (path, request) => {
    if (request.nextUrl.pathname.startsWith("/login")) {
      
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL(path, request.nextUrl.origin).href);
    }
  };