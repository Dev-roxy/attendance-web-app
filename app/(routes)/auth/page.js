"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import FlashMessage from "@/components/client/flashMessage";
import bgImage from "@/app/assets/background.jpg";

const AuthPage = () => {
  const sections = ["A", "B", "C", "D"];
  const acadmicYears = ["1st", "2nd", "3rd", "4th"];
  const semisters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
  const engineeringBranches = [
    "Aerospace Engineering",
    "Agricultural Engineering",
    "Automobile Engineering",
    "Biomedical Engineering",
    "Biotechnology Engineering",
    "Chemical Engineering",
    "Civil Engineering",
    "Computer Science Engineering",
    "Electrical Engineering",
    "Electronics and Communication Engineering",
    "Environmental Engineering",
    "Industrial Engineering",
    "Information Technology",
    "Instrumentation Engineering",
    "Marine Engineering",
    "Mechanical Engineering",
    "Metallurgical Engineering",
    "Mining Engineering",
    "Petroleum Engineering",
    "Production Engineering",
    "Robotics Engineering",
    "Software Engineering",
    "Structural Engineering",
    "Telecommunication Engineering",
    "Textile Engineering",
  ];

  const router = useRouter();

  const [batches, setBatches] = useState([]);
  const [section, setSection] = useState("");
  const [Message, setMessage] = useState("");
  const [Success, setSuccess] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  // const [isInstituteRegister, setIsInstituteRegister] = useState(false);
  const [userType, setUserType] = useState("student");
  const [isLogin, setIsLogin] = useState(true);
  const [reapply, setReapply] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({});


  const onSubmit = async data => {
    const loginAs = data.userType;

    let success = false;
    if (!isRegister) {
      const requestUrl = `/api/user/login`;
      const response = await fetch(requestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(async res => {
        try {
          let data = await res.json();
          setMessage(data.message);
          setSuccess(data.success);
          success = data.success;
        } catch (err) {
          console.log(err.message);
        }

        if (success) {
          if (loginAs === "teacher") {
            router.push("/student/dashboard");
          } else if (loginAs === "admin") {
            router.push("/admin/dashboard");
          } else if (loginAs === "student") {
            router.push("/student/dashboard");
          }
        }
      });
    } else if (isRegister) {
      if (reapply) {
        delete data.confirmPassword;
        const requestUrl = `/api/teacher/reapply`;
        const response = await fetch(requestUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then(async res => {
          try {
            let data = await res.json();
            setMessage(data.message);
            setSuccess(data.success);
            success = data.success;
          } catch (err) {
            console.log(err.message);
          }

          if (success) {
            setIsRegister(false);
          }
        });
      } else {
        delete data.confirmPassword;
        const requestUrl = `/api/user/register`;
        const response = await fetch(requestUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then(async res => {
          try {
            let data = await res.json();
            setMessage(data.message);
            setSuccess(data.success);
            success = data.success;
          } catch (err) {
            console.log(err.message);
          }

          if (success) {
            setIsRegister(false);
          }
        });
      }

    }
  };

  return (
    <>
      {Message && (
        <FlashMessage
          message={Message}
          success={Success}
          callback={setMessage}
        />
      )}
      <div
        className={`bg-slate-400 bg-no-repeat bg-cover min-h-screen flex items-center justify-center`}
      >
        <div
          className={`w-fit max-w-[90%] p-8 bg-white bg-opacity-70 backdrop-blur-sm shadow-lg  rounded-lg`}
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            {isRegister ? reapply ? "Re-apply" : "Register" : isLogin ? "Login" : "Register Institute"}
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-[40rem] flex flex-wrap justify-center items-center w-[95%] min-h-[90%] mx-auto"
          >
            <div className="flex  justify-center items-center gap-2">
              <label className="block font-medium text-xl text-nowrap ">
                User type
              </label>
              <select
                {...register("userType", {
                  required: "User Type is required",
                })}
                onChange={e => {
                  setUserType(e.target.value);
                }}
                className="w-full  border-gray-300 rounded-md shadow-sm px-4 py-2 border focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                {!isRegister && <option value="admin">Admin</option>}
              </select>
              {errors.userType && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.userType.message}
                </p>
              )}
            </div>
            <div className="w-full">
              {isRegister && (
                <div className="w-fit mx-auto flex flex-wrap justify-center gap-2">
                  <div className="input-group">
                    <label className="block text-sm font-medium mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("firstName", {
                        required: "First Name is required",
                      })}
                      className="w-full border-gray-300 px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="input-group">
                    <label className="block text-sm font-medium mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("lastName", {
                        required: "Last Name is required",
                      })}
                      className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 border focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="w-fit mx-auto flex flex-wrap justify-center gap-2">
                <div className="input-group">
                  <label className="block text-sm font-medium mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    {...register("email", {
                      required: "Email is required",
                    })}
                    className="w-full border-gray-300 px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                {isRegister && (
                  <div className="input-group">
                    <label className="block text-sm font-medium mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("phone", {
                        maxLength: {
                          value: 10,
                          message: "Phone number should be 10 digits",
                        },
                        minLength: {
                          value: 10,
                          message: "Phone number should be 10 digits",
                        },
                        required: "Phone is required",
                      })}
                      className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 border focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="w-fit mx-auto flex flex-wrap justify-center gap-2">
                {isRegister && userType === "student" && (
                  <div className="input-group">
                    <label className="block text-sm font-medium mb-1">
                      student Id <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register(`studentId`, {
                        required: `studentId Id is required`,
                      })}
                      className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 border focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.studentId && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.studentId.message}
                      </p>
                    )}
                  </div>
                )}
                {isRegister && userType === "teacher" && (
                  <div className="input-group">
                    <label className="block text-sm font-medium mb-1">
                      teacher Id <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register(`teacherId`, {
                        required: `teacherId Id is required`,
                      })}
                      className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 border focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.teacherId && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.teacherId.message}
                      </p>
                    )}
                  </div>
                )}
                {isRegister && (
                  <div className="input-group">
                    <label className="block text-sm font-medium mb-1">
                      Institute Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("institute", {
                        required: "Institute Name is required",
                      })}
                      className="w-full border-gray-300 px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.institute && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.institute.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <>
                {isRegister && userType === "student" && (
                  <>
                    <div className="w-fit mx-auto flex flex-wrap justify-center gap-2">
                      <div className="input-group">
                        <label className="block text-sm font-medium mb-1">
                          Roll No. <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          {...register("rollNo", {
                            required: "Roll No. is required",
                          })}
                          className="w-full border-gray-300 px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.rollNo && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.rollNo.message}
                          </p>
                        )}
                      </div>
                      <div className="input-group">
                        <label className="block font-medium text-sm mb-1 ">
                          acadmic year <span className="text-red-500">*</span>
                        </label>
                        <select
                          {...register("acadmicYear", {
                            required: "acadmic year is required",
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
                    </div>
                    <div className="w-fit mx-auto flex flex-wrap justify-center gap-2">
                      <div className="input-group">
                        <label className="block font-medium text-sm mb-1">
                          Semister <span className="text-red-500">*</span>
                        </label>
                        <select
                          {...register("semister", {
                            required: "Semister is required",
                          })}
                          className="w-full border-gray-300 rounded-md shadow-sm px-4 py-[10px] border focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Semister</option>
                          {semisters.map((option, index) => {
                            return (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            );
                          })}
                        </select>
                        {errors.semister && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.semister.message}
                          </p>
                        )}
                      </div>
                      <div className="input-group">
                        <label className="block font-medium text-sm mb-1">
                          Gender <span className="text-red-500">*</span>
                        </label>
                        <select
                          {...register("gender", {
                            required: "Gender is required",
                          })}
                          className="w-full border-gray-300 rounded-md shadow-sm px-4 py-[10px] border focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Gender</option>
                          {["male", "female", "other"].map((option, index) => {
                            return (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            );
                          })}
                        </select>
                        {errors.gender && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.gender.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="w-fit mx-auto flex flex-wrap justify-center gap-2">
                      <div className="input-group">
                        <label className="block font-medium text-sm mb-1">
                          Section <span className="text-red-500">*</span>
                        </label>
                        <select
                          {...register("section", {
                            required: "Section is required",
                          })}
                          onChange={e => {
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

                      <div className="input-group">
                        <label className="block text-sm font-medium mb-1">
                          Batch <span className="text-red-500">*</span>
                        </label>
                        <select
                          {...register("batch", {
                            required: "batch is required",
                          })}
                          className="w-full border-gray-300 rounded-md shadow-sm px-4 py-[10px] border focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Section</option>
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
                      </div>
                    </div>
                  </>
                )}
              </>
              {isRegister && userType === "student" && (
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
              )}



              <div className="w-fit mx-auto flex flex-wrap justify-center gap-2">
                <div className="input-group">
                  <label className="block text-sm font-medium mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: [6, "password should have mininum 6 length"],
                      maxLength: [12, "password should have maximum 12 length"],
                    })}
                    className="w-full border-gray-300 px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {isRegister && (
                  <div className="input-group">
                    <label className="block text-sm font-medium mb-1">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      {...register("confirmPassword", {
                        required: "Confirm Password is required",
                        validate: value =>
                          value === getValues("password") ||
                          "Passwords does not match",
                      })}
                      className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 border focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <div className="w-fit mx-auto flex flex-wrap justify-center gap-2">
                <div className="input-group flex">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className=" mx-auto bg-blue-600 outline-none my-4 w-[10rem] text-white py-2 px-4 rounded-md hover:bg-blue-700 "
                  >
                    {isRegister ? reapply ? "Reapply" : "Register" : "Login"}
                  </button>
                </div>
              </div>
            </div>
          </form>
          {
            isRegister && userType === 'teacher' && !reapply && (
              <p className="text-sm text-center mt-4">
                Your register application is rejected?{" "}
                <button
                  type="button"
                  onClick={e => {
                    setReapply(true)
                  }}
                  className="text-blue-600  hover:underline"
                >
                  Re-apply
                </button>
              </p>
            )
          }
          {
            isRegister && userType === 'teacher' && reapply && (
              <p className="text-sm text-center mt-4">
                Don't want to re-apply?{" "}
                <button
                  type="button"
                  onClick={e => {
                    setReapply(false)
                  }}
                  className="text-blue-600  hover:underline"
                >
                  Back to Register 
                </button>
              </p>
            )
          }
          <p className="text-sm text-center mt-4">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={e => {
                if (userType === 'admin') {
                  setUserType('student')
                }
                if (e.target.innerText === "Login") {
                  setIsRegister(false);
                  setIsLogin(true);
                  setReapply(false)
                } else if (e.target.innerText === "Register") {
                  setIsRegister(true);
                  setIsLogin(true);
                  setReapply(false)
                }
              }}
              className="text-blue-600  hover:underline"
            >
              {isRegister ? "Login" : "Register"}
            </button>
          </p>

        </div>
      </div>
    </>
  );
};

export default AuthPage;
