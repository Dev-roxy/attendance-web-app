import React from "react";
import Image from "next/image";
import profile from "../../public/profile.png";

const Navbar = ({user}) => {
  return (
    <nav className=" bg-[#3F0071] h-[56px] rounded-xl sticky top-1 w-[97%] mx-auto flex justify-start items-center box-border px-4 py-2">
      <Image src={profile.src} height={40} width={40} alt="Profile pic" />
      <div className="user text-[12px] ml-2 text-white">Hi {user}</div>
    </nav>
  );
};

export default Navbar;
