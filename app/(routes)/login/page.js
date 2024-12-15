"use client" 
import React ,{useEffect} from "react";
import { loginUserAction } from "@/app/actions/userActions";

const login = () => {
 
  
  return (
    <>
      <div className="flex items-center justify-center min-h-screen  bg-gray-200">
        <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Login to AMS
          </h2>
          <form action={loginUserAction} >
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
                autoComplete="off"
                name="email"
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
