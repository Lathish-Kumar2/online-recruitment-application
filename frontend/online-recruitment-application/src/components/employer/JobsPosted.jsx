import React, { useState } from "react";
import EmployerNavBar from "../../components/employer/EmployerNavBar";
import EmployerSideBar from "../../components/employer/EmployerSideBar";

const JobsPosted = () => {
    const [search, setSearch] = useState("");

    // Mock job data (backend later)
    const jobs = [
        { title: "Frontend Developer", date: "12 Nov 2025", type: "Permanent", salary: "8 LPA" },
        { title: "Java Developer", date: "10 Nov 2025", type: "Permanent", salary: "10 LPA" },
        { title: "UI/UX Designer", date: "08 Nov 2025", type: "Contract", salary: "6 LPA" },
        { title: "QA Tester", date: "06 Nov 2025", type: "Permanent", salary: "5 LPA" },
    ];

    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white h-screen w-full">
            <EmployerNavBar />

            <div className="flex h-[90%]">
                <EmployerSideBar />

                <div className="w-full bg-gray-200 p-10 rounded-tl-4xl rounded-tr-4xl">

                    <h1 className="text-3xl font-semibold mb-6">Jobs Posted</h1>

                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search by Job Title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-1/3 p-3 rounded-lg border border-gray-300 mb-5"
                    />

                    {/* Jobs Table */}
                    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-3">Job Title</th>
                                    <th className="p-3">Posted Date</th>
                                    <th className="p-3">Type</th>
                                    <th className="p-3">Salary</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredJobs.map((job, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="p-3 font-medium">{job.title}</td>
                                        <td className="p-3">{job.date}</td>
                                        <td className="p-3">{job.type}</td>
                                        <td className="p-3">{job.salary}</td>
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

export default JobsPosted;
