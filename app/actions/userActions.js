"use server";
import * as jose from "jose";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "next/dist/server/api-utils";
import { ApiResponse } from "../../utils/ApiResponse";
import { User } from "../../models/user.model";
import { cookies } from "next/headers";
import { connectDB } from "@/connections/index";

import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import next from "next";
// to access cookies of the user


// cookies options
const cookiesOptions = {
  httpOnly: true,
  secure: true,
};

// Generate access and refresh token
const generateAccessAndRefreshToken = async user => {
  await connectDB();
  try {
    const accessToken = await jose.SignJWT(
      {
        userId: user.userId,
        email: user.email,
        password: user.password,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    );
    const refreshToken = await jose.SignJWT(
      { userId: user.userId },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
    );
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};



export { loginUserAction };
