"use server";
import Attendance from "@/models/attendance.model";
import Student from "@/models/student.model";
import { connectDB } from "@/connections/index";
import { getUser } from "@/connections/fetchUser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getPercentageAction(userId) {
  try {
    await connectDB();
    const user = await getUser();
    const attendance = await Attendance.countDocuments({
      "student.enrollment_no": user.enrollment_no,
    });
    // const totalSessions = await
  } catch (error) {
    return error;
  }
}

export async function getAttendanceAction(userId) {
  try {
    await connectDB();
    const user = await getUser();
    const attendance = await Attendance.find({
      "student.enrollment_no": user.enrollment_no,
    });
    return attendance;
  } catch (error) {
    return error;
  }
}

export async function getAttendanceSessionAction(enrollment_no) {
  try {
    await connectDB();
    const attendance = await Attendance.find({
      "student.enrollment_no": enrollment_no,
    }).exec();
    return attendance;
  } catch (error) {
    return error;
  }
}

export async function logoutAction() {
  try {
    const cookieStore = cookies();

    cookieStore.set("accessToken", "", {
      path: "/",
      maxAge: 0,
    });

    cookieStore.set("refreshToken", "", {
      path: "/",
      maxAge: 0,
    });

  } catch (error) {
    if (error instanceof Error) {
      return {
        message: "Logout failed",
        status: 500,
        success: false,
        error: error.message,
      };
    }
    throw error; // Re-throw redirect or other non-Error objects
  }
}
