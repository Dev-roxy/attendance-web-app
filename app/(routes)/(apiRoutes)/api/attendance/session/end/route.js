import { NextResponse } from "next/server";
import Session from "@/models/session.model";
import Teacher from "@/models/teacher.model";
import Attendance from "@/models/attendance.model";
import fs from "fs";
import Student from "@/models/student.model";
import { connectDB } from "@/connections";


const dummy = [
    {
        "sessionId": "a1b2c3d4e5f60708192a",
        "student": {
            "enrollment_no": "24BTIT1001",
            "latitude": 20.916500,
            "longitude": 77.769000,
            "accuracy": 105
        },
        "attendedOn": "2025-02-05T14:00:00.000Z",
        "present": true
    },
    {
        "sessionId": "b2c3d4e5f60708192a3b",
        "student": {
            "enrollment_no": "24BTIT1002",
            "latitude": 20.917200,
            "longitude": 77.767500,
            "accuracy": 98
        },
        "attendedOn": "2025-02-05T14:01:30.000Z",
        "present": true
    },
    {
        "sessionId": "c3d4e5f60708192a3b4c",
        "student": {
            "enrollment_no": "24BTIT1003",
            "latitude": 20.915900,
            "longitude": 77.768200,
            "accuracy": 120
        },
        "attendedOn": "2025-02-05T14:03:45.000Z",
        "present": false
    },
    {
        "sessionId": "d4e5f60708192a3b4c5d",
        "student": {
            "enrollment_no": "24BTIT1004",
            "latitude": 20.916700,
            "longitude": 77.769300,
            "accuracy": 95
        },
        "attendedOn": "2025-02-05T14:05:10.000Z",
        "present": true
    },
    {
        "sessionId": "e5f60708192a3b4c5d6e",
        "student": {
            "enrollment_no": "24BTIT1005",
            "latitude": 20.918000,
            "longitude": 77.766800,
            "accuracy": 130
        },
        "attendedOn": "2025-02-05T14:07:00.000Z",
        "present": false
    },
    {
        "sessionId": "f60708192a3b4c5d6e7f",
        "student": {
            "enrollment_no": "24BTIT1006",
            "latitude": 20.916300,
            "longitude": 77.768600,
            "accuracy": 110
        },
        "attendedOn": "2025-02-05T14:08:25.000Z",
        "present": true
    },
    {
        "sessionId": "08192a3b4c5d6e7f8g9h",
        "student": {
            "enrollment_no": "24BTIT1007",
            "latitude": 20.915800,
            "longitude": 77.767900,
            "accuracy": 102
        },
        "attendedOn": "2025-02-05T14:10:15.000Z",
        "present": true
    },
    {
        "sessionId": "92a3b4c5d6e7f8g9h0i1",
        "student": {
            "enrollment_no": "24BTIT1008",
            "latitude": 20.917600,
            "longitude": 77.765500,
            "accuracy": 140
        },
        "attendedOn": "2025-02-05T14:12:40.000Z",
        "present": false
    },
    {
        "sessionId": "a3b4c5d6e7f8g9h0i1j2",
        "student": {
            "enrollment_no": "24BTIT1009",
            "latitude": 20.916100,
            "longitude": 77.769800,
            "accuracy": 90
        },
        "attendedOn": "2025-02-05T14:15:05.000Z",
        "present": true
    },
    {
        "sessionId": "b4c5d6e7f8g9h0i1j2k3",
        "student": {
            "enrollment_no": "24BTIT1010",
            "latitude": 20.915500,
            "longitude": 77.768300,
            "accuracy": 115
        },
        "attendedOn": "2025-02-05T14:17:20.000Z",
        "present": false
    }
]


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
            students: dummy
        }, { status: 200 });


    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: error.message,
            success: false,
        }, { status: 500 });
    }
}