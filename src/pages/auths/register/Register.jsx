import { Link, useNavigate } from "react-router-dom";

/* components */
import Button from "../../../components/button/Button";
import Spinner from "../../../components/spinner/spinner";

/* icons */
import { FaUserGraduate } from "react-icons/fa6";
import { FaIdCard } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";



const Register = () => {
  const [tab, setTab] = useState("student");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ Status: false, Type: "", Message: "", });

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    plateNumber: ""
  })


  // Handler for student and driver tab switch
  const handleTabChange = (currentTab) => {
    setTab(currentTab)

    // clear form input when user switches tab
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      plateNumber: ""
    })
  }

  // Handler to update form input data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Handler form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if password match
    if (formData.password !== formData.confirmPassword) {
      setFeedback({ Status: true, Type: "failed", Message: "Password do not match!" });
      return;
    }

    // handle form submission
    try {
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: tab.toUpperCase(),
          ...(tab === "driver" && { plateNumber: formData.plateNumber }),
        }),
        credentials: 'include',
      }
      );

      const data = await res.json();

      // Check if the response was successful
      if (!res.ok) {
        // Handle Failed Response
        setFeedback({ Status: true, Type: "failed", Message: "Registration failed" });

        // log feedback to console
        console.log(data.error)
        return;
      }

      // Handle successful response
      setFeedback({ Status: true, Type: "success", Message: "Account created successfully!" });
      console.log(data)

      /* redirect user to login page */
      navigate("/login")
    } catch (err) {
      setFeedback({ Status: true, Type: "failed", Message: err.message });
    } finally {
      setLoading(false);
    }
  }

  // Only run if the value of feedback changes (true/false)
  useEffect(() => {
    // handle feedback messages using toast message
    if (feedback.Status) {
      /* display toast notification for 3000 miliseconds (3 seconds) */
      Notification(feedback.Type, feedback.Message)

      /* clear erros set */
      setFeedback({ Status: false, Type: "", Message: "" })
    }
  }, [feedback.Status])


  return (
    <>
      {/* student sign up component */}
      <div className="relative flex justify-center w-full h-full login-wrapper">
        <div className="w-[90%] md:w-[60%] lg:w-[38%]  lg:max-w-[38%] bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.15)] rounded-[10px] my-[7rem] relative">
          <div className="text-center p-[1.5rem] mt-2">
            <h4 className="mb-2 text-[--heading-text] font-medium">Sign Up</h4>
            <p className="figcaption text-[--body-text]">Fast & safe rides around campus</p>
          </div>


          {/* form tabs */}
          <div className="flex w-full mt-2 navigation-tabs ">
            <button className={`w-[50%]  py-3 cursor-pointer border-b-2  ${tab === 'student' ? 'bg-[--primary-3] border-b-[--primary] text-[--primary]' : ''}`} onClick={() => handleTabChange("student")}>
              <p className="flex items-center justify-center gap-2 figcaption ">
                <FaUserGraduate className="text-[1rem]" />
                Student
              </p>
            </button>
            <button className={`w-[50%] py-3 cursor-pointer border-b-2  ${tab === 'driver' ? 'bg-[--primary-3] border-b-[--primary] text-[--primary]' : ''}`} onClick={() => handleTabChange("driver")}>
              <p className="flex items-center justify-center gap-2 figcaption ">
                <FaIdCard className="text-[1rem]" />
                Driver</p>
            </button>
          </div>

          {/* FORM */}
          <div className="mt-1 py-[1.8rem] px-[1.2rem] md:px-[1.8rem]">
            <form method="POST" onSubmit={handleSubmit}>
              {/* full name */}
              <div className="mb-5">
                <label htmlFor="" className="text-[.8rem] md:figcaption">Full Name</label>
                <div className="relative mt-1">
                  <FaUser className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full text-[#929292] py-[.60rem] pl-9 pr-6 text-[.8rem] md:text-[.9rem]  rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none" placeholder="Enter your full name" required />
                </div>
              </div>


              {/* email */}
              <div className="mb-5">
                <label htmlFor="" className="figcaption">Email</label>
                <div className="relative mt-1">
                  <IoMail className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full text-[#929292] py-[.60rem] pl-9 pr-6 text-[.8rem] md:text-[.9rem]  rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none" placeholder="Enter your email" required />
                </div>
              </div>


              {/* password */}
              <div className="mb-5">
                <label htmlFor="" className="figcaption">Password</label>
                <div className="relative mt-1">
                  <FaLock className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                  <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full text-[#929292] py-[.60rem] pl-9 pr-6 text-[.8rem] md:text-[.9rem]  rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none" placeholder="Create a password" required />
                </div>
              </div>


              {/* confirm password */}
              <div className="mb-5">
                <label htmlFor="" className="figcaption">Confirm Password</label>
                <div className="relative mt-1">
                  <FaLock className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full text-[#929292] py-[.6rem] pl-9 pr-6 text-[.8rem] md:text-[.9rem]  rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none" placeholder="Confirm your password" required />
                </div>
              </div>

              {/* Tricycle Plate Number: Input is dplayed when user switch to drivers tab */}
              {tab === "driver" &&
                <div className="mb-5">
                  <label htmlFor="" className="figcaption">Tricycle Plate Number</label>
                  <div className="relative mt-1">
                    <FaIdCard className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                    <input type="text" name="plateNumber" value={formData.plateNumber} onChange={handleChange} className="w-full text-[#929292] py-[.6rem] pl-9 pr-6 text-[.8rem] md:text-[.9rem]  rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none" placeholder="Enter your plate number" required />
                  </div>
                </div>
              }


              {/* button component */}
              <div className="mt-10">
                {
                  loading ?
                    <button className="bg-[--primary] w-full rounded-[.5rem] py-[.7rem] text-white text-[.8rem] md:text-[.9rem] font-semibold flex  items-center justify-center gap-2 disabled:cursor-not-allowed" disabled>
                      <Spinner />
                      Creating your account...
                    </button>
                    :
                    <Button value="Create Account" />
                }
              </div>

              <div className="mt-8 text-center">
                <p className="text-[.8rem] figcaption">Already have an account? <Link to="/login" className="text-[--primary] font-medium">Log in</Link></p>
              </div>
            </form>

          </div>
          <div className="absolute mt-[2.5rem] w-full">
            <p className="text-[.8rem] text-center">© {new Date().getFullYear()} RIDEit. All rights reserved.</p>
          </div>
        </div >

      </div >
    </>
  )
}

export default Register