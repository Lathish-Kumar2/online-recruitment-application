import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InterviewSchedule = () => {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [formData, setFormData] = useState({
    candidateName: "",
    jobTitle: "",
    date: "",
    time: "",
    mode: "",
    comments: "",
  });

  useEffect(() => {
    document.title = "Interview Schedule - Employer";
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.candidateName ||
      !formData.jobTitle ||
      !formData.date ||
      !formData.time ||
      !formData.mode
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const newInterview = {
      id: Date.now(),
      ...formData,
    };

    setInterviews([newInterview, ...interviews]);
    setFormData({
      candidateName: "",
      jobTitle: "",
      date: "",
      time: "",
      mode: "",
      comments: "",
    });
  };

  const handleDelete = (id) => {
    setInterviews(interviews.filter((i) => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/employer/dashboard")}
        className="absolute top-6 left-10 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition font-medium shadow-sm"
      >
        ← Back to Dashboard
      </button>

      <div className="bg-white/70 backdrop-blur-lg shadow-md rounded-xl p-8 w-[900px]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Schedule Interview
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        >
          <input
            type="text"
            name="candidateName"
            value={formData.candidateName}
            onChange={handleChange}
            placeholder="Candidate Name"
            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Job Title"
            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <select
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select Mode</option>
            <option value="Online">Online</option>
            <option value="In-person">In-person</option>
          </select>
          <input
            type="text"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Comments (optional)"
            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 md:col-span-2"
          />

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 active:scale-95 transition"
            >
              Schedule Interview
            </button>
          </div>
        </form>

        {/* List of Scheduled Interviews */}
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Scheduled Interviews
        </h3>
        {interviews.length === 0 ? (
          <p className="text-gray-500 text-center">No interviews scheduled yet.</p>
        ) : (
          <div className="space-y-3">
            {interviews.map((item) => (
              <div
                key={item.id}
                className="bg-white/80 border border-gray-200 rounded-lg p-4 shadow-sm flex justify-between items-start hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">{item.candidateName}</p>
                  <p className="text-sm text-gray-600">{item.jobTitle}</p>
                  <p className="text-sm text-gray-600">
                    📅 {item.date} ⏰ {item.time}
                  </p>
                  <p className="text-sm text-gray-600">Mode: {item.mode}</p>
                  {item.comments && (
                    <p className="text-sm text-gray-500 italic">
                      “{item.comments}”
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewSchedule;
