import { NextResponse } from "next/server";
import { connectDB } from "@/connections";
import Teacher from "@/models/teacher.model";
import Approval from "@/models/approval.model";

export async function POST(Request) {
  try {
    await connectDB();

    const { teacherId, action } = await Request.json();


    // Find and delete the teacher from the Approval collection
    const teacher = await Approval.findOneAndDelete({
      teacherId,
      approved: false,
      userType: "teacher",
    });

    const updatedTeacher = await Approval.create({ ...teacher.toObject(), rejected: true, rejectedOn: new Date(), timesRejected: (teacher.timesRejected || 0) + 1 });


    // If no teacher found, return a 404 response
    if (!teacher) {
      return NextResponse.json({
        message: "Teacher not found",
        status: 404,
        success: false,
      });
    }


    console.log(teacher)
    // Save the teacher to the database
    await updatedTeacher.save({ validateBeforeSave: false });

    // Return a success response
    return NextResponse.json({
      message: "Teacher rejected successfully",
      status: 200,
      success: true,
      teacherId: teacher.teacherId,
    });
  } catch (error) {
    console.error("Error during teacher rejection:", error.message);

    // Return an error response
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
      success: false,
    });
  }
}
