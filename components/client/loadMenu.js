"use client";
import React ,{useState} from "react";
import { useForm } from "react-hook-form";


const LoadMenu = () => {
  const handleSearch = e => {
    alert("searched");
  };
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState("");
  
    const onSubmit = async (data) => {
      try {
        console.log("Form submitted", data);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate form submission delay
        throw new Error("Form submission failed. Please try again.");
        setSubmissionMessage("Form submitted successfully!");
      } catch (error) {
        setSubmissionMessage("Form submission failed. Please try again.");
      } finally {
        setIsModalOpen(false);
      }
    };

  return (
    <>
      <section className="load w-80 min-h-[200px] flex flex-col justify-start items-center bg-white mt-2 pt-[1px] rounded-lg shadow-md ">
        <div className="text-xl w-[93.33%] mt-2 flex justify-start items-center box-border px-4 py-2 mx-auto rounded-lg  text-[#3F0071] bg-[#D7D7D7] font-medium  font-poppins  h-[35px]">
          Search Teachers
        </div>
        <div className="inputs mt-2 h-full flex  flex-wrap gap-1 mx-auto w-[93.33%]">
          <div className="select-container flex gap-1">
            <span className="text-md">TeacherId </span>
            <input className="bg-slate-100 outline-none rounded-md grow px-1"  type="text" name="teacherId" id="teacherIdInput" />
          
        </div>
        </div>
        <div className="button flex justify-center items-center  mt-2  w-[93.33%] ">
          <button
            type="button"
            onClick={handleSearch}
            className=" py-1 m-auto mt-4 box-border w-20 px-2 h-10  bg-[#00FF00] hover:bg-opacity-70  font-poppins text-xl flex justify-center items-center font-[500] text-[#3F0071] rounded-md"
          >
            Search
          </button>
       
        </div>
      </section>
      <div>

      {submissionMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <p className="text-lg font-medium mb-4">{submissionMessage}</p>
            <button
              onClick={() => setSubmissionMessage("")}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default LoadMenu;
