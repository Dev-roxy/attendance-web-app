"use server";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "next/dist/server/api-utils";
import { ApiResponse } from "../../utils/ApiResponse";
import { User } from "../../models/user.model";
import { cookies } from "next/headers";
import { connectDB } from "@/connections/index";

import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
// to access cookies of the user
const userCookies = await cookies();

// cookies options
const cookiesOptions = {
  httpOnly: true,
  secure: true,
};

// Generate access and refresh token
const generateAccessAndRefreshToken = async user => {
  try {
    const accessToken = await jwt.sign(
      { userId: user.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    );
    const refreshToken = await jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
    );
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, error.message);
  }

};

const loginUserAction = async event => {
  let isUserValid = false;
  // just a dummy login for development purposes
  try {
    await connectDB();
    const email = event.get("email");
    const password = event.get("password");
    if (email == "dev@gmail.com" && password == "dev@123") {
      isUserValid = true;
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(User);

    // set the access token in the cookies
    userCookies.set("accessToken", accessToken, cookiesOptions)
    .set("refreshToken", refreshToken, cookiesOptions);
      isUserValid = true; //set to true if login is successfull

    return new ApiResponse(200, { message: "Login successful" });
  } catch (error) {
    return new ApiError(500, error.message);
  } finally {
    if (isUserValid) {
      console.log("Login successful");
      redirect("/dashboard"); //redirect to dashboard
    } else {
      console.log("Login failed"); //login failed message to be displayed
    }
  }
};

export { loginUserAction };
