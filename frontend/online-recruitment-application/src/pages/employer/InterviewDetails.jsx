import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InterviewDetails = () => {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([
    {
      id: 1,
      candidateName: "John Doe",
      jobTitle: "Frontend Developer",
      date: "2025-11-12",
      time: "10:00 AM",
      mode: "Online",
      status: "Pending",
      remarks: "",
    },
    {
      id: 2,
      candidateName: "Sarah Smith",
      jobTitle: "Backend Developer",
      date: "2025-11-14",
      time: "11:30 AM",
      mode: "In-person",
      status: "Pending",
      remarks: "",
    },
  ]);

  const [selected, setSelected] = useState(null);
  const [updateData, setUpdateData] = useState({ status: "", remarks: "" });

  useEffect(() => {
    document.title = "Interview Details - Employer";
  }, []);

  const handleSelect = (interview) => {
    setSelected(interview);
    setUpdateData({
      status: interview.status,
      remarks: interview.remarks || "",
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!updateData.status) return alert("Please select a status");

    const updatedList = interviews.map((i) =>
      i.id === selected.id ? { ...i, ...updateData } : i
    );
    setInterviews(updatedList);
    setSelected(null);
    alert("Interview status updated successfully ✅");
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

      <div className="bg-white/70 backdrop-blur-lg shadow-md rounded-xl p-8 w-[950px]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Interview Details & Status Update
        </h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="py-3 px-4 text-left">Candidate</th>
                <th className="py-3 px-4 text-left">Job Title</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Mode</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((i) => (
                <tr
                  key={i.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="py-2 px-4">{i.candidateName}</td>
                  <td className="py-2 px-4">{i.jobTitle}</td>
                  <td className="py-2 px-4">
                    {i.date} <br />
                    <span className="text-sm text-gray-500">{i.time}</span>
                  </td>
                  <td className="py-2 px-4">{i.mode}</td>
                  <td
                    className={`py-2 px-4 font-medium ${
                      i.status === "Selected"
                        ? "text-green-600"
                        : i.status === "Rejected"
                        ? "text-red-500"
                        : i.status === "Offered"
                        ? "text-yellow-600"
                        : "text-gray-500"
                    }`}
                  >
                    {i.status}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleSelect(i)}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Update Form */}
        {selected && (
          <div className="mt-8 p-6 border border-gray-200 rounded-lg shadow-sm bg-white/80">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Update Status for {selected.candidateName}
            </h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <select
                name="status"
                value={updateData.status}
                onChange={(e) =>
                  setUpdateData({ ...updateData, status: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Status</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
                <option value="Offered">Offered</option>
              </select>

              <textarea
                name="remarks"
                value={updateData.remarks}
                onChange={(e) =>
                  setUpdateData({ ...updateData, remarks: e.target.value })
                }
                placeholder="Add remarks (optional)"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-500"
                rows="3"
              />

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewDetails;
