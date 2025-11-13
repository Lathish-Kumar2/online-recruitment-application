import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecruitmentReportChart from "../../components/charts/ApplicationStatusChart.jsx";
import ApplicationStatusChart from "../../components/charts/ApplicationStatusChart.jsx";

const Reports = () => {
  const navigate = useNavigate();

  const [reportData, setReportData] = useState({
    totalJobs: 8,
    interviewsConducted: 14,
    candidatesSelected: 6,
    candidatesRejected: 4,
    offersMade: 5,
  });

  useEffect(() => {
    document.title = "Employer Reports";
  }, []);

  const chartData = [
    { label: "Jobs Posted", count: reportData.totalJobs },
    { label: "Interviews", count: reportData.interviewsConducted },
    { label: "Selected", count: reportData.candidatesSelected },
    { label: "Rejected", count: reportData.candidatesRejected },
    { label: "Offers", count: reportData.offersMade },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/employer/dashboard")}
        className="absolute top-6 left-10 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition font-medium shadow-sm"
      >
        ← Back to Dashboard
      </button>

      <div className="bg-white/80 backdrop-blur-md shadow-md rounded-xl p-8 w-[950px]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Recruitment Reports
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-indigo-50 p-4 rounded-lg text-center shadow-sm">
            <p className="text-gray-600">Jobs Posted</p>
            <h3 className="text-2xl font-semibold text-indigo-600">
              {reportData.totalJobs}
            </h3>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center shadow-sm">
            <p className="text-gray-600">Interviews</p>
            <h3 className="text-2xl font-semibold text-blue-600">
              {reportData.interviewsConducted}
            </h3>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center shadow-sm">
            <p className="text-gray-600">Selected</p>
            <h3 className="text-2xl font-semibold text-green-600">
              {reportData.candidatesSelected}
            </h3>
          </div>
          <div className="bg-red-50 p-4 rounded-lg text-center shadow-sm col-span-1">
            <p className="text-gray-600">Rejected</p>
            <h3 className="text-2xl font-semibold text-red-600">
              {reportData.candidatesRejected}
            </h3>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center shadow-sm col-span-2">
            <p className="text-gray-600">Offers Made</p>
            <h3 className="text-2xl font-semibold text-yellow-600">
              {reportData.offersMade}
            </h3>
          </div>
        </div>

        {/* Chart */}
        <div className="border rounded-lg p-6 bg-white shadow-inner">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Recruitment Summary
          </h3>
          <ApplicationStatusChart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Reports;
