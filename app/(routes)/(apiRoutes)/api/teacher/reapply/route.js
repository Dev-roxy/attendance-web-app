import Approval from "@/models/approval.model";
import { NextResponse } from "next/server";
import { connectDB } from "@/connections";



export async function PATCH(request) {
    try {
        await connectDB();
        const data = await request.json();
        const { email ,phone } = data;
        const checkRejected = await Approval.findOne({  rejected: true ,$or :[{email},{phone}] });
        
        if (!checkRejected) {
            return NextResponse.json({
                message: "No such account found",
                status: 401,
                success: false,
            },
            { status: 401 }
        );
        }
        if (checkRejected.timesRejected > 2) {
            return NextResponse.json({
                message: "Your account is rejected 3 times ,You can't re-apply",
                status: 401,
                success: false,
                rejected: true
            },
            { status: 401 }
        );
            
        }
        const approval = await Approval.findOneAndUpdate({  rejected: true ,$or :[{email},{phone}] } , { rejected: false , ...data });
        return NextResponse.json({
            message: "Application re-applied successfully",
            status: 200,
            success: true,
        },
        { status: 200 });
    } catch (error) {
       return NextResponse.json({
            message: "Internal server error",
            status: 500,
            success: false,
        }); 
    }
}