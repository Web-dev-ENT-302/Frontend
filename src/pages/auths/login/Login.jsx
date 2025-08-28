import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { jwtDecode } from 'jwt-decode';

/* components */
import Spinner from "../../../components/Spinner";
import Button from '../../../components/button/Button'

/* icons */
import { FaUserGraduate } from "react-icons/fa6";
import { FaIdCard } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";



const Login = () => {
    const [tab, setTab] = useState("student");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [feedback, setFeedback] = useState({ Status: false, Type: "", Message: "", })
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { login } = useContext(AuthContext)

    // Handler for student and driver tab switch
    function handleTabChange(currentTab) {
        setTab(currentTab)

        // clear form input when user switches tab
        setFormData({
            email: "",
            password: ""
        })
    }

    // Handler to update form input data
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    role: tab,
                }),
                credentials: 'include',
            });

            const data = await res.json();

            // Check if the response was successful
            if (!res.ok) {
                // Handle Failed Response
                setFeedback({ Status: true, Type: "failed", Message: data.error });

                // Explicitly check for invalid crendential error
                if (data.error === "Invalid credentials") {
                    setFeedback({ Status: true, Type: "failed", Message: data.error });
                }
                return;
            }

            // handle success response
            const userRole = jwtDecode(data.token).role; // decode token and fetch user's role
            // verify if user is initiating log from the designated tab
            if (tab.toUpperCase() === userRole) {
                login(data); // proceed to log user in
            } else {
                setFeedback({ Status: true, Type: "failed", Message: "Invalid credentials" });
                return;
            }
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
            {/* student sign in component */}
            <div className="relative flex justify-center w-full h-full login-wrapper">
                <div className="w-[90%] md:w-[60%] lg:w-[38%]  lg:max-w-[38%] bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.15)] rounded-[10px] my-[7rem] relative">
                    <div className="text-center p-[1.5rem] mt-2">
                        <h4 className="mb-2 text-[--heading-text] font-medium">Log in</h4>
                        <p className="figcaption text-[--body-text]">Fast & safe rides around campus</p>
                    </div>

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

                    <div className="mt-1 py-[1.8rem] px-[1.2rem] md:px-[1.8rem]">


                        {/* Form */}
                        <form method="POST" onSubmit={handleSubmit}>
                            {/* email */}
                            <div className="mb-5">
                                <label htmlFor="email" className="figcaption">Email</label>
                                <div className="relative mt-1">
                                    <IoMail className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                                    <input type="email" id="email" name="email" autoComplete="on" value={formData.email} onChange={handleChange} className="w-full text-[#929292] py-[.60rem] pl-9 pr-6 text-[.8rem] md:text-[.9rem]  rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none" placeholder="Enter your email" required />
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
                                        placeholder="Enter your password" 
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

                            {/* button component */}
                            <div className="mt-10">
                                {
                                    loading ?
                                        <button className="bg-[--primary] w-full rounded-[.5rem] py-[.7rem] text-white text-[.8rem] md:text-[.9rem] font-semibold flex  items-center justify-center gap-2 disabled:cursor-not-allowed" disabled>
                                            <Spinner />
                                            Logging in...
                                        </button>
                                        :
                                        <Button value="Log in" />
                                }

                            </div>

                            <div className="mt-8 text-center">
                                <p className="text-[.8rem] figcaption">Don’t have an account? <Link to="/register" className="text-[--primary] font-medium">Sign up</Link></p>
                            </div>
                        </form>

                    </div>


                    <div className="absolute mt-[2.5rem] w-full">
                        <p className="text-[.8rem] text-center">© {new Date().getFullYear()} RIDEit. All rights reserved.</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Login