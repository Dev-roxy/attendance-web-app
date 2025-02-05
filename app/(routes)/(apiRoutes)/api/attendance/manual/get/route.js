import { NextResponse } from "next/server";
import Student from "@/models/student.model";
import Teacher from "@/models/teacher.model";
import { connectDB } from "@/connections";

export async function POST(req) {
    try {
        await connectDB();
        const {  acadmicYear ,branch , section ,batch } = await req.json();

        let students ;
        if(branch && section && batch){
            students = await Student.find({branch,acadmicYear,section,batch})
            .select("-password -_id -__v")
            .exec()
        }else{
            students = await Student.find({branch,acadmicYear,section})
            .select("-password -_id -__v")
            .exec()
        }

        if (!students) {
            return NextResponse.json({
                status: 404,
                message: "No students found",
            });
        }

        return NextResponse.json(students,{status:200});
       


    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        });
    }
}