import React, { useEffect, useState } from "react";
import axios from "axios";
import CandidateNavBar from "../../components/candidate/CandidateNavBar";
import CandidateSideBar from "../../components/candidate/CandidateSideBar";

const ApplicationStatus = () => {
  const [interviews, setInterviews] = useState([]);

  const candidateId = JSON.parse(localStorage.getItem("candidate"))?.id;

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/candidate/${candidateId}/interviews`
        );

        if (Array.isArray(res.data)) {
          setInterviews(res.data);
        } else if (res.data.interviews && Array.isArray(res.data.interviews)) {
          setInterviews(res.data.interviews);
        } else {
          setInterviews([]);
        }
      } catch (err) {
        console.error("Failed to load interviews:", err);
        setInterviews([]);
      }
    };
    fetchInterviews();
  }, []);
console.log(interviews)
  const getStatusColor = (status) => {
    switch (status) {
      case "Interview Scheduled":
        return "bg-blue-100 text-blue-700";
      case "Shortlisted":
        return "bg-purple-100 text-purple-700";
      case "Pending":
        return "bg-gray-200 text-gray-700";
      case "Offer":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <CandidateSideBar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <CandidateNavBar />

        {/* Page Content */}
        <div className="p-10 bg-gradient-to-br from-gray-50 to-purple-50 flex flex-col items-center">

          <h1 className="text-4xl font-bold text-purple-700 mb-10">
            Application Status
          </h1>

          <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <table className="w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left bg-purple-100 text-gray-700 rounded-xl">
                  <th className="p-4 rounded-l-xl">Job Title</th>
                  <th className="p-4">Company</th>
                  <th className="p-4">Applied On</th>
                  <th className="p-4">Interview Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Comments</th>
                  <th className="p-4 rounded-r-xl">Remarks</th>
                </tr>
              </thead>

              <tbody>
                {interviews.map((interview, index) => (
                  <tr
                    key={index}
                    className="bg-white shadow-sm rounded-xl hover:shadow-md transition-all"
                  >
                    <td className="p-4 font-medium">{interview.jobTitle}</td>
                    <td className="p-4">{interview.companyName}</td>
                    <td className="p-4">
                      {interview.appliedDate
                        ? new Date(interview.appliedDate).toLocaleDateString()
                        : "Not available"}
                    </td>



                    <td className="p-4">{interview.date}</td>
                    <td className="p-4">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                          interview.status
                        )}`}
                      >
                        {interview.status}
                      </span>
                    </td>
                    <td className="p-4">{interview.comments}</td>
                    <td className="p-4">{interview.remarks}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ApplicationStatus;
