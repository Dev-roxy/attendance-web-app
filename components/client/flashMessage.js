"use client";
import React, { useState, useEffect } from "react";

const FlashMessage = ({ message, success = true, top, right ,setVisibleState }) => {
  const [isSuccess, setIsSuccess] = useState("");
  const [dynamicWidth, setDynamicWidth] = useState(100);

  useEffect(() => {
    if (success) {
      setIsSuccess("bg-green-400");
    } else {
      setIsSuccess("bg-red-400");
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicWidth((prevWidth) => {
        if (prevWidth == 10) {
          setVisibleState(false);
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
      <div
        className={`flash-card h-[100px] w-80 shadow-md bg-white rounded-md py-4 font-poppins absolute `}
        style={{  top: `${top}px`, right: `${right}px` }}
      >
        <div className=" w-60 mx-auto">{message || "demo message"}</div>
        <div className={`h-2 w-60 mx-auto mt-2`}>
          <div
            className={` progress-bar h-2 transition-all ease p-2 rounded-full ${isSuccess}`}
            style={{ width: `${dynamicWidth}%` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default FlashMessage;
