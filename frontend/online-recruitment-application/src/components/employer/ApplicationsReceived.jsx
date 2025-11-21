import React, { useState } from "react";
import EmployerNavBar from "../../components/employer/EmployerNavBar";
import EmployerSideBar from "../../components/employer/EmployerSideBar";

const ApplicationsReceived = () => {
    const [search, setSearch] = useState("");

    // Mock Application Data (backend will replace)
    const applications = [
        { name: "Arun Kumar", job: "Frontend Developer", date: "12 Nov 2025" },
        { name: "Priya S", job: "Java Developer", date: "11 Nov 2025" },
        { name: "Manish", job: "QA Tester", date: "11 Nov 2025" },
        { name: "Leena", job: "UI/UX Designer", date: "10 Nov 2025" },
        { name: "Sanjay", job: "HR Executive", date: "10 Nov 2025" },
    ];

    const filteredData = applications.filter((app) =>
        app.job.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div className="bg-white h-screen w-full px-15 py-3 ">
            <EmployerNavBar />

            <div className="flex h-[90%]">
                <EmployerSideBar />
                <div className="h-full w-full bg-gray-200 rounded-tl-4xl rounded-tr-4xl p-10 overflow-y-auto">

                    <h1 className="text-3xl font-semibold mb-6">Applications Received</h1>

                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search by Job Title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-1/3 p-3 rounded-lg border border-gray-300 mb-5"
                    />

                    {/* Applications Table */}
                    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-3">Candidate</th>
                                    <th className="p-3">Applied For</th>
                                    <th className="p-3">Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredData.map((app, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="p-3 font-medium">{app.name}</td>
                                        <td className="p-3">{app.job}</td>
                                        <td className="p-3">{app.date}</td>
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

export default ApplicationsReceived;
