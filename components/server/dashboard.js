"use client";
import React ,{useState} from 'react';
import Load from '../client/loadMenu';
import Table from '../client/Table.layout';

const dashboard = (data) => {
  const [demo, setdemo] = useState(
    [
      {
        roll: 1,
        firstName: "Rohit",
        fullName: "Rohit Sharma",
      },
      {
        roll: 2,
        firstName: "Virat",
        fullName: "Virat Kohli",
      },
      {
        roll: 3,
        firstName: "KL",
        fullName: "KL Rahul",
      },
      {
        roll: 4,
        firstName: "Shikhar",
        fullName: "Shikhar Dhawan",
      },
      {
        roll: 5,
        firstName: "Ravindra",
        fullName: "Ravindra Jadeja",
      },
      {
        roll: 6,
        firstName: "Hardik",
        fullName: "Hardik Pandya",
      },
      {
        roll: 7,
        firstName: "Jasprit",
        fullName: "Jasprit Bumrah",
      },
      {
        roll: 8,
        firstName: "Rishabh",
        fullName: "Rishabh Pant",
      },
      {
        roll: 9,
        firstName: "Mohammed",
        fullName: "Mohammed Shami",
      },
      {
        roll: 10,
        firstName: "Yuzvendra",
        fullName: "Yuzvendra Chahal",
      },
    ]
    
  )
  const { user } = data;

  
  return (
    <>
      <h1 className="mt-4 text-xl mb-[0.5rem] px-4 text-[#3F0071] font-medium  font-poppins text-left  ">
        {user}’s Dashboard
      </h1>
      <div className="alert shadow-md  bg-yellow-200 px-4 font-normal rounded-lg py-2 text-[#3F0071] box-border ">
        <span className="">Alert : This is an alert for {user}</span>
      </div>
      <Load/>
      <Table students={demo} readOnly={true} defaultAbsentStudent={true}/>
      
    </>
  );
};

export default dashboard;
