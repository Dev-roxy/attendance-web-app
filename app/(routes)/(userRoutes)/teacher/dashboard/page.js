import React from "react";
import TeacherNavigation from "@/components/client/teacherNavigation";
import { getUser } from "@/connections/fetchUser";

export default async function Dashboard() {

  const user =  await getUser("teacher");

  return (
    <>
      <h1 className="mt-4 text-xl mb-[0.5rem] px-4 text-[#3F0071] font-medium font-poppins text-left">
        {user.firstName}’s Dashboard
      </h1>
      <div className="alert shadow-md bg-yellow-200 px-4 font-normal rounded-lg py-2 text-[#3F0071] box-border">
        <span className="">Alert : This is an alert for {user.firstName}</span>
      </div>
      <TeacherNavigation teacherId={user.enrollment_no}/>
      {/* <Table students={user.students} readOnly={false} defaultAbsentStudent={false} /> */}
    </>
  );
}
