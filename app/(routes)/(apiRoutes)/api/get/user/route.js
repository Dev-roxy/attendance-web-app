import { NextResponse } from "next/server";
import { getEncodedUser } from "@/utils/functions";
import Teacher from "@/models/teacher.model";
import Student from "@/models/student.model";
import Admin from "@/models/admin.model";
import { connectDB } from "@/connections";
import { encodeUser } from "@/utils/functions";

export async function POST(request) {

    try {
        const payload = request.cookies.get('user').value;
        const { email, phone, userType } = payload;

        await connectDB();
        let user;
        if (userType === "teacher") {
            const teacher = await Teacher.findOne({ email, phone, userType })
                .lean()
                .exec();
            user = teacher;
        } else if (userType === "student") {
            const student = await Student.findOne({ email, phone, userType })
                .lean()
                .exec();
            user = student;
        } else if (userType === "admin") {
            const admin = await Admin.findOne({ email, phone, userType })
                .lean()
                .exec();
            user = admin;
        }

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const encodedUser = encodeUser(user);

        if (!encodedUser) {
            return NextResponse.json({ message: "Error encoding user" }, { status: 500 });
        }

        return NextResponse.json(encodedUser, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }


}