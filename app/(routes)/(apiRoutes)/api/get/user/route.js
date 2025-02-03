import { NextResponse } from "next/server";
import Teacher from "@/models/teacher.model";
import Student from "@/models/student.model";
import { connectDB } from "@/connections";

export async function POST(request) {
    try {
        await connectDB();
        // Get the user from the cookies
        const user = JSON.parse(request.cookies.get('user').value);
        console.log(user);
    } catch (error) {
        console.error("Error fetching user:", error.message);
        return NextResponse.error({
            message: error.message,
        }, {
            status: 200
        });
    }
}