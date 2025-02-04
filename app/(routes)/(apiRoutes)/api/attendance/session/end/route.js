import { NextResponse } from "next/server";
import Session from "@/models/session.model";
import Teacher from "@/models/teacher.model";
import Attendance from "@/models/attendance.model";
import fs from "fs";
import Student from "@/models/student.model";
import { connectDB } from "@/connections";



export async function POST(request) {
    await connectDB();
    const { enrollment_no, sessionCode } = await request.json();
    try {
        const teacher = await Teacher.findOne({ enrollment_no }).exec()

        if (!teacher) {
            return NextResponse.json({
                message: "Teacher not found",
                success: false,
            }, { status: 404 });
        }
        const session = await Session.findOne({ sessionCode, isActive: true }).exec()
        console.log({ sessionCode, "teacher.enrollment_no" : enrollment_no, isActive: true })
        if (!session) {
            return NextResponse.json({
                message: "Session not found",
                success: false,
            }, { status: 404 });
        }
        session.isActive = false;
        session.save({ timestamps: { createdAt: false, updatedAt: "endedAt" }, validateBeforeSave: false });

        if (!session) {
            return NextResponse.json({
                message: "Session not found",
                success: false,
            }, { status: 404 });
        }
        // get the sessions created by the teacher
        let tempSessions = fs.readFileSync(process.cwd() + "/temp/memory/session/session.json", "utf-8");
        tempSessions = JSON.parse(tempSessions);

        // Find the index of the session in the tempSessions array and key to get the students who attended the session
        const sessionIndex = tempSessions.findIndex((s) => s.sessionCode === sessionCode);
        const sessionStudentsKey = `${enrollment_no}-${sessionCode}`;

        // Get the students who attended the session
        let tempAttendance = fs.readFileSync(process.cwd() + "/temp/memory/session/attendance.json", "utf-8");
        tempAttendance = JSON.parse(tempAttendance);
        let students = tempAttendance[sessionStudentsKey];

        const presentStudents = students.filter((student) =>{
            if (student.present) {
                return student
            }
        });
      if (!presentStudents) {
            return NextResponse.json({
                message: "No student attended the session",
                success: false,
            }, { status: 400 });
        }
        console.log(presentStudents)
        console.log(students)

        // Remove the session from the tempSessions array and write the updated array to the file
        tempSessions.splice(sessionIndex, 1);

        // Write the updated tempSessions array to the file
        fs.writeFileSync(process.cwd() + "/temp/memory/session/session.json", JSON.stringify(tempSessions), "utf-8");

        // Remove the students who attended the session from the tempAttendance object and write the updated object to the file
        delete tempAttendance[sessionStudentsKey];
        fs.writeFileSync(process.cwd() + "/temp/memory/session/attendance.json", JSON.stringify(tempAttendance), "utf-8");

        // Return success message and status code 200 
       
        return NextResponse.json({
            message: "Session ended successfully",
            success: true,
            students : presentStudents
        }, { status: 200 });


    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: error.message,
            success: false,
        }, { status: 500 });
    }
}