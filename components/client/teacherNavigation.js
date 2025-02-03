"use client"
import React from 'react'
import { useRouter } from 'next/navigation';

const teacherNavigation = () => {
    const router = useRouter();
    return (
        <>
            <h1 className="mt-4 text-xl mb-[0.5rem] px-4 text-[#3F0071] font-medium  font-poppins text-left  ">
                {/* This section will have buttons which will navigate teacher to session and manual attendance page */}
                Attendance methodes
            </h1>
            <section className="load w-80 py-4 flex  justify-start items-center min-h-24 bg-white mt-2 rounded-lg shadow-md ">
                <button
                    type="button"
                    onClick={() => {
                        router.push('/teacher/dashboard/attendance/manual');
                    }}
                    className="max-phone:text-[1rem] py-1 mx-auto my-4 box-border px-2 h-10  bg-[#00FF00] hover:bg-opacity-70  font-poppins text-xl flex justify-center items-center font-[500] text-[#3F0071] rounded-md"
                >
                    Manual
                </button>
                <button
                    type="button"
                    onClick={() => {
                        router.push('/teacher/dashboard/attendance/session');
                    }}
                    className="max-phone:text-[1rem] py-1 mx-auto my-4 box-border px-2 h-10  bg-[#00FF00] hover:bg-opacity-70  font-poppins text-xl flex justify-center items-center font-[500] text-[#3F0071] rounded-md"
                >
                    Session
                </button>
            </section>
        </>
    )
}

export default teacherNavigation
