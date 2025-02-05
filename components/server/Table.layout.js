"use client"
import React ,{useState}from "react";

const Table = ({ students, readOnly, defaultAbsentStudent }) => {
// const [studentsData, setStudentsData] = useState(students)

  const toggleAttendanceButton = (event) => {
    if (event.target.value === "Present") {
      event.target.value = "Absent";
      event.target.innerText = "Absent";
      event.target.style.backgroundColor = "#FF0000";
      if (event.target.classList.contains("px-2")) {
        event.target.classList.remove("px-2");
        event.target.classList.add("px-[12px]");
      }
    } else if (event.target.value === "Absent") {
      event.target.value = "Present";
      event.target.innerText = "Present";
      event.target.style.backgroundColor = "#00FF00";
      if (event.target.classList.contains("px-[11px]")) {
        event.target.classList.remove("px-[11px]");
        event.target.classList.add("px-2");
      }
    }
  };

  return (
    <>
      <div className="overflow-x-auto my-4 rounded-lg shadow-md max-h-[400px] overflow-y-auto relative no-scrollbar ">
        <table className="min-w-full bg-white border  border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal ">
              <th className="py-3 px-2 text-left">Roll</th>
              <th>
                <button
                  className="py-3 text-center w-fit cursor-pointer "
                  type="button"
                >
                  Full Name
                </button>
              </th>
              <th className="py-3 w-fit text-center ">Attendance</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {students.map((student, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-4 font-semibold text-left">{student.rollNo}</td>
                <td className="py-3 px-4 font-semibold text-center">{student.fullName ? student.fullName : (student.firstName + student.lastName)}</td>
                <td className="py-3 px-1 text-center">
                  <button
                    type="button"
                    value={defaultAbsentStudent ? "Absent" : student.present ? "Present" : "Absent"}
                    onClick={(e)=>{
                      if(!readOnly){
                        toggleAttendanceButton(e)
                      }
                      student.present = !student.present
                    }}
                    className={`  mx-auto py-1 box-border  h-10  ${defaultAbsentStudent ? "bg-[#FF0000] px-[11px]" : student.present ? "bg-[#00FF00]  px-2" : "bg-[#FF0000] px-[12px]"}  hover:bg-opacity-70 max-tablet:text-[1rem] font-poppins text-lg flex justify-center items-center font-[500] text-slate-900 rounded-md`}
                  >
                    {defaultAbsentStudent ? "Absent" : student.present ? "Present" : "Absent"}
                  </button>
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
