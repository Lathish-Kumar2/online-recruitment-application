import React, { useState, useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import { TextField } from "@mui/material"

const Login = () => {
  const [searchParams] = useSearchParams();
  const role1 = searchParams.get("type") || "candidate";
  const role2 = searchParams.get("role") || "candidate";
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  let role = role1 === role2 ? "candidate" : "employer";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = `Login - ${role === "employer" ? "Employer" : "Candidate"}`;
  }, [role]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        toast.error("Invalid email or password");
        return;
      }

      const user = await res.json();

      toast.success("Login successful!");

      // Store user globally
      login(user);

      // Redirect to employer dashboard
      setTimeout(() => {
        if (role === "candidate") {
          navigate(`/candidate/${user.id}/dashboard`);
        } else {
          navigate(`/employer/${user.id}/dashboard`);
        }

      }, 1200);
    } catch (err) {
      toast.error("Server error. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-250 h-150 bg-white/40 backdrop-blur-md shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login as <span className="text-indigo-600 capitalize">{role}</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="h-120 grid grid-cols-2 gap-4 items-center">
            <div className="bg-[url('src/assets/login1.png')] bg-cover h-full"></div>
            <div className="h-full flex flex-col justify-center py-4 space-y-4">
              <div>
                {/* <label className="block mb-2 text-black">Email</label> */}
                {/* <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                /> */}

                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  name="email"
                />
              </div>

              <div>
                {/* <label className="block mb-1 text-gray-700 font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                /> */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  name="password"
                />
                <button
                  onClick={() => navigate(`/forgot-password?role=${role}`)}
                  className="text-sm text-gray-500 hover:text-indigo-600 cursor-pointer "
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-1/2 bg-indigo-600 text-white py-3 ml-[20%] rounded-lg font-semibold hover:bg-indigo-700 transition cursor-pointer active:scale-95"
              >
                Login
              </button>

              <div className="text-center mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  Don’t have an account?{" "}
                  <button
                    onClick={() => navigate(`/signup?role=${role}`)}
                    className="text-indigo-600 font-bold cursor-pointer ml-1 text-md hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Login;
