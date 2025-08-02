import Navbar from "../../../components/navbar/Navbar"

/* icons */
import { FaUserGraduate } from "react-icons/fa6";
import { FaIdCard } from "react-icons/fa";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import { Link } from "react-router-dom";

/* components */
import Button from "../../../components/button/Button";

const Register = () => {

  const [tab, setTab] = useState("student")
  function handleTabChange(currentTab) {
    if (currentTab === "driver") {
      setTab("driver")
    } else {
      setTab("student")
    }
  }
  return (
    <>
      {/* navbar component */}
      <Navbar />

      {/* student sign up component */}
      <div className="login-wrapper relative w-full h-full flex justify-center">
        <div className="w-[90%] md:w-[60%] lg:w-[38%]  lg:max-w-[38%] bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.15)] rounded-[10px] my-[7rem] relative">
          <div className="text-center p-[1.5rem] mt-2">
            <h4 className="mb-2 text-[--heading-text] font-medium">Sign Up</h4>
            <p className="figcaption text-[--body-text]">Fast & safe rides around campus</p>
          </div>

          <div className="navigation-tabs mt-2 flex w-full ">
            <button className={`w-[50%]  py-3 cursor-pointer border-b-2  ${tab === 'student' ? 'bg-[--primary-3] border-b-[--primary] text-[--primary]' : ''}`} onClick={() => handleTabChange("student")}>
              <p className="figcaption flex items-center justify-center gap-2 ">
                <FaUserGraduate className="text-[1rem]" />
                Student
              </p>
            </button>
            <button className={`w-[50%] py-3 cursor-pointer border-b-2  ${tab === 'driver' ? 'bg-[--primary-3] border-b-[--primary] text-[--primary]' : ''}`} onClick={() => handleTabChange("driver")}>
              <p className="figcaption flex items-center justify-center gap-2 ">
                <FaIdCard className="text-[1rem]" />
                Driver</p>
            </button>
          </div>

          <div className="mt-1 py-[1.8rem] px-[1.2rem] md:px-[1.8rem]">

            <div className="mb-4">
              <h4 className="text-[--heading-text] font-medium text-[1rem] md:text-[1.10rem]">Create your account</h4>
            </div>

            {
              // If the tab on student, display student's regitration form, else display drivers registration form
              tab === "student" ?
                <>
                  <form method="POST">
                    {/* full name */}
                    <div className="mb-5">
                      <label htmlFor="" className="text-[.8rem] md:figcaption">Full Name</label>
                      <div className="relative mt-1">
                        <FaUser className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                        <input type="text" className="w-full text-[#929292] py-[.60rem] pl-9 pr-6 text-[.8rem] md:text-[.9rem]  rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none" placeholder="Enter your full name" required />
                      </div>
                    </div>


                    {/* email */}
                    <div className="mb-5">
                      <label htmlFor="" className="figcaption">Email/Phone</label>
                      <div className="relative mt-1">
                        <IoMail className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                        <input type="text" className="w-full text-[#929292] py-[.60rem] pl-9 pr-6 text-[.8rem] md:text-[.9rem]  rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none" placeholder="Enter your email or Phone" required />
                      </div>
                    </div>


                    {/* password */}
                    <div className="mb-5">
                      <label htmlFor="" className="figcaption">Password</label>
                      <div className="relative mt-1">
                        <FaLock className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                        <input type="password" className="w-full text-[#929292] py-[.60rem] pl-9 pr-6 text-[.8rem] md:text-[.9rem]  rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none" placeholder="Create a password" required />
                      </div>
                    </div>


                    {/* confirm password */}
                    <div className="mb-5">
                      <label htmlFor="" className="figcaption">Confirm Password</label>
                      <div className="relative mt-1">
                        <FaLock className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                        <input type="password" className="w-full text-[#929292] py-[.6rem] pl-9 pr-6 text-[.8rem] md:text-[.9rem]  rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none" placeholder="Confirm your password" required />
                      </div>
                    </div>


                    {/* button component */}
                    <div className="mt-10">
                      <Button value="Create Account" />
                    </div>

                    <div className="text-center mt-8">
                      <p className="text-[.8rem] figcaption">Already have an account? <Link to="/login" className="text-[--primary] font-medium">Log in</Link></p>
                    </div>
                  </form>
                </>
                :
                <>
                  <form method="POST">
                    {/* full name */}
                    <div className="mb-5">
                      <label htmlFor="" className="text-[.8rem] md:figcaption">Full Name</label>
                      <div className="relative mt-1">
                        <FaUser className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                        <input type="text" className="w-full text-[#929292] py-[.60rem] pl-9 pr-6 text-[.8rem] md:text-[.9rem]  rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none" placeholder="Enter your full name" required />
                      </div>
                    </div>


                    {/* email */}
                    <div className="mb-5">
                      <label htmlFor="" className="figcaption">Email/Phone</label>
                      <div className="relative mt-1">
                        <IoMail className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                        <input type="text" className="w-full text-[#929292] py-[.60rem] pl-9 pr-6 text-[.8rem] md:text-[.9rem]  rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none" placeholder="Enter your email or Phone" required />
                      </div>
                    </div>


                    {/* password */}
                    <div className="mb-5">
                      <label htmlFor="" className="figcaption">Password</label>
                      <div className="relative mt-1">
                        <FaLock className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                        <input type="password" className="w-full text-[#929292] py-[.60rem] pl-9 pr-6 text-[.8rem] md:text-[.9rem]  rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none" placeholder="Create a password" required />
                      </div>
                    </div>


                    {/* confirm password */}
                    <div className="mb-5">
                      <label htmlFor="" className="figcaption">Confirm Password</label>
                      <div className="relative mt-1">
                        <FaLock className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                        <input type="password" className="w-full text-[#929292] py-[.6rem] pl-9 pr-6 text-[.8rem] md:text-[.9rem]  rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none" placeholder="Confirm your password" required />
                      </div>
                    </div>


                    {/* Tricycle Plate Number */}
                    <div className="mb-5">
                      <label htmlFor="" className="figcaption">Tricycle Plate Number</label>
                      <div className="relative mt-1">
                        <FaIdCard className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                        <input type="password" className="w-full text-[#929292] py-[.6rem] pl-9 pr-6 text-[.8rem] md:text-[.9rem]  rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none" placeholder="Enter your plate number" required />
                      </div>
                    </div>

                    {/* button component */}
                    <div className="mt-10">
                      <Button value="Create Account" />
                    </div>

                    <div className="text-center mt-8">
                      <p className="text-[.8rem] figcaption">Already have an account? <Link to="/login" className="text-[--primary] font-medium">Log in</Link></p>
                    </div>
                  </form>

                </>
            }

          </div>
          <div className="absolute mt-[2.5rem] w-full">
            <p className="text-[.8rem] text-center">© 2025 RIDEit. All rights reserved.</p>
          </div>
        </div>

      </div>
    </>
  )
}

export default Register