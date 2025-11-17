// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Briefcase, Users, CalendarCheck } from "lucide-react";
// import Calendar from "react-calendar";
// import EmployerNavBar from "../../components/employer/EmployerNavBar.jsx";
// import EmployerSideBar from "../../components/employer/EmployerSideBar.jsx";

// const EmployerDashboard = () => {
//     const navigate = useNavigate();

//     const date = new Date();

//     const stats = [
//         {
//             title: "Jobs Posted",
//             value: 12,
//             icon: <Briefcase size={60} className=" text-indigo-600" />,
//         },
//         {
//             title: "Applications Received",
//             value: 58,
//             icon: <Users size={60} className=" text-indigo-600" />,
//         },
//         {
//             title: "Interviews Scheduled",
//             value: 9,
//             icon: <CalendarCheck size={60} className=" text-indigo-600" />,
//         },
//     ];

//     return (
//         // <div className="min-h-screen flex flex-col bg-gray-200 font-poppins">
//         //     <div>
//         //         Nav Bar
//         //     </div>
//         //     {/* Sidebar */}
//         //     <div>
//         //         <aside className="w-64 bg-indigo-700 text-white flex flex-col p-6 space-y-4">
//         //             <h1 className="text-2xl font-bold mb-6">Employer Panel</h1>
//         //             <nav className="flex flex-col space-y-3">
//         //                 <button
//         //                     onClick={() => navigate("/employer/dashboard")}
//         //                     className="text-left hover:bg-indigo-600 px-3 py-2 rounded-md transition"
//         //                 >
//         //                     Dashboard
//         //                 </button>
//         //                 <button
//         //                     onClick={() => navigate("/employer/post-job")}
//         //                     className="text-left hover:bg-indigo-600 px-3 py-2 rounded-md transition"
//         //                 >
//         //                     Post Job
//         //                 </button>
//         //                 <button
//         //                     onClick={() => navigate("/employer/candidate-search")}
//         //                     className="text-left hover:bg-indigo-600 px-3 py-2 rounded-md transition"
//         //                 >
//         //                     Candidates
//         //                 </button>
//         //                 <button
//         //                     onClick={() => navigate("/employer/interview-schedule")}
//         //                     className="text-left hover:bg-indigo-600 px-3 py-2 rounded-md transition"
//         //                 >
//         //                     Schedule Interviews
//         //                 </button>

//         //                 <button
//         //                     onClick={() => navigate("/employer/interview-details")}
//         //                     className="text-left hover:bg-indigo-600 px-3 py-2 rounded-md transition"
//         //                 >
//         //                     Interview Status and details
//         //                 </button>

//         //                 <button
//         //                     onClick={() => navigate("/employer/reports")}
//         //                     className="text-left hover:bg-indigo-600 px-3 py-2 rounded-md transition"
//         //                 >
//         //                     Reports
//         //                 </button>
//         //             </nav>

//         //             <button
//         //                 onClick={() => navigate("/employer/profile")}
//         //                 className="mt-45 bg-white text-indigo-700 font-semibold py-2 rounded-md hover:bg-gray-100 transition"
//         //             >
//         //                 Profile
//         //             </button>

//         //             <button
//         //                 onClick={() => navigate("/login?role=employer")}
//         //                 className="mt-auto bg-white text-indigo-700 font-semibold py-2 rounded-md hover:bg-gray-100 transition"
//         //             >
//         //                 Logout
//         //             </button>
//         //         </aside>

//         //         {/* Main Content */}
//         //     <div className="flex-1 p-10">
//         //         <header className="flex justify-between items-center mb-8">
//         //             <h2 className="text-3xl font-semibold text-gray-800">
//         //                 Welcome, Employer 👋
//         //             </h2>
//         //         </header>

//         //         {/* Stats Cards */}
//         //         <div className="grid grid-cols-3 gap-6">
//         //             {stats.map((item, index) => (
//         //                 <div
//         //                     key={index}
//         //                     className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
//         //                 >
//         //                     <div className="flex items-center justify-between mb-3">
//         //                         {item.icon}
//         //                     </div>
//         //                     <h3 className="text-gray-700 font-semibold">{item.title}</h3>
//         //                     <p className="text-3xl font-bold text-indigo-700">{item.value}</p>
//         //                 </div>
//         //             ))}
//         //         </div>
//         //     </div>
//         // </div>
//         // </div>


//         <div className="bg-white h-screen w-full px-15 py-3 ">
//             <EmployerNavBar />
//             <div className=" h-[90%] flex">
//                 <EmployerSideBar />
//                 <div className="h-full w-full bg-gray-200 rounded-tl-4xl p-10 rounded-tr-4xl flex">
//                     <div className="flex gap-5  h-65 w-full justify-center">
//                         {stats.map((item, index) => (
//                             <div
//                                 key={index}
//                                 className=" bg-white flex gap-10 h-40 w-60 p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
//                             >
//                                 <div className="flex items-center justify-center ">
//                                     {item.icon}
//                                 </div>
//                                 <div className=" w-40 items-center text-center">
//                                     <p className="text-5xl font-bold text-indigo-700 mb">{item.value}</p>
//                                     <h3 className="text-gray-600 font-md">{item.title}</h3>

//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="bg-transparent flex flex-col items-center justify-center gap-3 h-40 w-60  transition-all">
//                         <h2 className="text-2xl"> Today's Date </h2>
//                         <h3 className="text-gray-700 text-xl ">
//                             {date.toLocaleDateString("en-US", {
//                                 weekday: "long",
//                                 year: "numeric",
//                                 month: "long",
//                                 day: "numeric",
//                             })}
//                         </h3>
//                     </div>

//                 </div>
//             </div>
//         </div>


//     );
// };

// export default EmployerDashboard;

import React, { useState } from "react";
import EmployerNavBar from "../../components/employer/EmployerNavBar";
import EmployerSideBar from "../../components/employer/EmployerSideBar";
import { Briefcase, Users, Calendar, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmployerDashboard = () => {

    const navigate = useNavigate();
    const date = new Date();

    // Mock Stats = Later backend API will update these
    const stats = [
        { title: "Jobs Posted", value: 12, icon: <Briefcase size={40} className="text-indigo-600" /> },
        { title: "Applications Received", value: 43, icon: <Users size={40} className="text-indigo-600" /> },
        { title: "Interviews Scheduled", value: 7, icon: <Calendar size={40} className="text-indigo-600" /> },
    ];

    // Mock Data – top 5 items
    const recentJobs = [
        { title: "Frontend Developer", date: "12 Nov 2025" },
        { title: "Java Fullstack Engineer", date: "10 Nov 2025" },
        { title: "UI/UX Designer", date: "08 Nov 2025" },
        { title: "HR Executive", date: "07 Nov 2025" },
        { title: "QA Tester", date: "06 Nov 2025" },
        { title: "QA Tester", date: "06 Nov 2025" },
        { title: "QA Tester", date: "06 Nov 2025" },
        { title: "QA Tester", date: "06 Nov 2025" },

    ];

    const upcomingInterviews = [
        { candidate: "Rahul Sharma", job: "Frontend Developer", date: "13 Nov 2025" },
        { candidate: "Sneha R", job: "UI/UX Designer", date: "14 Nov 2025" },
        { candidate: "Vikram", job: "Java Developer", date: "15 Nov 2025" },
        { candidate: "Harini", job: "QA Tester", date: "16 Nov 2025" },
        { candidate: "Joseph", job: "HR Executive", date: "17 Nov 2025" },
    ];

    const recentApplications = [
        { name: "Arun Kumar", job: "Frontend Developer", date: "12 Nov 2025" },
        { name: "Priya S", job: "Java Developer", date: "11 Nov 2025" },
        { name: "Manish", job: "QA Tester", date: "11 Nov 2025" },
        { name: "Leena", job: "UI/UX Designer", date: "10 Nov 2025" },
        { name: "Sanjay", job: "HR Executive", date: "10 Nov 2025" },
    ];

    return (
        <div className="bg-white h-screen w-full px-15 py-3">
            <EmployerNavBar />
            <div className="h-[90%] flex">
                <EmployerSideBar />
                <div className="h-full w-full bg-gray-200 rounded-tl-4xl rounded-tr-4xl p-10 overflow-y-scroll">

                    {/* Stats Cards */}
                    <div className="flex gap-5 justify-center mb-10">
                        {/* {stats.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white flex gap-10 h-40 w-60 p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
                            >
                                <div className="flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <div className="w-40 text-center">
                                    <p className="text-5xl font-bold text-indigo-700">{item.value}</p>
                                    <h3 className="text-gray-600 font-md">{item.title}</h3>
                                </div>
                            </div>
                        ))} */}

                        <button
                            onClick={() => navigate('/employer/jobs-posted')}
                            className="bg-white flex gap-10 h-40 w-60 p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100">
                            <div className="flex items-center justify-center">
                                <Briefcase size={70} className="text-violet-400" />
                            </div>
                            <div className="w-40 text-center">
                                <p className="text-5xl font-bold text-violet-400">10</p>
                                <h3 className="text-gray-600 font-md">Jobs Posted</h3>
                            </div>
                        </button>

                        <button
                            onClick={() => navigate('/employer/applications-received')}
                            className="bg-white flex gap-10 h-40 w-60 p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100">
                            <div className="flex items-center justify-center">
                                <User size={70} className="text-violet-400" />
                            </div>
                            <div className="w-40 text-center">
                                <p className="text-5xl font-bold text-violet-400">40</p>
                                <h3 className="text-gray-600 font-md">Applications Received</h3>
                            </div>
                        </button>

                        <button
                            onClick={() => navigate('/employer/interview-details')}
                            className="bg-white flex gap-10 h-40 w-60 p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100">
                            <div className="flex items-center justify-center">
                                <Calendar size={70} className="text-violet-400" />
                            </div>
                            <div className="w-40 text-center">
                                <p className="text-5xl font-bold text-violet-400">5</p>
                                <h3 className="text-gray-600 font-md">Interviews Scheduled</h3>
                            </div>
                        </button>

                        <div className="bg-transparent flex flex-col items-center justify-center gap-3 h-40 w-60">
                            <h2 className="text-2xl font-semibold">Today's Date</h2>
                            <h3 className="text-gray-700 text-xl">
                                {date.toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </h3>
                        </div>
                    </div>

                    {/* --- TOP 5 SECTIONS --- */}
                    <div className="">

                        {/* Recent Job Posts */}
                        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 mb-5">
                            <div>
                                <h2 className="text-xl font-semibold mb-3 text-violet-400">Recent Job Posts</h2>
                            </div>
                            <div className="flex gap-6 mt-5 flex-wrap">
                                {recentJobs.map((job, index) => (
                                    <div key={index} className="p-3 w-55 rounded-xl bg-gray-200">
                                        <p className="font-semibold">{job.title}</p>
                                        <p className="text-gray-500 text-sm">{job.date}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Upcoming Interviews */}
                        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 mb-5">
                            <div>
                                <h2 className="text-xl font-semibold mb-3 text-violet-400">Upcoming Interviews</h2>
                            </div>
                            <div className="flex gap-6 mt-5 flex-wrap">
                                {upcomingInterviews.map((data, index) => (
                                    <div key={index} className="p-3 w-55 rounded-xl bg-gray-200">
                                        <p className="font-semibold">{data.candidate}</p>
                                        <p className="text-gray-500 text-sm">{data.job}</p>
                                        <p className="text-gray-500 text-sm">{data.date}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Recent Applications */}
                        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 mb-5">
                            <div>
                                <h2 className="text-xl font-semibold mb-3 text-violet-400">Recent Applications</h2>
                            </div>
                            <div className="flex gap-6 mt-5 flex-wrap">
                                {recentApplications.map((data, index) => (
                                    <div key={index} className="p-3 w-55 rounded-xl bg-gray-200">
                                        <p className="font-semibold">{data.name}</p>
                                        <p className="text-gray-500 text-sm">{data.job}</p>
                                        <p className="text-gray-500 text-sm">{data.date}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerDashboard;
