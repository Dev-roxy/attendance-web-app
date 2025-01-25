import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "next/dist/server/api-utils";
import { ApiResponse } from "../utils/ApiResponse";
import  User  from "../models/teacher.model";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {connectDB} from "@/connections/index";

// to access cookies of the user
const userCookies = cookies();

// Generate access and refresh token
const generateAccessAndRefreshToken = user => {
  try {
    const accessToken = jwt.sign(
      { userId: user.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    );
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
    );
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

// Register user

export const registerUser = asyncHandler(async (req, res) => {
  try {
    await connectDB();
    const { firstName, lastName, userId, email, password } = req.body;
    const userExists = await User.findOne({
      $or: [{ email: email }, { userId: userId }],
    }).select("-refreshToken");

    if (userExists) {
      throw new ApiError(400, "User already exists");
    }
    const user = await User.create({
      firstName,
      lastName,
      userId,
      email,
      password,
    });
    const { accessToken, refreshToken } = generateAccessAndRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();
    res
      .status(200)
      .userCookies.set("accessToken", accessToken, options)
      .userCookies.set("refreshToken", refreshToken, options)
      .json(new ApiResponse(true, {}, "User registered successfully"));

    redirect("/dashboard");
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

// Login user
export const loginUser = async event => {
  try {
    await connectDB();
    const email = event.get("email");
    const password = event.get("password");
    if (!email || !password) {
      throw new ApiError(400, "Please provide email and password");
    }
    const user = await User.findOne({
      $or: [{ email: email }, { password: password }],
    });
    if (user.email !== email || user.password !== password) {
      throw new ApiError(401, "Invalid credentials");
    }

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }
    const { accessToken, refreshToken } = generateAccessAndRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false ,timestamps: false});

    userCookies.set("accessToken", accessToken, options);
    userCookies.set("refreshToken", refreshToken, options);
    redirect("/dashboard");
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

// Logout user
export const logout = asyncHandler(async (req, res) => {
  try {
    await connectDB();
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    await connectDB();
    const { userRefreshToken } = req.cookies;
    if (!userRefreshToken) {
      throw new ApiError(401, "Please login to continue");
    }
    const decoded = jwt.verify(
      userRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!decoded) {
      throw new ApiError(401, "Invalid token").redirect("/login"); //redirect to login page
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const { accessToken, newRefreshToken } =
      generateAccessAndRefreshToken(user);
    user.refreshToken = newRefreshToken;
    await user.save();
    res
      .status(200)
      .userCookies.set("accessToken", accessToken, options)
      .userCookies.set("refreshToken", newRefreshToken, options)
      .json(new ApiResponse(true, {}, "Token refreshed successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});
