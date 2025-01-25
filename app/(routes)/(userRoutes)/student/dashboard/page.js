import React from "react";
import Load from "@/components/client/studentLoadMenu";
import Table from "@/components/client/Table.layout";
import { cookies } from "next/headers";

const dashboard = async () => {
  

  const demo = [
    {
      roll: 1,
      firstName: "Rohit",
      fullName: "Rohit Gupta",
    },
  ];
  const userName = "Rohit";
  const userCookie = await cookies();
  const user = userCookie.get("user");

  return (
    <>
      <h1 className="mt-4 text-xl mb-[0.5rem] px-4 text-[#3F0071] font-medium  font-poppins text-left  ">
        {userName}’s Dashboard
      </h1>
      <div className="alert shadow-md  bg-yellow-200 px-4 font-normal rounded-lg py-2 text-[#3F0071] box-border ">
        <span className="">Alert : This is an alert for {userName}</span>
      </div>
        <Load />
      <Table students={demo} readOnly={false} defaultAbsentStudent={true} />
    </>
  );
};

export default dashboard;
