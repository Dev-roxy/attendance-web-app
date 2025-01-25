import { NextResponse } from "next/server";
import { connectDB } from "@/connections";
import Teacher from "@/models/teacher.model";
import Admin from "@/models/admin.model";
import Student from "@/models/student.model";
import Approval from "@/models/approval.model";

// cookies options
const cookiesOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  };

  export async function POST(req) {
    try {
      const userData = await req.json();
      const { userType , institute} = userData;
  
      await connectDB();

      const admin = await Admin.findOne({ institute });
      if (!admin) {
        return NextResponse.json({
          message: "Institute not registered contact admin",
          status: 401,
          success: false,
        });
      }

  
      let user;
      if (userType === "admin") {
        user = await Admin.findOne({ email: userData.email, userType: "admin" });
        
      } else if (userType === "student") {
        user = await Student.findOne({
          email: userData.email,
          userType: "student",
        });
      } else if (userType === "teacher") {
        user = await Teacher.findOne({
          email: userData.email,
          userType: "teacher",
        });
        if (!user) {
          user = await Approval.findOne({
            email: userData.email,
            userType: "teacher",
          });
          if (user) {
            return NextResponse.json({
              message: "Your account is not approved yet ,Contact Admin",
              status: 401,
              success: false,
            });
          }
        }
      }
      if (user) {
        return NextResponse.json({
          message: "user already exists please login",
          status: 401,
          success: false,
        })
      }
      
      if (userType === "student"){
        let student = await Student.create(userData);
        student.save();

        return NextResponse.json({
          message: "Student registered successfully",
          status: 200,
          success: true,
        });
        
      }
      if (userType === "teacher"){
        let teacher = await Approval.create(userData);
        teacher.save();

        return NextResponse.json({
          message: "Registration application is sent to admin for approval",
          status: 200,
          success: true,
        });
      }


    } catch (error) {
      return NextResponse.json({
        message: "Internal server error",
        status: 500,
        success: false,
      });
    }
  }