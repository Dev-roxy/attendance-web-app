"use server";

import Teacher from "@/models/teacher.model";
import Student from "@/models/student.model";
import Admin from "@/models/admin.model";
import { connectDB } from "./index";
import { cookies } from "next/headers";

export async function getUser() {

    try {
        const cookie = await cookies();
        const payload = JSON.parse(cookie.get("user")["value"]);
        const { email, phone, userType } = payload;
        await connectDB();
        let user;
        if (userType === "teacher") {
             user = await Teacher.findOne({ email, phone, userType })
            .select("-password -__v -_id")
            .lean()
            .exec();
        }else if (userType === "student") {
            user = await Student.findOne({ email, phone, userType })
            .select("-password -__v -_id")
            .lean()
            .exec();
        }else if (userType === "admin") {
            user = await Admin.findOne({ email, phone, userType })
            .select("-password -__v -_id")
            .lean()
            .exec();
        }

        return user;

    } catch (error) {
        return error;
    }
}