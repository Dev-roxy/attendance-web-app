import React from 'react'
import CreateSession from '@/components/client/createSession'
import { getUser } from '@/connections/fetchUser'

const page = async () => {


    const user = await getUser("teacher")
    
    const teacherId = user.enrollment_no
    console.log(teacherId)

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
