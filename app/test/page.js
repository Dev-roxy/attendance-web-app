import React from "react";


const test = () => {
 return ( <>
    <section className="load mb-4 py-4 w-80 min-h-[100px] flex flex-col justify-start items-center bg-white mt-2  rounded-lg shadow-md">
    <section className="load   mb-4 py-4 w-80 min-h-[100px] flex  justify-start items-center bg-white mt-2  rounded-lg shadow-md">
       {
        sessions.map((session,index)=>{
          return (<>
          <SessionCard key={index} sessionCode={session.sessionCode} firstName={firstname} attendedOn={session.attendedOn.toString()} enrollment_no={enrollment_no} />
          </>)
        })
       }

        {
          sessions.length === 0 && <p className="text-gray-400">No recent attended sessions</p>
        }
      </section>
      </section>
  </>
)
};

export default test;
