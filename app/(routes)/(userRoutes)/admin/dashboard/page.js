import React ,{Suspense} from "react";
import Table from "@/components/server/Table.layout";
import Loading from "@/components/client/loading";
import LoadMenu from "@/components/client/loadMenu";
import TeacherRegisterForm from "@/components/client/TeacherRegisterForm";
import TeacherTab from "@/components/client/teacherTab";
import { cookies } from "next/headers";
import TeacherApproval from "@/components/client/teacherApproval";

const dashboard = async () => {


  const userName = "Rohit";
  const userCookie = await cookies();
  const user = userCookie.get("user");

  

  return (
    <Suspense fallback={<Loading/>}>
      <h1 className="mt-4 text-xl mb-[0.5rem] px-4 text-[#3F0071] font-medium  font-poppins text-left  ">
        {userName}’s Dashboard
      </h1>

      {/* This is an alert to  */}
      <div className="alert shadow-md  bg-yellow-200 px-4 font-normal rounded-lg py-2 text-[#3F0071] box-border ">
        <span className="">Alert : This is an alert for {userName}</span>
      </div>

      {/* This is load menu to load teachers and check then */}
      {/* <LoadMenu />
      <section className="load w-80 space-y-1 overflow-y-auto h-[300px] no-scrollbar bg-white mt-2 py-2 rounded-lg shadow-md ">
       
      <Suspense fallback={<Loading/>}>
      {
          teachers.map((teacher,index)=>{
            return(
                <TeacherTab key={index} name={teacher.firstName + " " + teacher.lastName} email={teacher.email} subject={teacher.subject} />
              
            )
          })
        }
      </Suspense>
      </section> */}
      <TeacherApproval/>
      
    </Suspense>
  );
};

export default dashboard;
