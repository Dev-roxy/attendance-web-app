
import React from 'react';
import Load from '@/components/client/loadMenu';
import Table from '@/components/server/Table.layout';
import TeacherNavigation from '@/components/client/teacherNavigation';

const dashboard = () => {
  const user = "Rohit"
  const demo = [
    {
      "roll": 1,
      "fullName": "Rohit Sharma",
      "present": true
    },
    {
      "roll": 2,
      "fullName": "Virat Kohli",
      "present": false
    },
    {
      "roll": 3,
      "fullName": "Sachin Tendulkar",
      "present": true
    },
    {
      "roll": 4,
      "fullName": "MS Dhoni",
      "present": true
    },
    {
      "roll": 5,
      "fullName": "Yuvraj Singh",
      "present": false
    },
    {
      "roll": 6,
      "fullName": "Sourav Ganguly",
      "present": true
    },
    {
      "roll": 7,
      "fullName": "Rahul Dravid",
      "present": false
    },
    {
      "roll": 8,
      "fullName": "Anil Kumble",
      "present": true
    },
    {
      "roll": 9,
      "fullName": "Kapil Dev",
      "present": true
    },
    {
      "roll": 10,
      "fullName": "Zaheer Khan",
      "present": false
    }
  ]
  
  return (
    <>
      <h1 className="mt-4 text-xl mb-[0.5rem] px-4 text-[#3F0071] font-medium  font-poppins text-left  ">
        {user}’s Dashboard
      </h1>
      <div className="alert shadow-md  bg-yellow-200 px-4 font-normal rounded-lg py-2 text-[#3F0071] box-border ">
        <span className="">Alert : This is an alert for {user}</span>
      </div>
      <TeacherNavigation />
      <Table students={demo} readOnly={false} defaultAbsentStudent={false} />

    </>
  );
};

export default dashboard;

export const metadata = {
  title: "Dashboard - Teacher",
  description:
    "View your attendance records, manage your classes, and track your students' attendance with ease. Our dashboard is designed to help you stay organized and efficient in your teaching.",
};
