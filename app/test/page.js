
import React from "react";
import { useForm } from "react-hook-form";
import { connectDB } from "@/connections";
import Admin from "@/models/admin.model";


const loadMenu = () => {


  const data = {
    "adminId": "24BTIT1019",
    "email": "rg5394461@gmail.com",
    "firstName": "Rohit",
    "institute": "PRMITR",
    "lastName": "Gupta",
    "password": "dev@123",
    "phone": "8007977850"
  }
  const onSubmit = async () => {
    "use server"
    connectDB()
    let user = await Admin.create(data);
    user.save({timestamps: true});
  }
  
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      
      <button type="button " onClick={onSubmit} className="bg-purple-500 p-4 m-auto rounded-lg shadow-md" >Submit</button>


    </div>
  );
};

export default loadMenu;