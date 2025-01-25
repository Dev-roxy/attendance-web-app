"use client";
import React from "react";

const loadMenu = () => {
    
  
  const handleClick = e => {
    alert("button is clicked");
  };

  return (
    <>
      <section className="load w-80 min-h-[300px] flex flex-col justify-center items-center bg-white mt-2 pt-[1px] rounded-lg shadow-md ">
        <div className="text-xl w-[93.33%] mt-2 flex justify-start items-center box-border px-4 py-2 mx-auto rounded-lg  text-[#3F0071] bg-[#D7D7D7] font-medium  font-poppins  h-[35px]">
          Search teacher for attendance
        </div>
        <div className="inputs mt-2 h-full flex  flex-wrap gap-1 mx-auto w-[93.33%]">
          <div className="select-container">
            <span>Faculty of </span>
            <select
              className="primary-select"
              name="department"
              id="department"
            >
              <option value="it">IT</option>
            </select>
          </div>
          <div className="select-container">
            <span>students of </span>
            <select
              className="primary-select"
              name="department"
              id="department"
            >
              <option value="year">first</option>
            </select>
            <span>Year</span>
          </div>
          <div className="select-container">
            <span>students of batch</span>
            <select
              className="primary-select"
              name="department"
              id="department"
            >
              <option value="year">first</option>
            </select>
          </div>
        </div>
        <div className="button   flex-grow flex  justify-center items-center  mt-2  w-[93.33%] ">
          <button
            type="button"
            onClick={handleClick}
            className=" py-1 mx-auto box-border w-20 px-2 h-10  bg-[#00FF00] hover:bg-opacity-70  font-poppins text-xl flex justify-center items-center font-[500] text-[#3F0071] rounded-md"
          >
            Search
          </button>
        </div>
      </section>
    </>
  );
};

export default loadMenu;
