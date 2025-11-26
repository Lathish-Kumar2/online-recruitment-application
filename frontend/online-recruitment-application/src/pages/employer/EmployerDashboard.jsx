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

import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import EmployerNavBar from "../../components/employer/EmployerNavBar";
import EmployerSideBar from "../../components/employer/EmployerSideBar";
import { Briefcase, Users, Calendar, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EmployerDashboard = () => {

    const navigate = useNavigate();
    const date = new Date();
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [interviews, setInterviews] = useState([]);
    const [applications, setApplications] = useState([]);
    const employerId = JSON.parse(localStorage.getItem("user"))?.id;


    const loadJobs = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/job/employer/${employerId}/all`
            );
            setJobs(response.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch jobs");
        }
    };

    const loadInterviews = async () => {
        const res = await axios.get(`http://localhost:8080/api/employer/${employerId}/interviews`);

        const data = res.data;

        console.log("Employer ID:", employerId);

        // Prevent crash
        if (!Array.isArray(data)) {
            console.error("Expected array but got:", data);
            setInterviews([]);
            return;
        }

        setInterviews(data);
    };

    const loadApplications = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/employer/${employerId}/applications`
            );
            setApplications(res.data);
        } catch (err) {
            console.error("Failed to load applications:", err);
        }
    };

    // const filteredData = applications.filter((app) =>
    //     app.jobTitle.toLowerCase().includes(search.toLowerCase())
    // );


    useEffect(() => {
        loadJobs(), loadInterviews(), loadApplications();
    }, []);

    const filteredJobs = jobs.filter((job) =>
        job.jobTitle.toLowerCase().includes(search.toLowerCase())
    );

    console.log(applications);
    

    // console.log(filteredJobs);
    // console.log(interviews);


    // // Mock Stats = Later backend API will update these
    // const stats = [
    //     { title: "Jobs Posted", value: 12, icon: <Briefcase size={40} className="text-indigo-600" /> },
    //     { title: "Applications Received", value: 43, icon: <Users size={40} className="text-indigo-600" /> },
    //     { title: "Interviews Scheduled", value: 7, icon: <Calendar size={40} className="text-indigo-600" /> },
    // ];

    // const recentApplications = [
    //     { name: "Arun Kumar", job: "Frontend Developer", date: "12 Nov 2025" },
    //     { name: "Priya S", job: "Java Developer", date: "11 Nov 2025" },
    //     { name: "Manish", job: "QA Tester", date: "11 Nov 2025" },
    //     { name: "Leena", job: "UI/UX Designer", date: "10 Nov 2025" },
    //     { name: "Sanjay", job: "HR Executive", date: "10 Nov 2025" },
    // ];

    return (
        <div className="bg-white h-screen w-full px-15 py-3">
            <EmployerNavBar />
            <div className="h-[90%] flex">
                <EmployerSideBar />
                <div className="h-full w-full bg-gray-200 rounded-tl-4xl rounded-tr-4xl p-10 overflow-y-auto">

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
                            onClick={() => navigate(`/employer/${employerId}/jobs-posted`)}
                            className="bg-white flex gap-10 h-40 w-60 p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100">
                            <div className="flex items-center justify-center">
                                <Briefcase size={70} className="text-violet-400" />
                            </div>
                            <div className="w-40 text-center">
                                <p className="text-5xl font-bold text-violet-400">{filteredJobs.length}</p>
                                <h3 className="text-gray-600 font-md">Jobs Posted</h3>
                            </div>
                        </button>

                        <button
                            onClick={() => navigate(`/employer/${employerId}/applications-received`)}
                            className="bg-white flex gap-10 h-40 w-60 p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100">
                            <div className="flex items-center justify-center">
                                <User size={70} className="text-violet-400" />
                            </div>
                            <div className="w-40 text-center">
                                <p className="text-5xl font-bold text-violet-400">{applications.length}</p>
                                <h3 className="text-gray-600 font-md">Applications Received</h3>
                            </div>
                        </button>

                        <button
                            onClick={() => navigate(`/employer/${employerId}/interview-details`)}
                            className="bg-white flex gap-10 h-40 w-60 p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100">
                            <div className="flex items-center justify-center">
                                <Calendar size={70} className="text-violet-400" />
                            </div>
                            <div className="w-40 text-center">
                                <p className="text-5xl font-bold text-violet-400">{interviews.length}</p>
                                <h3 className="text-gray-600 font-md">Interview Details</h3>
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

                    <div className="">
                        <div className="bg-white p-5 rounded-xl shadow-md border border-violet-400 mb-5 min-h-55">
                            <div>
                                <h2 className="text-xl font-semibold mb-3 text-violet-400">Recent Job Posts</h2>
                            </div>
                           
                            <div className="flex gap-6 mt-5 flex-wrap">

                                {filteredJobs.length === 0 ? (
                                    <p className="text-gray-500 mt-10">No jobs posted yet.</p>
                                ) : (
                                    filteredJobs.slice(0, 8).map((job, index) => (
                                        <div key={index} className="p-3 w-55 rounded-xl bg-gray-100 backdrop-blur-2xl border-2 h-50 border-gray-200">
                                            <div className="w-full h-15 py-1.5">
                                                <h1 className="text-lg text-center font-bold leading-tight mb-2">{job.designation}</h1>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-500">Posted On: {job.postedDate}</p>
                                                <p className="text-sm font-semibold text-gray-500">Type: {job.jobType}</p>
                                                <p className="text-sm font-semibold text-gray-500">Location: {job.location}</p>
                                            </div>

                                        </div>
                                    ))

                                )}

                            </div>
                             <a
                                href={`/employer/${employerId}/jobs-posted`}
                                className="text-violet-400 text-sm mt-5 ml-2 block font-semibold"
                            >
                                View more jobs →
                            </a>
                        </div>

                        {/* Upcoming Interviews */}
                        <div className="bg-white p-5 rounded-xl shadow-md border border-violet-400 mb-5 min-h-55">
                            <div>
                                <h2 className="text-xl font-semibold mb-3 text-violet-400">Upcoming Interviews</h2>
                            </div>
                            <div className="flex gap-6 mt-5 flex-wrap">
                                {interviews.length === 0 ? (
                                    <p className="text-gray-500 mt-10">No interviews scheduled yet.</p>
                                ) : (
                                    interviews.slice(0, 8).map((data, index) => (
                                        data.status === "In Progress" && (
                                            <div key={index} className="p-3 w-55 rounded-xl h-50 bg-gray-100 backdrop-blur-2xl border-2 border-gray-200">
                                                <div className="w-full h-7 py-1">
                                                    <h1 className="text-lg text-center font-bold leading-tight">{data.candidateName}</h1>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-500 text-center py-2">{data.jobTitle}</p>
                                                    <p className="text-sm font-semibold text-gray-500">Date: {data.date} </p>
                                                    <p className="text-sm font-semibold text-gray-500">Time: {data.time} </p>
                                                    <p className="text-sm font-semibold text-gray-500">Mode: {data.mode}</p>
                                                    <p className="text-sm font-semibold text-gray-500">Status: {data.status}</p>
                                                </div>
                                            </div>
                                        )

                                    )))}
                            </div>
                             <a
                                href={`/employer/${employerId}/interview-details`}
                                className="text-violet-400 text-sm mt-5 ml-2 block font-semibold"
                            >
                                View all interviews →
                            </a>
                        </div>
                        {/* Recent Applications */}
                        <div className="bg-white p-5 rounded-xl shadow-md border border-violet-400 mb-5 min-h-55">
                            <div>
                                <h2 className="text-xl font-semibold mb-3 text-violet-400">Recent Applications</h2>
                            </div>
                            <div className="flex gap-6 mt-5 flex-wrap">
                                {applications.length === 0 ? (
                                    <p className="text-gray-500 mt-10 ml-2">No applications received yet.</p>
                                ) : (

                                    applications.slice(0, 8).map((data, index) => (
                                        <div key={index} className="p-3 w-55 rounded-xl h-50 bg-gray-100 backdrop-blur-2xl border-2 border-gray-200">
                                            <h1 className="text-lg text-center font-bold leading-tight">{data.candidateName}</h1>
                                            <p className="text-sm font-semibold text-gray-500 text-center py-2">{data.jobTitle? data.jobTitle : "General Interest"}</p>
                                            <p className="text-sm font-semibold text-gray-500">Date: {data.appliedDate}</p>
                                            <p className="text-sm font-semibold text-gray-500">Status: {data.interviewStatus}</p>
                                        </div>
                                    )))}
                            </div>
                             <a
                                href={`/employer/${employerId}/applications-received`}
                                className="text-violet-400 text-sm mt-5 ml-2 block font-semibold"
                            >
                                View all applications →
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerDashboard;
