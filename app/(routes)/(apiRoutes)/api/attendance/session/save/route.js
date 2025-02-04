import { NextResponse } from "next/server";
import Attendance from "@/models/attendance.model";
import { connectDB } from "@/connections";
import XLSX from "xlsx";

export async function POST(request) {
    try {
        await connectDB();
        const { students } = request.json();
        const attendance = await Attendance.create(students);
        await attendance.save({ timestamps: false });

        const headers = ["Roll No", "Name", "Attendance"];

        // 🔹 3. Data ko Excel Format me Convert Karo
        const formattedData = students.map(({ rollNo, firstName,lastName, present }) => ({
            "Roll No": rollNo,
            "Name": firstName + lastName,
            "Attendance": present ? "Present" : "Absent",
        }));
        console.log(formattedData)
        // **1. JSON to Excel Conversion**
        const worksheet = XLSX.utils.json_to_sheet(students, { header: headers });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Excel file ko Buffer me store karo
        const excelBuffer = await XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

        await XLSX.writeFile(workbook, "data.xlsx");

        // File response bhejo
        return new Response(excelBuffer, {
            headers: {
                "Content-Disposition": "attachment; filename=data.xlsx",
                "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            },
        });


    } catch (error) {
        return NextResponse.json({
            message: "Internal Server Error",
            success: false,
        }, { status: 500 })
    }

}