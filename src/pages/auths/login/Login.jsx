import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

/* components */
import Button from "../../../components/button/Button";

/* icons */
import { FaUserGraduate, FaIdCard, FaLock } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";

const Login = () => {
  const [tab, setTab] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleTabChange(currentTab) {
    setTab(currentTab);
    setError("");
    setEmail("");
    setPassword("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        {
          email,
          password,
          role: tab, // "student" or "driver"
        },
        { withCredentials: true }
      );

      console.log("Login success:", res.data);
      console.log("response:", res);

      // Save token if backend returns one
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // Redirect based on role
      if (tab === "student") {
        navigate("/student-dashboard");
      } else {
        navigate("/driver-dashboard");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex justify-center w-full h-full login-wrapper">
      <div className="w-[90%] md:w-[60%] lg:w-[38%] lg:max-w-[38%] bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.15)] rounded-[10px] my-[7rem] relative">
        <div className="text-center p-[1.5rem] mt-2">
          <h4 className="mb-2 text-[--heading-text] font-medium">Log in</h4>
          <p className="figcaption text-[--body-text]">
            Fast & safe rides around campus
          </p>
        </div>

        {/* Tabs */}
        <div className="flex w-full mt-2 navigation-tabs">
          <button
            className={`w-[50%] py-3 cursor-pointer border-b-2 ${
              tab === "student"
                ? "bg-[--primary-3] border-b-[--primary] text-[--primary]"
                : ""
            }`}
            onClick={() => handleTabChange("student")}
          >
            <p className="flex items-center justify-center gap-2 figcaption">
              <FaUserGraduate className="text-[1rem]" />
              Student
            </p>
          </button>
          <button
            className={`w-[50%] py-3 cursor-pointer border-b-2 ${
              tab === "driver"
                ? "bg-[--primary-3] border-b-[--primary] text-[--primary]"
                : ""
            }`}
            onClick={() => handleTabChange("driver")}
          >
            <p className="flex items-center justify-center gap-2 figcaption">
              <FaIdCard className="text-[1rem]" />
              Driver
            </p>
          </button>
        </div>

        {/* Form */}
        <div className="mt-1 py-[1.8rem] px-[1.2rem] md:px-[1.8rem]">
          <div className="mb-4">
            <h4 className="text-[--heading-text] font-medium text-[1rem] md:text-[1.10rem]">
              Welcome back!
            </h4>
          </div>

          <form onSubmit={handleSubmit}>
            {/* email */}
            <div className="mb-5">
              <label className="figcaption">Email</label>
              <div className="relative mt-1">
                <IoMail className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-[#929292] py-[.60rem] pl-9 pr-6 text-[.8rem] md:text-[.9rem] rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* password */}
            <div className="mb-5">
              <label className="figcaption">Password</label>
              <div className="relative mt-1">
                <FaLock className="top-[.8rem] left-3 absolute text-[#929292] text-[.8rem] md:text-[.9rem]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-[#929292] py-[.60rem] pl-9 pr-6 text-[.8rem] md:text-[.9rem] rounded-[.5rem] border-[1.5px] border-[#00000030] outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
            )}

            {/* button component */}
            <div className="mt-10">
              <Button value={loading ? "Logging in..." : "Log in"} />
            </div>

            <div className="mt-8 text-center">
              <p className="text-[.8rem] figcaption">
                Don’t have an account?{" "}
                <Link to="/register" className="text-[--primary] font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="absolute mt-[2.5rem] w-full">
          <p className="text-[.8rem] text-center">
            © 2025 RIDEit. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
