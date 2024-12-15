import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { redirect } from "next/navigation"
export async function GET(request , response) {
 redirect("/login")
  return NextResponse.json(
    {
      message: "redirected to login",
    }
  )
}
 
