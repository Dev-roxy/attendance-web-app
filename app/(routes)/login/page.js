"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FlashMessage from "@/components/client/flashMessage";

const login = () => {
  const [Message, setMessage] = useState("");
  const [Success, setSuccess] = useState(true);
  const [ShowMessage, setShowMessage] = useState(false);

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    const form = document.getElementById("infoForm");
    const formData = new FormData(form);
    const formDataEntries = Object.fromEntries(formData);
    
    const requestUrl = `/api/login/${formDataEntries.loginAs}`;

    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataEntries),
    }).then(async res => {
      let data = await res.json();
      

      setMessage(data.message);
      setSuccess(data.success);
      setShowMessage(true);

      setTimeout(() => {
        if (formDataEntries.loginAs === "teacher") {
          router.push("/dashboard");
        }else if (formDataEntries.loginAs === "admin") {
          router.push("/admin/dashboard");
        }
      }, 400);
    });
  };
  

  return (
    <>
      {ShowMessage && (
        <FlashMessage
          message={Message}
          success={Success}
          top={10}
          right={10}
          setVisibleState={setShowMessage}
        />
      )}
      <div className="flex items-center justify-center min-h-screen  bg-gray-200">
        <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Login to AMS
          </h2>
          <form id="infoForm" onSubmit={handleSubmit}>
            <div className="mx-auto  flex justify-center items-center gap-4 h-4 px-2 py-4">
              <label className="font-poppins text-xl text-gray-700" htmlFor="teacherBtn" >
                Teacher
              </label>
              <input type="radio" name="loginAs" id="infoForm" value={'teacher'} required={true}/>
              <label className="font-poppins text-xl text-gray-700" htmlFor="adminbtn" >
                Admin
              </label>
              <input type="radio" name="loginAs" id="infoForm" value={'admin'}  required={true}/>
            </div>
            <div className="mb-4">
              <label
                htmlFor="Email"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id="Email"
                name="email"
                autoComplete="off"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="off"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default login;
