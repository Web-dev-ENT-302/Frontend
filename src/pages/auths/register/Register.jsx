import Button from "../../../components/button/Button";
import { FaUserGraduate, FaIdCard, FaUser, FaLock } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [tab, setTab] = useState("student");
  const [loading, setLoading] = useState(false); // loader state
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "" }); // snackbar state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    plateNumber: "",
  });

  function handleTabChange(currentTab) {
    setTab(currentTab);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      plateNumber: "",
    });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showSnackbar("Passwords do not match", "error");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: tab.toUpperCase(),
          ...(tab === "driver" && { plateNumber: formData.plateNumber }),
        },
        { withCredentials: true }
      );

      showSnackbar("Account created successfully!", "success");
      console.log("Registered:", res.data);
    } catch (err) {
      console.error(err);
      showSnackbar(err.response?.data?.error || "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  }

  function showSnackbar(message, type) {
    setSnackbar({ open: true, message, type });
    setTimeout(() => setSnackbar({ open: false, message: "", type: "" }), 3000);
  }

  return (
    <div className="relative flex justify-center w-full h-full login-wrapper">
      <div className="w-[90%] md:w-[60%] lg:w-[38%] bg-white shadow rounded-[10px] my-[7rem] relative">
        <div className="text-center p-[1.5rem] mt-2">
          <h4 className="mb-2 text-[--heading-text] font-medium">Sign Up</h4>
          <p className="figcaption text-[--body-text]">
            Fast & safe rides around campus
          </p>
        </div>

        {/* Tabs */}
        <div className="flex w-full mt-2">
          <button
            className={`w-1/2 py-3 border-b-2 ${
              tab === "student"
                ? "bg-[--primary-3] border-b-[--primary] text-[--primary]"
                : ""
            }`}
            onClick={() => handleTabChange("student")}
          >
            <p className="flex items-center justify-center gap-2">
              <FaUserGraduate /> Student
            </p>
          </button>
          <button
            className={`w-1/2 py-3 border-b-2 ${
              tab === "driver"
                ? "bg-[--primary-3] border-b-[--primary] text-[--primary]"
                : ""
            }`}
            onClick={() => handleTabChange("driver")}
          >
            <p className="flex items-center justify-center gap-2">
              <FaIdCard /> Driver
            </p>
          </button>
        </div>

        {/* Form */}
        <form
          className="mt-1 py-[1.8rem] px-[1.2rem] md:px-[1.8rem]"
          onSubmit={handleSubmit}
        >
          {/* Full Name */}
          <div className="mb-5">
            <label className="text-[.8rem]">Full Name</label>
            <div className="relative mt-1">
              <FaUser className="absolute top-[.8rem] left-3 text-[#929292]" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-9 pr-6 py-[.60rem] border rounded-[.5rem]"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="figcaption">Email</label>
            <div className="relative mt-1">
              <IoMail className="absolute top-[.8rem] left-3 text-[#929292]" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-9 pr-6 py-[.60rem] border rounded-[.5rem]"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label>Password</label>
            <div className="relative mt-1">
              <FaLock className="absolute top-[.8rem] left-3 text-[#929292]" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-9 pr-6 py-[.60rem] border rounded-[.5rem]"
                placeholder="Create a password"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-5">
            <label>Confirm Password</label>
            <div className="relative mt-1">
              <FaLock className="absolute top-[.8rem] left-3 text-[#929292]" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-9 pr-6 py-[.60rem] border rounded-[.5rem]"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          {/* Plate Number (only for driver) */}
          {tab === "driver" && (
            <div className="mb-5">
              <label>Tricycle Plate Number</label>
              <div className="relative mt-1">
                <FaIdCard className="absolute top-[.8rem] left-3 text-[#929292]" />
                <input
                  type="text"
                  name="plateNumber"
                  value={formData.plateNumber}
                  onChange={handleChange}
                  className="w-full pl-9 pr-6 py-[.60rem] border rounded-[.5rem]"
                  placeholder="Enter your plate number"
                  required
                />
              </div>
            </div>
          )}

          <div className="mt-10">
            <Button
              value={
                loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-t-transparent border-[--primary] rounded-full animate-spin"></div>
                    Creating...
                  </div>
                ) : (
                  "Create Account"
                )
              }
              disabled={loading}
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-[.8rem]">
              Already have an account?{" "}
              <Link to="/login" className="text-[--primary] font-medium">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Snackbar */}
      {snackbar.open && (
        <div
          className={`fixed bottom-5 right-5 px-4 py-2 rounded shadow text-white ${
            snackbar.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {snackbar.message}
        </div>
      )}
    </div>
  );
};

export default Register;
