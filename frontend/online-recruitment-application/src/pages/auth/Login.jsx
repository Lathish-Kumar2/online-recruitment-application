import React, { useState, useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext.jsx";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [searchParams] = useSearchParams();
  const role1 = searchParams.get("type") || "candidate";
  const role2 = searchParams.get("role") || "candidate";
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ Access AuthContext

  let role;
  if (role1 === role2) {
    role = "candidate";
  } else {
    role = "employer";
  }

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields!");
      return;
    }

    // ✅ Mock login success (replace with actual backend auth later)
    toast.success(`Logged in as ${role}`);

    // ✅ Save login info globally + in localStorage
    login({
      email: formData.email,
      role: role,
    });

    // ✅ Redirect after login
    setTimeout(() => {
      navigate(`/${role}/dashboard`);
    }, 1500);
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
                <label className="block mb-2 text-black">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <button
                  onClick={() => navigate(`/forgot-password?role=${role}`)} // ✅ preserves role
                  className="text-sm text-gray-500 hover:text-indigo-600 cursor-pointer ml-5"
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
