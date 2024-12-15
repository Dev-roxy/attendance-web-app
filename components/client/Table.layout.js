"use client";
import React, { useState } from "react";

const Table = ({ students, readOnly, defaultAbsentStudent }) => {
  const [showFirstName, setshowFirstName] = useState(true); //This is a state variable to toggle between first name and full name

  const clearRadioBtn = event => {
    if (event.target.checked == "") {
      event.target.checked = true;
    }
  };

  const toggleNameDisplay = event => {
    if (event.target.innerText === "First Name") {
      event.target.innerText = "Full Name";
      console.log(showFirstName);

      setshowFirstName(false);
    } else if (event.target.innerText === "Full Name") {
      event.target.innerText = "First Name";
      setshowFirstName(true);
      console.log(showFirstName);
    }
  };

  return (
    <>
      <div className="overflow-x-auto my-4 rounded-lg shadow-md ">
        <table className="min-w-full bg-white border  border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal ">
              <th className="py-3 px-2 text-left">Roll</th>
              <th>
                <button
                  className="py-3 w-fit text-left cursor-pointer "
                  type="button"
                  onClick={toggleNameDisplay}
                >
                  First Name
                </button>
              </th>
              <th className="py-3 w-fit text-center ">present</th>
              <th className="py-3 w-fit text-center ">absent</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {students.map((student, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-4 text-left">{student.roll}</td>
                <td className="py-3 px-4 text-center">
                  {showFirstName ? student.firstName : student.fullName}
                </td>
                <td className="py-3 px-1 text-center">
                  <input
                    type="radio"
                    value={true}
                    className="accent-green-600 size-5"
                    name={`attendanceOf${student.roll}`}
                    disabled={readOnly}
                    id="attendance"
                  />
                </td>
                <td className="py-3 px-1 text-center">
                  <input
                    type="radio"
                    value={false}
                    defaultChecked={defaultAbsentStudent}
                    className="accent-red-600 size-5"
                    name={`attendanceOf${student.roll}`}
                    disabled={readOnly}
                    id="attendance"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
