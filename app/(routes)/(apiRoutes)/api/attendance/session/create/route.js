import { NextResponse } from "next/server";
import Session from "@/models/session.model";
import Teacher from "@/models/teacher.model";
import Student from "@/models/student.model";
import { generateSessionId } from '@/utils/functions';
import tempSessionJson from "@/temp/memory/session/session.json";
import tempAttendanceJson from "@/temp/memory/session/attendance.json";
import fs from "fs";
import { connectDB } from "@/connections";



export async function POST(req) {
    await connectDB();
    const data = await req.json();
    const { enrollment_no,sessionCode, acadmicYear, branch, section, batch, latitude, longitude, accuracy } = data;
    try {
                    const teacher = await Teacher.findOne({enrollment_no});
        
                    if (!teacher) {
                        return NextResponse.json({
                            message: "Teacher not found",
                            success: false,
                        },{status: 404});
                    }
                    const session = await Session.create({
                        sessionId: await generateSessionId(),
                        sessionCode: sessionCode,
                        teacher: {
                            enrollment_no,
                            latitude,
                            longitude,
                            accuracy
                        },
                        isActive: true,
                    });
                    await session.save({timestamps: true});
            
                    const currentSession = {
                        sessionId: session.sessionId,
                        sessionCode: session.sessionCode,
                        teacher: session.teacher,
                        isActive: session.isActive,
                    };
            
                    let tempSessions = fs.readFileSync(process.cwd() + "/temp/memory/session/session.json", "utf-8") || "[]";
                    tempSessions = tempSessions == "" ? "[]" : tempSessions; // check if the file is empty
                    tempSessions = JSON.parse(tempSessions);
            
                    tempSessions.push(currentSession);
                    fs.writeFileSync(process.cwd() + "/temp/memory/session/session.json", JSON.stringify(tempSessions));
            
                    let students; 
                    if (acadmicYear && branch && section && batch) {
                        students = await Student.find({acadmicYear,branch,section,batch})
                        .select("enrollment_no firstName lastName rollNo")  
                        .lean()
                        .exec()
                    } else if (acadmicYear && branch && section) {
                        students = await Student.find({acadmicYear,branch,section})
                        .select("enrollment_no firstName lastName rollNo")  
                        .lean()
                        .exec();
                    }
                    if (!students) {
                        return NextResponse.json({
                            message: "No students found",
                            success: false,
                        });
                    }
                    students = students.map((student) => {
                        return {
                            sessionId: session.sessionId,
                            student: {
                                firstName : student.firstName,
                                lastName : student.lastName,
                                rollNo : student.rollNo,
                                enrollment_no: student.enrollment_no,
                                latitude: null,
                                longitude: null,
                                accuracy: null,
                                ip:null
                            },
                            attendedOn: null,
                            present:null
                        };
                    });
            
                    let tempAttendance = fs.readFileSync(process.cwd() + "/temp/memory/session/attendance.json", "utf-8") || "{}";
                    tempAttendance =  tempAttendance == "" ?  "{}" : tempAttendance; // check if the file is empty
                            tempAttendance = JSON.parse(tempAttendance);
                            tempAttendance[`${enrollment_no}-${sessionCode}`] = students;
                            fs.writeFileSync(process.cwd() + "/temp/memory/session/attendance.json", JSON.stringify(tempAttendance));
            
                    return NextResponse.json({
                        message: "Session created successfully",
                        sessionId: session.sessionId,
                        sessionCode: session.sessionCode,
                        success: true,
                    },{status: 201});
             

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Internal server error",
            success: false,
        }, { status: 500 });
    }

}