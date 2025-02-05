"use client"
import { Suspense } from 'react';
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import Table from '@/components/server/Table.layout';
import { useSearchParams } from 'next/navigation';
import FlashMessage from '@/components/client/flashMessage';
import { exportToExcel } from '@/utils/functions';

const popup = () => {

    return (<>
        <div className="fixed inset-0  flex items-center justify-center bg-slate-300 bg-opacity-60 backdrop-blur-sm z-10 mx-0">
            <section className="load mb-4 w-80 py-2 flex flex-col justify-start items-center bg-white mt-2 rounded-lg shadow-md ">
                <h1 className="mt-4 text-xl mb-[0.5rem] px-4 text-[#3F0071] font-medium  font-poppins text-left  ">
                    { isSaving ? "Saving the attendance" : "Loading students..."}
                </h1>
                <div className="loader size-12 my-4 p-1 animate-spin flex justify-center items-center rounded-full bg-gradient-to-r from-blue-600 to-transparent">
                    <div className='bg-white dark:bg-black size-10 rounded-full '></div>
                </div>
            </section>
        </div>
    </>)
}


const page = () => {

    const searchParams = useSearchParams()
    const teacherId = searchParams.get('id')

    const [isSaving, setIsSaving] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSearched, setIsSearched] = useState(false)
    const [students, setStudents] = useState([])
    const [isBatch, setIsBatch] = useState(false)
    const [batches, setBatches] = useState([]);
    const [Message, setMessage] = useState("");
    const [Success, setSuccess] = useState(false);


    const sections = ["A", "B", "C", "D"];
    const acadmicYears = ["1st", "2nd", "3rd", "4th"];
    const engineeringBranches = [
        "Civil Engineering",
        "Computer Science Engineering",
        "Electrical Engineering",
        "Electronics and Communication Engineering",
        "Information Technology",
    ];
    const handleChecked = (event) => {
        setIsBatch(!isBatch);
    };

    const handleSave = async () => {
        setIsSaving(true)
        const res = await fetch("/api/attendance/manual/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ students }),
        })
        const data = await res.json()
        if (res.ok) {
            setSuccess(data.success)
            setMessage(data.message)
            if (data.success) {
                const headers = ["Roll No", "Name", "Attendance"];
                const formattedData = students.map(({ rollNo, firstName, lastName, present }) => ({
                    "Roll No": rollNo,
                    "Name": firstName +" " + lastName,
                    "Attendance": present ? "Present" : "Absent",
                }));
                await exportToExcel(formattedData, headers, `attendance-${teacherId}-${new Date().getTime()}.xlsx`)
                setStudents([])
                setIsSearched(false)
                setIsSaving(false)
            }
        }


    }

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting },
        clearErrors,
    } = useForm({});

    const onSubmit = async (data) => {
        // console.log(data);
        setIsLoading(true)
        const response = await fetch("/api/attendance/manual/get", {
            method: "POST",
            body: JSON.stringify(data),
        });
        const result = await response.json();
        setIsLoading(false)
        setIsSearched(true)
        setStudents(result);
    };

    return (
        <Suspense fallback={popup()}>
            {Message && (
                <FlashMessage
                    message={Message}
                    success={Success}
                    callback={setMessage}
                />
            )}
            <h1 className="mt-4 text-xl mb-[0.5rem] px-4 text-[#3F0071] font-medium  font-poppins text-left  ">
                Select students
            </h1>
            <section className="load w-80 py-4 flex flex-col justify-start items-center bg-white mt-2 rounded-lg shadow-md ">

                {(<>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6 max-w-[40rem] flex flex-wrap justify-center items-center w-[95%] min-h-[90%] mx-auto"
                    >

                        <div className="button  flex flex-col justify-center items-center  my-4  w-[93.33%] ">
                            <div className=" w-full max-w-[30.5rem] mx-auto">
                                <label className="block font-medium text-sm mb-1">
                                    Branch <span className="text-red-500">*</span>
                                </label>
                                <select
                                    {...register("branch", {
                                        required: "Branch is required",
                                    })}
                                    className="w-full border-gray-300 rounded-md shadow-sm px-4 py-[10px] border focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select Branch</option>
                                    {engineeringBranches.map((option, index) => {
                                        return (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        );
                                    })}
                                </select>
                                {errors.branch && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.branch.message}
                                    </p>
                                )}
                            </div>
                            <div className="input-group  w-full max-w-[30.5rem] mx-auto">
                                <label className="block font-medium text-sm mb-1 ">
                                    Acadmic year <span className="text-red-500">*</span>
                                </label>
                                <select
                                    {...register("acadmicYear", {
                                        required: "Acadmic year is required",
                                    })}
                                    className="w-full  border-gray-300 rounded-md shadow-sm px-4 py-[10px] border focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select acadmic year</option>
                                    {acadmicYears.map((option, index) => {
                                        return (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        );
                                    })}
                                </select>
                                {errors.acadmicYear && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.acadmicYear.message}
                                    </p>
                                )}
                            </div>

                            <>
                                <div className="input-group  w-full max-w-[30.5rem] mx-auto">
                                    <label className="block font-medium text-sm mb-1">
                                        Section <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        {...register("section", {
                                            required: "Section is required",
                                        })}
                                        onChange={e => {
                                            clearErrors("section");
                                            const batch = [];
                                            for (let i = 1; i <= 5; i++) {
                                                batch.push(`${e.target.value}${i}`);
                                            }
                                            console.log(batch);

                                            setBatches(batch);
                                        }}
                                        className="w-full border-gray-300 rounded-md shadow-sm px-4 py-[10px] border focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select Section</option>
                                        {sections.map((option, index) => {
                                            return (
                                                <option key={index} value={option}>
                                                    {option}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {errors.section && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.section.message}
                                        </p>
                                    )}
                                </div>

                                {isBatch && <div className="input-group  w-full max-w-[30.5rem] mx-auto">
                                    <label className="block text-sm font-medium mb-1">
                                        Batch <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        {...register("batch", {
                                            required: "Batch is required",
                                        })}
                                        className="w-full border-gray-300 rounded-md shadow-sm px-4 py-[10px] border focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select Batch</option>
                                        {batches.map((option, index) => {
                                            return (
                                                <option key={index} value={option}>
                                                    {option}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {errors.batch && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.batch.message}
                                        </p>
                                    )}
                                </div>}
                                <div className='my-4 flex justify-end px-2 w-full max-w-[30.5rem] mx-auto'>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={isBatch}
                                            onChange={handleChecked}
                                        />
                                        <span className="ms-3 text-base mr-2 font-medium text-gray-900 dark:text-gray-300">
                                            Create Batch Specific Session
                                        </span>
                                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>

                                    </label>
                                </div>
                            </>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className=" py-1 mx-auto my-4 box-border px-2 h-10  bg-[#00FF00] hover:bg-opacity-70  font-poppins text-xl flex justify-center items-center font-[500] text-[#3F0071] rounded-md"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </>)}
            </section >
            {
                students.length > 0 && <>
                    <Table students={students} readOnly={false} defaultAbsentStudent={false} />
                    <div>
                        <button
                            type="button"
                            onClick={handleSave}
                            className=" py-1 mx-auto my-4 box-border px-2 h-10  bg-[#00FF00] hover:bg-opacity-70  font-poppins text-xl flex justify-center items-center font-[500] text-[#3F0071] rounded-md"
                        >
                            Save and export
                        </button>
                    </div>
                </>
            }
            {students.length === 0 && isSearched && (
                <>
                    <section className="load mb-4 w-80 py-4 flex flex-col justify-start items-center bg-white mt-2 rounded-lg shadow-md ">
                        <h1 className="text-center text-red-500 font-poppins text-xl m-auto">No students found</h1>
                    </section>
                </>
            )}

            {/* loading popup */}
            {isLoading && popup()}


        </Suspense>
    )
}



export default page
