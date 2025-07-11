"use client";
import React from "react";
import Image from "next/image";
import profile from "../../public/profile.png";
import { logoutAction } from "@/app/actions/userActions";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";



const Navbar = ({user}) => {
  const router = useRouter();
  
  const handleLogout = async () => {
    const response = await logoutAction();
    if (response instanceof Error) {
      console.error("Logout failed:", response);
    } 
      router.push("/auth");
    
  }
  return (
    <nav className=" bg-[#3F0071] h-[56px] rounded-xl sticky top-1 w-[97%] mx-auto flex justify-start items-center box-border px-4 py-2">
      <Image src={profile.src} height={40} width={40} alt="Profile pic" />
      <div className="user text-[12px] ml-2 text-white" >Hi {user}</div>
      <button type="button" onClick={handleLogout} className="flex items-center ml-auto bg-[#6A1B9A] px-3 py-1 rounded-lg hover:bg-[#8E24AA] transition-colors duration-300">
        <LogOut className="text-white ml-auto" size={20} />
        <span className="text-white ml-1">Logout</span>
      </button>
    </nav>
  );
};

export default Navbar;
