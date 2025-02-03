import React from 'react'
import CreateSession from '@/components/client/createSession'
import WalkingAnimation from '@/components/client/walkingMan'

const page = () => {


    
    const teacherId = "24BTIT1019"
    const sessionCode = "123456"

    return (
        <>
            <CreateSession teacherId={teacherId} />
            
            
        </>

    )
}

export default page

export const metadata = {
    title: "Teacher Dashboard - Attendance Session",
    description:
      "View your attendance records, manage your classes, and track your students' attendance with ease. Our dashboard is designed to help you stay organized and efficient in your teaching.",
  };
