import React from 'react'

const loader = () => {
  return (
    <>
      <div className='h-screen bg-white dark:bg-black w-screen flex justify-center items-center'>
        <div className="loader size-12 p-1 animate-spin flex justify-center items-center rounded-full bg-gradient-to-r from-blue-600 to-transparent">
            <div className='bg-white dark:bg-black size-10 rounded-full '></div>
        </div>
      </div>
    </>
  )
}

export default loader
