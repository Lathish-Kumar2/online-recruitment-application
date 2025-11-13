import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const PostJob = () => {
  const [jobData, setJobData] = useState({
    jobTitle: "",
    designation: "",
    salary: "",
    qualification: "",
    jobType: "",
    location: "",
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Post Job - Employer";
  }, []);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !jobData.jobTitle ||
      !jobData.designation ||
      !jobData.salary ||
      !jobData.qualification ||
      !jobData.jobType ||
      !jobData.location
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    toast.success("✅ Job posted successfully!");
    setTimeout(() => navigate("/employer/dashboard"), 2000);

    setJobData({
      jobTitle: "",
      designation: "",
      salary: "",
      qualification: "",
      jobType: "",
      location: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-12 relative">
      
      {/* Back Button */}
      <button
        onClick={() => navigate("/employer/dashboard")}
        className="absolute top-6 left-10 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition font-medium shadow-sm"
      >
        ← Back to Dashboard
      </button>

      <div className="bg-white/60 backdrop-blur-md shadow-md rounded-xl p-8 w-[800px] mt-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Post a New Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Job Title & Designation */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                value={jobData.jobTitle}
                onChange={handleChange}
                placeholder="e.g., Software Engineer"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={jobData.designation}
                onChange={handleChange}
                placeholder="e.g., Developer"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Salary & Qualification */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Salary (₹)
              </label>
              <input
                type="text"
                name="salary"
                value={jobData.salary}
                onChange={handleChange}
                placeholder="e.g., ₹6 LPA"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Qualification
              </label>
              <input
                type="text"
                name="qualification"
                value={jobData.qualification}
                onChange={handleChange}
                placeholder="e.g., B.E / B.Tech / MCA"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Job Type & Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Job Type
              </label>
              <select
                name="jobType"
                value={jobData.jobType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="">Select Type</option>
                <option value="Permanent">Permanent</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={jobData.location}
                onChange={handleChange}
                placeholder="e.g., Bangalore"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Job Description
            </label>
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleChange}
              placeholder="Enter job responsibilities and requirements..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none h-32 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold cursor-pointer active:scale-95 hover:bg-indigo-700 transition"
          >
            Post Job
          </button>
        </form>

        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default PostJob;
