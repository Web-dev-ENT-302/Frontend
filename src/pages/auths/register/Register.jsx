import { Link, useNavigate } from "react-router-dom";

/* components */
import Button from "../../../components/button/Button";
import Spinner from "../../../components/Spinner";

/* icons */
import { FaUserGraduate } from "react-icons/fa6";
import { FaIdCard, FaPhoneAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";



const Register = () => {
  const [tab, setTab] = useState("student");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [feedback, setFeedback] = useState({ Status: false, Type: "", Message: "", });

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
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
      phoneNumber: "",
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
          phone: formData.phoneNumber,
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
        setFeedback({ Status: true, Type: "failed", Message: data.error });

        /* 
        Explicitly check for error if plate number format do not match
        so as to display a shoter message instead of the long data.error msg from server
        */
        if (data.error === "Plate number is required for drivers and must be in the format ABC-123DE") {
          setFeedback({ Status: true, Type: "failed", Message: "Plate number must be in the format ABC-123DE" });
        }
        return;
      }

      // Handle successful response
      setFeedback({ Status: true, Type: "success", Message: "Account created successfully!" });

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
                Student/Staff
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
                <label htmlFor="name" className="text-[.8rem] md:figcaption">Full Name</label>
                <div className="relative mt-1">
                  <FaUser className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                  <input type="text" id="name" name="name" autoComplete="on" value={formData.name} onChange={handleChange} className="w-full text-[#929292] py-[.60rem] pl-9 pr-6 text-[.8rem] md:text-[.9rem]  rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none" placeholder="Enter your full name" required />
                </div>
              </div>


              {/* email */}
              <div className="mb-5">
                <label htmlFor="email" className="figcaption">Email</label>
                <div className="relative mt-1">
                  <IoMail className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                  <input type="email" id="email" name="email" autoComplete="on" value={formData.email} onChange={handleChange} className="w-full text-[#929292] py-[.60rem] pl-9 pr-6 text-[.8rem] md:text-[.9rem]  rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none" placeholder="Enter your email" required />
                </div>
              </div>

              {/* phone */}
              <div className="mb-5">
                <label htmlFor="phoneNumber" className="figcaption">Phone Number</label>
                <div className="relative mt-1">
                  <FaPhoneAlt className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                  <input type="tel" id="phoneNumber" name="phoneNumber" autoComplete="on" value={formData.phoneNumber} onChange={handleChange} className="w-full text-[#929292] py-[.60rem] pl-9 pr-6 text-[.8rem] md:text-[.9rem]  rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none" placeholder="+2348123456790" required />
                </div>
              </div>


              {/* password */}
              <div className="mb-5">
                <label htmlFor="password" className="figcaption">Password</label>
                <div className="relative mt-1">
                  <FaLock className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full text-[#929292] py-[.60rem] pl-9 pr-10 text-[.8rem] md:text-[.9rem]  rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-[.8rem] right-3 text-[#929292] text-[.8rem] md:text-[.9rem] hover:text-[--primary] transition-colors"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>


              {/* confirm password */}
              <div className="mb-5">
                <label htmlFor="confirmPassword" className="figcaption">Confirm Password</label>
                <div className="relative mt-1">
                  <FaLock className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full text-[#929292] py-[.6rem] pl-9 pr-10 text-[.8rem] md:text-[.9rem]  rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-[.8rem] right-3 text-[#929292] text-[.8rem] md:text-[.9rem] hover:text-[--primary] transition-colors"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Tricycle Plate Number: Input is dplayed when user switch to drivers tab */}
              {tab === "driver" &&
                <div className="mb-5">
                  <label htmlFor="plateNumber" className="figcaption">Tricycle Plate Number</label>
                  <div className="relative mt-1">
                    <FaIdCard className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                    <input type="text" id="plateNumber" name="plateNumber" value={formData.plateNumber} onChange={handleChange} className="w-full text-[#929292] py-[.6rem] pl-9 pr-6 text-[.8rem] md:text-[.9rem]  rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none" placeholder="Enter your plate number" required />
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