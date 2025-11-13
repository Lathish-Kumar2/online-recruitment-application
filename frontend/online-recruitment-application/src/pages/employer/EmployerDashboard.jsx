import React from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Users, CalendarCheck } from "lucide-react";

const EmployerDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Jobs Posted",
      value: 12,
      icon: <Briefcase className="w-6 h-6 text-indigo-600" />,
    },
    {
      title: "Applications Received",
      value: 58,
      icon: <Users className="w-6 h-6 text-indigo-600" />,
    },
    {
      title: "Interviews Scheduled",
      value: 9,
      icon: <CalendarCheck className="w-6 h-6 text-indigo-600" />,
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 font-poppins">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white flex flex-col p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-6">Employer Panel</h1>
        <nav className="flex flex-col space-y-3">
          <button
            onClick={() => navigate("/employer/dashboard")}
            className="text-left hover:bg-indigo-600 px-3 py-2 rounded-md transition"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/employer/post-job")}
            className="text-left hover:bg-indigo-600 px-3 py-2 rounded-md transition"
          >
            Post Job
          </button>
          <button
            onClick={() => navigate("/employer/candidate-search")}
            className="text-left hover:bg-indigo-600 px-3 py-2 rounded-md transition"
          >
            Candidates
          </button>
          <button
            onClick={() => navigate("/employer/interview-schedule")}
            className="text-left hover:bg-indigo-600 px-3 py-2 rounded-md transition"
          >
            Schedule Interviews
          </button>
          
          <button
            onClick={() => navigate("/employer/interview-details")}
            className="text-left hover:bg-indigo-600 px-3 py-2 rounded-md transition"
          >
            Interview Status and details
          </button>
          
          <button
            onClick={() => navigate("/employer/reports")}
            className="text-left hover:bg-indigo-600 px-3 py-2 rounded-md transition"
          >
            Reports
          </button>
        </nav>

        <button
          onClick={() => navigate("/employer/profile")}
          className="mt-auto bg-white text-indigo-700 font-semibold py-2 rounded-md hover:bg-gray-100 transition"
        >
          Profile
        </button>

        <button
          onClick={() => navigate("/login?role=employer")}
          className="mt-auto bg-white text-indigo-700 font-semibold py-2 rounded-md hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">
            Welcome, Employer 👋
          </h2>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                {item.icon}
              </div>
              <h3 className="text-gray-700 font-semibold">{item.title}</h3>
              <p className="text-3xl font-bold text-indigo-700">{item.value}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EmployerDashboard;
