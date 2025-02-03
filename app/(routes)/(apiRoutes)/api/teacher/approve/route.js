import { NextResponse } from "next/server";
import { connectDB } from "@/connections";
import Teacher from "@/models/teacher.model";
import Approval from "@/models/approval.model";

export async function POST(Request) {
  try {
    await connectDB();

    const { enrollment_no, action } = await Request.json();

    console.log({ enrollment_no, approved: false, userType: "teacher" });

    // Find and delete the teacher from the Approval collection
    const teacher = await Approval.findOneAndDelete({
      enrollment_no,
      approved: false,
      userType: "teacher",
    });

    // If no teacher found, return a 404 response
    if (!teacher) {
      return NextResponse.json({
        message: "Teacher not found",
        status: 404,
        success: false,
      });
    }

    // Add additional fields to the teacher object before saving
    let teacherData = teacher.toObject();

    teacherData.approved = true;
    teacherData.approvedOn = new Date();
    delete teacherData.updatedOn

    // Convert plain object to a Teacher model instance
    const newTeacher = await Teacher.create(teacherData);

    // Save the teacher to the database
    await newTeacher.save();

    // Return a success response
    return NextResponse.json({
      message: "Teacher approved",
      status: 200,
      success: true,
      enrollment_no: teacher.enrollment_no,
    });
  } catch (error) {
    console.error("Error during teacher approval:", error);

    // Return an error response
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
      success: false,
    });
  }
}
