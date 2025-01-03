import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { status } from "nprogress";
// import { connectDB } from '@/utils/db';
// import User from '@/models/user';

// cookies options
const cookiesOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
};

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Connect to the database
    // await connectDB();

    // Dummy login logic for development purposes
    if (email === "dev@gmail.com" && password === "dev@123") {
      const user = { userId: "12345", email: "dev@gmail.com" }; // Dummy user data
      const accessToken = await new SignJWT({ userId: user.userId })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(process.env.ACCESS_TOKEN_EXPIRE)
        .sign(new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET));
      const refreshToken = await new SignJWT({ userId: user.userId })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(process.env.REFRESH_TOKEN_EXPIRE)
        .sign(new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET));

      if (!accessToken || !refreshToken) {
        return NextResponse.json(
          { message: "Error in generating tokens" },
          { status: 500 }
        );
      }

      const response = NextResponse.json({
        message: "Login successful",
        success: true,
        tokens: { accessToken, refreshToken },
      });

      response.cookies.set("accessToken", accessToken, cookiesOptions);
      response.cookies.set("refreshToken", refreshToken, cookiesOptions);

      return response;
    } else {
      return NextResponse.json({
        message: "Invalid email or password",
        status: 401,
        success: false, 
      });
    }
  } catch (error) {
    console.error("Login failed", error);
    return NextResponse.json(
      { message: "Internal server error" ,
        status: 500,
        success: false,
      },
      
    );
  }
}
