"use client";
import React, { useState, useEffect } from "react";

const page = ({ message, success = true }) => {
  success = true;
  const [isSuccess, setIsSuccess] = useState("");
  const [dynamicWidth, setDynamicWidth] = useState(100);
  const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    if (success) {
      setIsSuccess('bg-green-400');
    } else {
      setIsSuccess('bg-red-400');
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicWidth((prevWidth) => {
        if (prevWidth <= 0) {
          setShouldHide(true);
          clearInterval(interval);
          return 0;
        }
        return prevWidth - 2;
      });
    }, 100);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <>
    <div className="flex justify-center items-center h-screen bg-gray-200">
     
      <div
        className={`flash-card h-[80px] w-80 shadow-md bg-white rounded-md py-4 font-poppins `}
        style={{display:`${shouldHide ? 'none' : 'block'}`}}
      >
        <div className=" w-60 mx-auto">this is a temporary message</div>
        <div className={`h-2 w-60 mx-auto mt-2`}>
          <div
            className={` progress-bar h-2 transition-all ease p-2 rounded-full ${isSuccess}`}
            style={{ width: `${dynamicWidth}%` }}
          ></div>
        </div>
      </div>
    </div>
    </>
  );
};

export default page;
