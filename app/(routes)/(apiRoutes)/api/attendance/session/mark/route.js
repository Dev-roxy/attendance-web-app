import { NextResponse } from "next/server";
import Session from "@/models/session.model";
import Teacher from "@/models/teacher.model";
import fs from "fs";
import { connectDB } from "@/connections";


// Function to calculate distance between two points using the Haversine formula
function calculateHaversineDistance (lat1, lon1, lat2, lon2, accuracy1 = 0, accuracy2 = 0) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c; // Distance in kilometers
  
    // Incorporate accuracy
    const accuracyInKm1 = accuracy1 / 1000; // Convert accuracy from meters to kilometers
    const accuracyInKm2 = accuracy2 / 1000; // Convert accuracy from meters to kilometers
    if (distance - accuracyInKm1 - accuracyInKm2 <= 0){
        distance = 0; // If the distance is less than the sum of accuracies, set distance to 0
    }else {
        distance -= accuracyInKm1 + accuracyInKm2; // Adjust distance by adding accuracies
    } 
  
    return distance;
  }
  
  // Helper function to convert degrees to radians
  function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }



export async function POST(request) {

    await connectDB();

    const {enrollment_no ,student_enrollment_no, sessionCode , latitude , longitude ,accuracy} = await request.json();
    const studentAccuracy = accuracy;
    try {
        const teacher = await Teacher.findOne({enrollment_no}).exec();
        if (!teacher) {
            return NextResponse.json({
                message: "Teacher not found",
                success: false,
            },{status: 404});
            
        }
        let tempSessions = fs.readFileSync(process.cwd() + "/temp/memory/session/session.json","utf-8");
            tempSessions = JSON.parse(tempSessions);
        
        const session =  tempSessions.find((session) => {
            if ((session.teacher.enrollment_no === enrollment_no) && (session.sessionCode === sessionCode) && (session.isActive === true)) {
                return session
            }
        })
        if (!session) {
            return NextResponse.json({
                message: "Session not found",
                success: false,
            },{status: 404});
        }

        // check the distance between the teacher and the student location who is marking the attendance
        const distance = calculateHaversineDistance(
            latitude,
            longitude,
            session.teacher.latitude,
            session.teacher.longitude,
            studentAccuracy,
            session.teacher.accuracy
        );

        // Convert distance to meters
        const distanceInMeters = distance * 1000;
        // Check if the distance is greater than 100 meters and log the appropriate message
        if ( distanceInMeters >= 100) {
            return NextResponse.json({
                message: "You can't give attendance.",
                success: false,
            },{status: 400});
        }

        // Mark attendance
        const attendance = {
            sessionId: session.sessionId,
            enrollment_no: enrollment_no,
            attendedOn: new Date(),
        };

        // Save attendance to the temp file
        let tempAttendance = JSON.parse(fs.readFileSync(process.cwd() + "/temp/memory/session/attendance.json","utf-8"));
        
        let students = tempAttendance[`${enrollment_no}-${session.sessionCode}`];

         const markedStudent = students.find((student) => {
            if (student.student.enrollment_no === student_enrollment_no && student.present === true) {
                return student;
            }
         });
            if (markedStudent) {
                return NextResponse.json({
                    message: "Attendance already marked",
                    success: false,
                },{status: 400});
            }

            students = students.map((student) => {
                if (student.student.enrollment_no === student_enrollment_no) {
                    student.student.latitude = latitude;
                    student.student.longitude = longitude;
                    student.student.accuracy = accuracy;
                    student.attendedOn = new Date();
                    student.present = true;
                }
                return student;
            });
            if (!students) {
                return NextResponse.json({
                    message: "Student not found in the session",
                    success: false,
                },{status: 404});
            }
        tempAttendance[`${enrollment_no}-${session.sessionId}`] = students;
        fs.writeFileSync(process.cwd() + "/temp/memory/session/attendance.json", JSON.stringify(tempAttendance),"utf-8");
        return NextResponse.json({
            message: "Attendance marked successfully",
            success: true,
        },{status: 201});


    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Internal server error",
            success: false,
        },{status: 500});
    }
}