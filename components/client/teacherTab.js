import React from 'react'
import Image from 'next/image'
import userProfile from "@/public/profile.jpg";

const teacherTab = ({name , subject ,email}) => {
  return (
     <div  className="bg-slate-100 hover:bg-slate-200 flex gap-2 p-2 w-[94%] mx-auto rounded-lg">
          <div className="image  flex justify-center items-center  rounded-lg">
            <Image src={userProfile} width={50} height={50} alt="teacher" className="rounded-xl" />
          </div>
          <div className="details  grow">
          <h1 className="name text-[#3f0071]">{name}</h1>
          <div className="info flex justify-between ">
            <div className="subject text-blue-600 mt-2 text-[12px] font-bold">{subject}</div>
            <div className="email text-gray-400">{email}</div>
          </div>
          </div>
        </div>
  )
}

export default teacherTab
