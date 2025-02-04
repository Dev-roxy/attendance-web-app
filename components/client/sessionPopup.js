import React, { useState } from 'react'
import Table from '@/components/server/Table.layout'

const RenderPopup = ({ setMessage,generateSessionCode, confirmEnd, setConfirmEnd, setShowPopup, sessionCode, enrollment_no, setSuccess, setIsSession, setSessionCode }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [students, setStudents] = useState([]);
    const handleEndAndExport = async () => {
        const response = await fetch("/api/attendance/session/save", {
            method: "POST",
            body: JSON.stringify(students),
            headers: {
                "Content-Type": "application/json",
            },
        }, { cache: 'no-store' })

        if (response.ok) {
            // 🔹 1. Response Stream Read Karo
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            // 🔹 2. Download Trigger Karo
            const a = document.createElement("a");
            a.href = url;
            a.download = "students.xlsx";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }
        const handleConfirmEnd = async () => {
            setConfirmEnd(false)
            setIsLoading(true)
            const response = await fetch("/api/attendance/session/end", {
                method: "POST",
                body: JSON.stringify({ enrollment_no, sessionCode }),
                headers: {
                    "Content-Type": "application/json",
                },
            }, { cache: 'no-store' })

            const data = await response.json()
            if (response.ok) {
                console.log(data)
                setIsLoading(false)
                setMessage(data.message)
                setSuccess(data.success)
                setStudents(data.students)
                setIsSession(false)
                setSessionCode(generateSessionCode())
            } else {
                setSuccess(data.success)
                setMessage(data.message)
                setShowPopup(false)
            }
        }

        return (
            <div className="fixed inset-0  flex items-center justify-center bg-slate-300 bg-opacity-60 backdrop-blur-sm z-10 mx-0">
                <section className="relative w-80 bg-white bg-opacity-75 p-4 rounded-lg">
                    {/* Close button on top-right */}
                    <button
                        onClick={() => { setShowPopup(false) }}
                        className="absolute top-[-2px] right-0 text-gray-500 hover:text-gray-800  rounded-full w-6 h-6 m-0  flex items-center justify-center"
                    >×</button>
                    {
                        confirmEnd && (
                            <div >
                                <div className="bg-red-200 text-red-800 px-4 py-2 rounded-lg">
                                    Are you sure you want to end the session?
                                </div>
                                <div className="flex justify-around py-4">

                                    <button
                                        onClick={handleConfirmEnd}
                                        className="bg-slate-500 text-white px-4 py-2 rounded-lg hover:bg-slate-600"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={() => {
                                            setConfirmEnd(false);
                                            setShowPopup(false);
                                        }}
                                        className="bg-slate-500 text-white px-4 py-2 rounded-lg hover:bg-slate-600"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        )
                    }
                    {isLoading && (<>
                        <h1 className="mx-auto text-xl mb-4  text-center px-4 text-[#3F0071] font-medium  font-poppins  ">
                            Ending session...
                        </h1>
                        <div className="loader mx-auto my-auto size-12 p-1 animate-spin flex justify-center items-center rounded-full bg-gradient-to-r from-blue-600 to-transparent">
                            <div className='bg-white dark:bg-black size-10 rounded-full '></div>
                        </div>
                    </>
                    )}

                    {!confirmEnd && !isLoading && (
                        <>
                            {
                                students.length > 0 && (
                                    <>
                                        <Table
                                            data={students}
                                            headers={["enrollment_no", "name", "attendance"]}
                                        />
                                        <div className="flex justify-around py-4">

                                            <button
                                                onClick={handleEndAndExport}
                                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                            >
                                                save and export to excel
                                            </button>
                                        </div>
                                    </>
                                )
                            }
                            {
                                students.length === 0 && (
                                    <div className="text-center text-red-500">
                                        No students attended the session
                                    </div>
                                )
                            }



                        </>
                    )}
                </section>
            </div>
        );
    };
    export default RenderPopup
