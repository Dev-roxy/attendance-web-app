import React from "react";

const Navbar = ({user}) => {
  return (
    <nav className=" bg-[#3F0071] h-[56px] rounded-b-[1rem] sticky top-0 w-full   flex justify-start items-center box-border px-4 py-2">
      <div className="logo h-10 aspect-square bg-white rounded-full  "></div>
      <div className="user text-[12px] ml-2 text-white">Hi {user}</div>
    </nav>
  );
};

export default Navbar;
