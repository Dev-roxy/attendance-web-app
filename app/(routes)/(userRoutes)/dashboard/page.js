import React from "react";
import Dashboard from "@/components/server/dashboard";

const page = () => {
  const user = "Rohit";
  return (
    <>
      <Dashboard user = {user}  />
    </>
  );
};

export default page;
