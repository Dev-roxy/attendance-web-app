"use client"
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import FlashMessage from "@/components/client/flashMessage";
import RenderPopup from './sessionPopup';

const Page = ({ teacherId }) => {

    
    const [isSession, setIsSession] = useState(false)
    const [showTable, setShowTable] = useState(false)
    const [sessionCode, setSessionCode] = useState("")
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [location, setLocation] = useState({ latitude: null, longitude: null, accuracy: null });
    const [confirmEnd, setConfirmEnd] = useState(false);

    useEffect(() => {
        
        const generateSessionCode = () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let sessionCode = '';
            for (let i = 0; i < 5; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                sessionCode += characters[randomIndex];
            }
            return sessionCode;
        };
        const getCurrentPosition = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy,
                        });
                        setMessage('Location fetched successfully');
                        setSuccess(true);
                    },
                    (err) => {
                        setMessage(err.message);
                        setSuccess(false);
                        getCurrentPosition();
                    }, {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
                );
            } else {
                setMessage('Geolocation is not supported by this browser.');
                setSuccess(false);
            }
        }
        getCurrentPosition();
        if (sessionCode === "") {
            setSessionCode(generateSessionCode())
        }

    }, [sessionCode]);

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting },
        clearErrors,
    } = useForm({});


    const [batches, setBatches] = useState([]);

    const [showPopup, setShowPopup] = useState(false);

    const sections = ["A", "B", "C", "D"];
    const acadmicYears = ["1st", "2nd", "3rd", "4th"];
    const engineeringBranches = [
        "Civil Engineering",
        "Computer Science Engineering",
        "Electrical Engineering",
        "Electronics and Communication Engineering",
        "Information Technology",
    ];

    const onSubmit = async (data) => {
        if (location.latitude === null || location.longitude === null || location.accuracy === null) {
            setMessage('Location not fetched, please wait for a moment and try again');
            setSuccess(false);
            getCurrentPosition();
            return;
        } else {
            
            const response = await fetch("/api/attendance/session/create", {
                method: "POST",
                body: JSON.stringify({ ...data, ...location, enrollment_no: teacherId, sessionCode }),
                headers: {
                    "Content-Type": "application/json",
                },
            }, { cache: 'no-store' })
                .then(res => res.json())
                .then(data => {
                    setMessage(data.message)
                    setSuccess(data.success)
                    if (data.success) {
                        setIsSession(true)
                        setShowTable(false)
                    }

                })
        }
    }
    const handleEnd = async () => {
        setShowPopup(true)
        setConfirmEnd(true)
        

    }
    // Define a state variable to manage the checked state of the checkbox
    const [isBatch, setIsBatch] = useState(false);

    // Handle the change event to update the state
    const handleChecked = (event) => {
        setIsBatch(!isBatch);
    };






    return (
        <>{message && (
            <FlashMessage
                message={message}
                success={success}
                callback={setMessage}
            />
        )}
            <h1 className="mt-4 text-xl mb-[0.5rem] px-4 text-[#3F0071] font-medium  font-poppins text-left  ">
                Create Session
            </h1>
            <section className="load w-80 py-4 flex flex-col justify-start items-center bg-white mt-2 rounded-lg shadow-md ">
                {
                    isSession && (
                        <div className="showSessionInfo flex flex-col justify-start items-start w-full px-4">

                            <h1 className="text-xl w-[93.33%] mt-2 flex justify-start items-center box-border px-4 py-2 mx-auto rounded-lg mb-4 text-[#3F0071] bg-[#D7D7D7] font-medium  font-poppins  h-[35px]">Session Information</h1>
                            <div className="flex justify-center mt-6 items-center gap-2 w-full">
                                <div className="sessionCode border relative border-[#3F0071] text-2xl rounded-lg w-1/2 text-slate-600 h-10 px-2">
                                    <h1 className="text-[#3F0071] absolute top-[-27px] left-1 font-medium text-lg font-poppins">Session code</h1>
                                    {sessionCode}
                                </div>
                            </div>
                            <div className="flex justify-center my-6 items-center gap-2 w-full">
                                <div className="sessionCode border relative border-[#3F0071] text-2xl text-slate-600 rounded-lg w-1/2 h-10 px-2">
                                    <h1 className="text-[#3F0071] absolute top-[-27px] left-1 font-medium text-lg font-poppins">Teacher id</h1>
                                    {teacherId}
                                </div>
                            </div>
                        </div>
                    )
                }
                {!isSession && (<>
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
                                className=" py-1 mx-auto my-4 box-border px-2 h-10  bg-[#00FF00] hover:bg-opacity-70  font-poppins text-xl flex justify-center items-center font-[500] text-[#3F0071] rounded-md"
                            >
                                Create session
                            </button>
                        </div>
                    </form>
                </>)}
            </section >
            {isSession && <section className="load w-80 py-4 flex flex-col justify-start items-center bg-white mt-2 rounded-lg shadow-md ">
                <h1 className="mt-4 text-xl mb-4 px-4 text-[#3F0071] font-medium  font-poppins text-left  ">
                    Session is running...
                </h1>
                <div className="loader mx-auto my-auto size-12 p-1 animate-spin flex justify-center items-center rounded-full bg-gradient-to-r from-blue-600 to-transparent">
                    <div className='bg-white dark:bg-black size-10 rounded-full '></div>
                </div>
                <div className="buttons">
                    <button
                        type="submit"
                        onClick={handleEnd}
                        className="py-1 mt-8 mx-auto box-border  px-2 h-10  bg-[#00FF00] hover:bg-opacity-70  font-poppins text-xl flex justify-center items-center font-[500] text-[#3F0071] rounded-md">
                        End session
                    </button>
                </div>

            </section>

            }
            {/* Your form and other components */}
            {showPopup && (
                <RenderPopup
                    setShowPopup={setShowPopup}
                    sessionCode={sessionCode}
                    teacherId={teacherId}
                    setSuccess={setSuccess}
                    setIsSession={setIsSession}
                    setSessionCode={setSessionCode}
                    confirmEnd={confirmEnd}
                    setConfirmEnd={setConfirmEnd}
                    generateSessionCode={generateSessionCode}
                    setMessage={setMessage} // Pass setMessage as a prop
                />
            )}

        </>
    )
}



export default Page
