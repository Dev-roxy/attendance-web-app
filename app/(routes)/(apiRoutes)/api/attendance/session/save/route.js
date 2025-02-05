import { NextResponse } from "next/server";
import Attendance from "@/models/attendance.model";
import { connectDB } from "@/connections";

export async function POST(request) {
    try {
        await connectDB();
        const  students  = await request.json();

        const presentStudents = students.filter((student) =>{
                    if (student.present) {
                        return student
                    }
                });
              


        const attendance = await Attendance.insertMany(presentStudents)

       
        return NextResponse.json({
            message: "Attendance saved successfully",
            success: true,
            status : 200
        })


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Internal Server Error",
            success: false,
        }, { status: 500 })
    }

}