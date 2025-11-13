import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const role = searchParams.get("role") || "candidate";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white transition-all duration-500">
      <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-8 w-96 relative transform transition-all duration-300 ">

        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Forgot Password
        </h2>

        {submitted && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white text-sm px-4 py-2 rounded-full animate-fade-in-out shadow-md transition-all duration-500">
            ✅ Reset link sent to your email!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-lg font-medium hover:bg-purple-800 transition duration-300 cursor-pointer active:scale-95"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Remember your password?{" "}
          <button
            onClick={() => navigate(`/login?role=${role}`)}
            className="text-purple-700 font-medium hover:underline transition active:scale-95 cursor-pointer"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}
