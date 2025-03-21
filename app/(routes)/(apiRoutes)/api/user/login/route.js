import { NextResponse } from "next/server";
import { connectDB } from "@/connections";
import Teacher from "@/models/teacher.model";
import Admin from "@/models/admin.model";
import Student from "@/models/student.model";
import Approval from "@/models/approval.model";

// cookies options
const cookiesOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
};

export async function POST(req) {
  try {
    const userData = await req.json();
    const { userType, email, password } = userData;

    await connectDB();

    let user;

    switch (userType) {
      case "admin":
        user = await Admin.findOne({ email, userType: "admin" });
        if (!user) {
          return NextResponse.json({
            message: "You are not registered as admin",
            status: 401,
            success: false,
          });
        }
        break;

      case "student":
        user = await Student.findOne({ email, userType: "student" });
        break;

      case "teacher":
        user = await Teacher.findOne({ email, userType: "teacher" });
        if (!user) {
          user = await Approval.findOne({ email, userType: "teacher" });
          if (user) {
            if (user.rejected) {
              if (user.timesRejected > 2) {
                return NextResponse.json({
                  message: "Your account is rejected 3 times, You can't re-apply",
                  status: 401,
                  success: false,
                  rejected: true,
                });
              } else {
                return NextResponse.json({
                  message: "Your account is rejected, You can re-apply",
                  status: 401,
                  success: false,
                  rejected: true,
                });
              }
            } else {
              return NextResponse.json({
                message: "Your account is not approved yet, Contact Admin",
                status: 401,
                success: false,
              });
            }
          }
        }
        break;

      default:
        return NextResponse.json({
          message: "Invalid user type",
          status: 400,
          success: false,
        });
    }

    if (!user) {
      return NextResponse.json({
        message: "Invalid email or password",
        status: 404,
        success: false,
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return NextResponse.json({
        message: "Invalid password",
        status: 401,
        success: false,
      });
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    if (!accessToken || !refreshToken) {
      return NextResponse.json({
        message: "Error in generating tokens",
        status: 500,
        success: false,
      });
    }

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      tokens: { accessToken, refreshToken },
    });
    response.cookies.set("accessToken", accessToken, cookiesOptions);
    response.cookies.set("refreshToken", refreshToken, cookiesOptions);
    return response;

  } catch (error) {
    console.error("Login failed", error);
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
      success: false,
    });
  }
}