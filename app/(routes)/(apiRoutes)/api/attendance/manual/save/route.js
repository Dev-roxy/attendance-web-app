import { NextResponse } from "next/server";
import Attendance from "@/models/attendance.model";
import { connectDB } from "@/connections";
import { manualAttendance } from "@/temp/memory/memory";

export async function POST(req) {
    try {
        await connectDB();
        const {students ,teacherId} = await req.json();
        if (!students){
            return NextResponse.json({
                message : "please provide students",
                status : 400
            })
        }
        if(manualAttendance.includes(teacherId)){
            return NextResponse.json({
                message : "Attendance already saved",
                status : 400
            })
        }
        const presentStudent = students.filter((student,index)=>{
            if((student.present)|| (student.attendedon)){
                return student
            }
        })


        const attendance = await Attendance.create(presentStudent);
        
        manualAttendance.push(teacherId)

        setTimeout(() => {
            const teacherIndex = manualAttendance.indexOf(teacherId)
            manualAttendance.splice(teacherIndex,1)
        }, 600000);

        return NextResponse.json({
            message : "Attendance saved successfully",
            status : 200,
            success : true
        })


    } catch (error) {
        return NextResponse.json({
            message : "Internal server error",
            status : 500
        })
    }
}