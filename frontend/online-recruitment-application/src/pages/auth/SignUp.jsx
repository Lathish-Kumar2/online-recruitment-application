import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { TextField } from "@mui/material";

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "candidate";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    estd: "",
    employees: "",
    turnover: "",
    fullName: "",
    phone: "",

  });

  useEffect(() => {
    document.title = `Sign Up - ${role === "employer" ? "Employer" : "Candidate"}`;
  }, [role]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();



    if (!formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all required fields!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      let response;

      if (role === "employer") {
        response = await axios.post("http://localhost:8080/api/auth/signup", {
          companyName: formData.companyName,
          estd: formData.estd,
          employees: formData.employees,
          turnover: formData.turnover,
          email: formData.email,
          password: formData.password,
          fullName: "Employer Admin",
          phone: formData.phone,

        });
      } else {
        response = await axios.post("http://localhost:8080/api/candidates/signup", {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        });
        
      }

      toast.success("Account created successfully!");

      setTimeout(() => navigate(`/login?role=${role}`), 1500);

    } catch (error) {
      console.error(error);
      toast.error("Signup failed!");
    }
  };


  return (
    <div className="min-h-screen flex mt-10 justify-center bg-gray-50">

      <div className="w-250 h-full overflow-hidden bg-white/40 backdrop-blur-md shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {role === "employer" ? "Employer Registration" : "Candidate Registration"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {role === "employer" ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  {/* <label className="block mb-2 text-black font-medium">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter organization name"
                    className="w-100 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  /> */}
                  <TextField
                    margin="normal"
                    label="Organization Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-100 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    name="companyName"
                  />
                </div>
                <div>
                  {/* <label className="block mb-2 text-gray-700 font-medium">Established Year</label>
                <input
                  type="text"
                  name="estd"
                  value={formData.estd}
                  onChange={handleChange}
                  placeholder="YYYY"
                  className="w-100 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                /> */}
                  <TextField
                    margin="normal"
                    label="Established Year"
                    value={formData.estd}
                    onChange={handleChange}
                    className="w-100 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none "
                    name="estd"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  {/* <label className="block mb-2 text-gray-700 font-medium">Number of Employees</label>
                  <input
                    type="text"
                    name="employees"
                    value={formData.employees}
                    onChange={handleChange}
                    placeholder="Number of employees"
                    className="w-100 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  /> */}
                  <TextField
                    margin="normal"
                    label="Number of Employees"
                    value={formData.employees}
                    onChange={handleChange}
                    className="w-100 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none "
                    name="employees"
                  />
                </div>
                <div>
                  {/* <label className="block mb-2 text-gray-700 font-medium">
                    Turnover (in ₹)
                  </label>
                  <input
                    type="text"
                    name="turnover"
                    value={formData.turnover}
                    onChange={handleChange}
                    placeholder="e.g., ₹10 Cr"
                    className="w-100 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  /> */}
                  <TextField
                    margin="normal"
                    label="Turnover (in ₹), e.g., ₹10 Cr"
                    value={formData.turnover}
                    onChange={handleChange}
                    className="w-100 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none "
                    name="turnover"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                {/* <label className="block mb-1 text-gray-700 font-medium">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-100 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                /> */}
                <TextField
                  margin="normal"
                  label="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-100 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none "
                  name="fullName"
                />
              </div>

              <div>
                {/* <label className="block mb-1 text-gray-700 font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-100 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                /> */}
                <TextField
                  margin="normal"
                  label="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-100 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none "
                  name="phone"
                />
              </div>
            </>
          )}

          {/* Common fields */}
          <div>
            {/* <label className="block mb-2 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-100 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            /> */}
            <TextField
              margin="normal"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-100 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none "
              name="email"
            />
          </div>

          <div>
            {/* <label className="block mb-2 text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-100 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            /> */}
            <TextField
              margin="normal"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-100 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none "
              name="password"
            />
          </div>

          <div>
            {/* <label className="block mb-2 text-gray-700 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className="w-100 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            /> */}
            <TextField
              margin="normal"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-100 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              name="confirmPassword"
            />
          </div>

          <button
            type="submit"
            className="w-100 ml-70 bg-indigo-600 text-white py-2 rounded-lg font-semibold cursor-pointer active:scale-95 hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate(`/login?role=${role}`)}
            className="text-indigo-600 font-bold hover:underline cursor-pointer text-md "
          >
            Login
          </button>
        </p>

        <ToastContainer position="top-center" />
      </div>
    </div >
  );
};

export default SignUp;
