import React from 'react'
import { exportToExcel } from '@/utils/functions'

const sessionCard = ({firstName,sessionCode,attendedOn,enrollment_no}) => {

  return (
           <div className="bg-white rounded-2xl max-phone:max-w-60 max-w-60 w-[90%] shadow-lg p-6 mx-auto  text-center">
          <div className="flex justify-center items-start h-fit">
            <div className="text-green-500 text-5xl mb-3">
              <svg width="60" height="60" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="27" cy="27" r="25.5" stroke="#2E9533" strokeWidth="3" />
                <path d="M30.0981 36.749L33.0421 39.785L38.9299 34.7249M22.2477 16.5084H16.3598V39.785H25.1916M36.9673 29.6648V16.5084H31.0794M22.2477 14.3832H31.0794V21.4674H22.2477V14.3832Z" stroke="#2E9533" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className='ml-4 my-0 text-left'>
              <h2 className="text-green-600 text-xl max-phone:text-lg font-semibold">Attendance</h2>
              <h2 className="text-green-600 text-xl max-phone:text-lg font-semibold">Success</h2>
            </div>
          </div>

          <div className="mt-4 text-left text-gray-700">
            <p className="font-medium">Name: <span className="font-normal">{firstName}</span></p>
            <p className="font-medium">Session Code: <span className="font-normal">{sessionCode}</span></p>
            <p className="font-medium">Date: <span className="font-normal">{attendedOn}</span></p>
          </div>

          
        </div>
              
  )
}

export default sessionCard
