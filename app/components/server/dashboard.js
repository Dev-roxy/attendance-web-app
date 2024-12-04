"use client";
import React from 'react';
import Load from '../client/loadMenu';

const dashboard = data => {
  const { user } = data;

  
  return (
    <>
      <h1 className="mt-[64px] text-xl mb-[0.5rem] text-[#3F0071] font-medium  font-poppins text-left  ">
        {user}’s Dashboard
      </h1>
      <div className="alert shadow-md  bg-yellow-200 px-4 font-normal rounded-lg py-2 text-[#3F0071] box-border ">
        <span className="">Alert : This is an alert for {user}</span>
      </div>
      <Load/>
      
    </>
  );
};

export default dashboard;
