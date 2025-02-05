import React from 'react'
import Dashboard from '@/components/client/studentDash'
import { getUser } from '@/connections/fetchUser'
import SessionCard from '@/components/client/sessionCard'
import { getAttendanceSessionAction } from '@/app/actions/userActions'
import { exportToExcel } from '@/utils/functions'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"



const page = async () => {
  const user = await getUser("student")
  const sessions = await getAttendanceSessionAction(user.enrollment_no)
  const firstname = user.firstName
  const enrollment_no = user.enrollment_no
  console.log(sessions)

  const handler = 2


  return (
    <>
      <Dashboard user={user} />
      <h1 className="mt-4 text-xl mb-[0.5rem] px-4 text-[#3F0071] font-medium  font-poppins text-left  ">
        Recent Sessions
      </h1>
      <section  className="load overflow-hidden py-4 w-80 min-h-[100px] flex flex-col justify-center items-center bg-slate-200 mb-4 mt-2  rounded-lg shadow-md">

        <Carousel>
          <CarouselContent >
            
        {
          sessions.map((session, index) => {
            let date = session.attendedOn.toString().slice(0,16)
            return (<>
            <CarouselItem  className="pl-1 md:basis-1/2 lg:basis-1/3" key={index} >
            <div className="p-1">
            <SessionCard sessionCode={session.sessionCode} firstName={firstname} attendedOn={date} enrollment_no={enrollment_no} />
            </div>
            </CarouselItem>
            </>)
          })
        }
        </CarouselContent>
      </Carousel>

        {
          sessions.length === 0 && <p className="text-gray-400">No recent attended sessions</p>
        }
      </section>
    </>
  )
}

export default page
