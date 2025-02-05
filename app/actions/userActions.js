"use server"
import Attendance from "@/models/attendance.model";
import Student from "@/models/student.model";
import { connectDB } from "@/connections/index";
import { getUser } from "@/connections/fetchUser";
export async function getPercentageAction(userId) {
    try {
       await connectDB();
        const user = await getUser();
        const attendance = await Attendance.countDocuments({ "student.enrollment_no": user.enrollment_no });
        // const totalSessions = await 
        
    } catch (error) {
        return error;
    }
}

export async function getAttendanceAction(userId) {
    try {
        await connectDB();
        const user = await getUser();
        const attendance = await Attendance.find({ "student.enrollment_no": user.enrollment_no });
        return attendance;
    } catch (error) {
        return error;
    }
}

export async function getAttendanceSessionAction(enrollment_no) {
    try {
        await connectDB();
        const attendance = await Attendance.find({ "student.enrollment_no": enrollment_no })
        .exec();
        return attendance;
    } catch (error) {
        return error;
    }
}