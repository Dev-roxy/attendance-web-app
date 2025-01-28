"use client"

import React from "react";
import Image from "next/image";
import userProfile from "@/public/profile.jpg";

const page = () => {
  const data = [];
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-300 bg-opacity-55 backdrop-blur-sm">
      <section className="load w-80 space-y-1 overflow-y-auto  no-scrollbar bg-white mt-2 rounded-lg shadow-md ">
        <div className="flex gap-2  p-2  justify-start  items-start font-poppins rounded-lg ">
        <Image
          src={userProfile}
          width={100}
          height={100}
          alt="teacher "
          className="rounded-xl "
        />
          <div className="details relative text-[15px]">
            <span className="absolute right-0 translate-x-4 cursor-pointer">x</span>
            <div className="name text-gray-700">
              <span className="text-slate-400">Name :</span> Rohit Gupta
            </div>
            <div className="subject text-gray-700">
              <span className="text-slate-400">Subject :</span> Maths
            </div>
            <div className="subject text-gray-700">
              <span className="text-slate-400">Teacher Id :</span> 24BTIT1019
            </div>
            <div className="subject text-gray-700">
              <span className="text-slate-400">Email :</span> goosl@gmail.com
            </div>
            <div className="subject text-gray-700">
              <span className="text-slate-400">Phone :</span> 8007977850
            </div>
          </div>
        </div>
          <div className="button flex justify-center items-center gap-2 pb-2 ">
            <button className="bg-red-500 text-gray-200 text-md px-4 py-2 font-semibold rounded-lg" type="button">Reject</button>
            <button className="bg-green-500 text-gray-200 text-md px-4 py-2 font-semibold rounded-lg" type="button">Approve</button>
          </div>
      </section>
    </div>
  );
};

export default page;
