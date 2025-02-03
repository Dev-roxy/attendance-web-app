import React,{useState} from 'react'
import Table from '@/components/server/Table.layout'

const RenderPopup = ({setMessage,  setShowPopup,sessionCode ,enrollment_no,setSuccess,setIsSession,setSessionCode}) => {
   
         const [students, setStudents] = useState([]);
        const handleEndAndExport = async () => {
            const response = await fetch("/api/attendance/session/end", {
                method: "POST",
                body: JSON.stringify({ enrollment_no, sessionCode }),
                headers: {
                    "Content-Type": "application/json",
                },
            }, { cache: 'no-store' })
                
            const data = await response.json()
            if (response.ok){
                setSuccess(data.success)
                setStudents(data.students)
                setIsSession(false)
                setSessionCode("")
                setShowPopup(true)
                setMessage(data.message)
            }else {
                setSuccess(data.success)
                setMessage(data.message)
                setShowPopup(false)
                }
        }
    
        return (
            <div className="fixed inset-0  flex items-center justify-center  bg-slate-300 bg-opacity-60 backdrop-blur-sm z-10 mx-0">
                <section className="relative w-80   rounded-lg">
                    {/* Close button on top-right */}
                    <button
                        onClick={() => { setShowPopup(false) }}
                        className="absolute top-[-1rem] right-2 text-gray-500 hover:text-gray-800 bg-white rounded-full w-6 h-6 m-0  flex items-center justify-center"
                    >×</button>
    
                    <Table students={students} readOnly={true} />
    
    
                    <div className="flex justify-around py-4">
    
                        <button
                            onClick={handleEndAndExport}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                            End and export to excel
                        </button>
                    </div>
                </section>
            </div>
        );
    };
export default  RenderPopup
