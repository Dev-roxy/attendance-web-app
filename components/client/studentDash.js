"use client"
import React, { useState, useEffect } from "react";
import Load from "@/components/client/studentLoadMenu";
import Table from "@/components/server/Table.layout";
import FlashMessage from "@/components/client/flashMessage";
import { useForm } from "react-hook-form";
import { get } from "mongoose";
import { getUser } from "@/connections/fetchUser";



const dashboard =  ({user}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null, accuracy: null });


    const student_enrollment_no = user.enrollment_no;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
          setMessage('Location fetched successfully');
          setSuccess(true);
        },
        (err) => {
          setMessage(err.message);
          setSuccess(false);
          getCurrentPosition();
        }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
      );
    } else {
      setMessage('Geolocation is not supported by this browser.');
      setSuccess(false);
    }
  }

  useEffect(() => {

    getCurrentPosition();
  }, []);

  const onSubmit = async (data) => {
    if (location.latitude === null || location.longitude === null || location.accuracy === null) {
      setMessage('Location not fetched, please wait for a moment and try again');
      setSuccess(false);
      getCurrentPosition();
      return;
    } else {
      setShowPopup(true)
      const ip = (await fetch("https://api.ipify.org")).text();
      await fetch("/api/attendance/session/mark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, ...location, student_enrollment_no,ip }),
      })
        .then((response) => { return response.json() })
        .then((data) => {
          setMessage(data.message);
          setSuccess(data.success);
          setShowPopup(false)
        })
        .catch((error) => {
          setMessage(error.message);
          setSuccess(false);
          setShowPopup(false)
        });
    }
  };



  return (
    <>
      {message && (
        <FlashMessage
          message={message}
          success={success}
          callback={setMessage}
        />
      )}
      <h1 className="mt-4 text-xl mb-[0.5rem] px-4 text-[#3F0071] font-medium  font-poppins text-left  ">
        {user.firstName}’s Dashboard
      </h1>

      <div className="alert shadow-md  bg-yellow-200 px-4 font-normal rounded-lg py-2 text-[#3F0071] box-border ">
        <span className="">Alert : This is an alert for {user.firstName}</span>
      </div>


      <h1 className="mt-4 text-xl mb-[0.5rem] px-4 text-[#3F0071] font-medium  font-poppins text-left  ">
        Submit Attendance
      </h1>
      <section className="load py-4 w-80 min-h-[100px] flex flex-col justify-start items-center bg-white mt-2  rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col py-2 justify-start items-center">
          <>
            <h1 className="text-md px-2 text-[#3F0071] w-9/12 font-medium font-poppins text-left">
              Teacher Id <span className="text-red-500">*</span>
            </h1>
            <div className="teacherId flex  justify-center items-center h-10 w-9/12 border border-[#b69bcc] rounded-lg">
              <input
                type="text"
                name="teacherId"
                id="teacherId"
                className="rounded-lg w-full h-full px-2 py-1"
                {...register('enrollment_no', { required: true })}
              />
            </div>
            <div className="flex  justify-start items-center w-9/12 px-2" >
              {errors.enrollment_no && <p className="text-red-500">Teacher ID is required</p>}
            </div>
          </>
          <>
            <h1 className="text-md px-2 text-[#3F0071] mt-2 w-9/12 font-medium font-poppins text-left">
              Session code <span className="text-red-500">*</span>
            </h1>
            <div className="teacherId flex justify-center items-center h-10 w-9/12 border border-[#b69bcc] rounded-lg">
              <input
                type="text"
                name="sessionCode"
                id="sessionCode"
                className="rounded-lg w-full h-full px-2 py-1"
                {...register('sessionCode', { required: true, maxLength: [5, 'Session code should be 5 characters'], minLength: [5, 'Session code should be 5 characters'], pattern: /^[A-Za-z0-9]/ })}
              />
            </div>
            <div className="flex  justify-start items-center w-9/12 px-2" >
              {errors.sessionCode && <p className="text-red-500">Session code is required</p>}
            </div>
          </>
          <div className="buttons">
            <button
              type="submit"
              className="py-1 mt-4 mx-auto box-border  px-2 h-10 bg-[#00FF00] hover:bg-opacity-70 font-poppins text-xl flex justify-center items-center font-[500] text-[#3F0071] rounded-md"
            >
              Submit Attendance
            </button>
          </div>
        </form>
      </section>
      {showPopup && renderPopup()}
    </>
  );
};

const renderPopup = () => {


  return (
    <div className="fixed inset-0  flex items-center justify-center  bg-slate-300 bg-opacity-60 backdrop-blur-sm z-10 mx-0">
      <section className="relative w-[280px] bg-white aspect-video rounded-lg">
        <h1 className="text-lg max-phone:text-base text-[#3F0071] font-medium font-poppins text-center mt-4">Submitting your attendance</h1>
        <div className="loader mx-auto mt-4 size-12 p-1 animate-spin flex justify-center items-center rounded-full bg-gradient-to-r from-blue-600 to-transparent">
          <div className='bg-white dark:bg-black size-10 rounded-full '></div>
        </div>
      </section>
    </div>
  );
};

export default dashboard;
