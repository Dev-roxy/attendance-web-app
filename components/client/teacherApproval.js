"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import TeacherTab from "@/components/client/teacherTab";
import FlashMessage from "./flashMessage";
import userProfile from "@/public/profile.jpg";
import Loading from "@/components/client/loading";

const TeacherApproval = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [showPopup, setShowPopup] = useState(false);
  const [approvalData, setApprovalData] = useState(null);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [approvals, setApprovals] = useState([]);

  
  useEffect(() => {
    const fetchApprovals = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/get/approvals",{cache: "no-store"}); // Disable cache
        const data = await response.json();
  
        if (response.ok) {
          setApprovals(data.approvals);
        } else {
          setApprovals([]);
          setFlashMessage(data.message || "Failed to fetch approvals", false);
        }
      } catch (error) {
        setFlashMessage("Error fetching approvals. Please try again.", false);
        setApprovals([]);
      }finally{
        setIsLoading(false)
      }
    };

    fetchApprovals();
  }, []);

  const setFlashMessage = (message, success) => {
    setMessage(message);
    setSuccess(success);
  };

  const closePopup = () => {
    setApprovalData(null);
    setShowPopup(false);
  };

  const handleApprove = async () => {


    setApprovals([])
    const { enrollment_no } = approvalData;
    const response = fetch("/api/teacher/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enrollment_no, action: true }),
    })
    if (response.success) {
      const { message } = await response.json();
      setFlashMessage(message, true);
    } else {
      setFlashMessage(message, false);
    }
    closePopup();
    fetchApprovals();
  };

  const handleReject = async () => {
    setApprovals([])
    const { enrollment_no } = approvalData;
    const response = fetch("/api/teacher/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enrollment_no, action: false }),
    })
    if (response.success) {
      const { message } = await response.json();
      setFlashMessage(message, true);
    } else {
      setFlashMessage(message, false);
    }
    closePopup();
    fetchApprovals();
  };

  const renderPopup = () => {
    if (!approvalData) return null;

    const { firstName, lastName, email, phone, enrollment_no } = approvalData;

    return (
      <div className="fixed inset-0  flex items-center justify-center  bg-slate-300 bg-opacity-60 backdrop-blur-sm z-10 mx-0">
        <section className="relative w-80  bg-white rounded-lg shadow-md">
          {/* Close button on top-right */}
          <button
            onClick={closePopup}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 bg-gray-200 rounded-full w-6 h-6 m-0 p-1 flex items-center justify-center"
          >
            ×
          </button>

          <div className="flex gap-4 p-4 items-start">
            <Image
              src={userProfile} // Replace with actual image source if dynamic
              width={100}
              height={100}
              alt="Teacher profile"
              className="rounded-xl"
            />
            <div className="details text-[14px]  text-gray-700">
              <div className="flex justify-start items-center gap-1 " ><span className="text-slate-400">Name:</span> {`${firstName} ${lastName}`}</div>
              <div className="flex justify-start items-center gap-1 " ><span className="text-slate-400">Enrollment:</span> {enrollment_no}</div>
              <div className="flex justify-start items-center gap-1 " ><span className="text-slate-400 ">Email:</span> {email}</div>
              <div className="flex justify-start items-center gap-1 " ><span className="text-slate-400">Phone:</span> {phone}</div>
            </div>
          </div>

          <div className="flex justify-around py-4">
            <button
              onClick={handleReject}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Reject
            </button>
            <button
              onClick={handleApprove}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Approve
            </button>
          </div>
        </section>
      </div>
    );
  };

  return (
    <>
      {message && (
        <FlashMessage
          message={message}
          success={success}
          callback={() => setMessage("")}
        />
      )}

      <h1 className="mt-4 text-xl mb-2 px-4 text-[#3F0071] font-medium font-poppins text-left">
        Registration Approval
      </h1>

      <section className="w-80 space-y-1 overflow-y-auto min-h-20  max-h-80 bg-white my-2 py-2 rounded-lg shadow-md">
        {
          isLoading && (
          <div className="loader size-12 p-1 animate-spin flex mx-auto my-2 justify-center items-center rounded-full bg-gradient-to-r from-blue-600 to-transparent">
            <div className='bg-white dark:bg-black size-10 rounded-full '></div>
          </div>)
        }
        <Suspense fallback={<Loading />}>
          {approvals.map((approval, index) => (
            <TeacherTab
              key={index}
              name={`${approval.firstName} ${approval.lastName}`}
              email={approval.email}
              subject={approval.subject}
              onClick={() => {
                setApprovalData(approval);
                setShowPopup(true);
              }}
            />
          ))}
        </Suspense>
        {!approvals.length && !isLoading && (
          <div className="text-center text-gray-500 my-4">No approvals found</div>
        )}
      </section>

      {showPopup && renderPopup()}
    </>
  );
};

export default TeacherApproval;
