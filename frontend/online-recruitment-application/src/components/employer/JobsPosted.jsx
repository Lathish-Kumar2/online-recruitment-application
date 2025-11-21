import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployerNavBar from "../../components/employer/EmployerNavBar";
import EmployerSideBar from "../../components/employer/EmployerSideBar";
import { toast } from "react-toastify";

const JobsPosted = () => {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");

    
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

    useEffect(() => {
        loadJobs();
    }, []);

    
    const deleteJob = async (jobId) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;

        try {
            await axios.delete(
                `http://localhost:8080/api/job/employer/${employerId}/delete/${jobId}`
            );
            // toast.success("Job deleted");
            setJobs(jobs.filter((job) => job.id !== jobId)); 
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete job");
        }
    };

    const filteredJobs = jobs.filter((job) =>
        job.jobTitle.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white h-screen w-full px-15 py-3">
            <EmployerNavBar />

            <div className="flex h-[90%]">
                <EmployerSideBar />

                <div className="h-full w-full bg-gray-200 rounded-tl-4xl p-10 overflow-y-auto">
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
                                    <th className="p-3 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredJobs.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center p-4 text-gray-500">
                                            No jobs posted yet.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredJobs.map((job) => (
                                        <tr key={job.id} className="border-b hover:bg-gray-50">
                                            <td className="p-3 font-medium">{job.jobTitle}</td>
                                            <td className="p-3">{job.postedDate}</td>
                                            <td className="p-3">{job.jobType}</td>
                                            <td className="p-3">{job.salary}</td>

                                            <td className="p-3 text-center flex gap-3 justify-center">
                                                {/* EDIT
                                                <button
                                                    className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-700"
                                                    onClick={() =>
                                                        window.location.href = `/employer/job/edit/${job.id}`
                                                    }
                                                >
                                                    Edit
                                                </button> */}

                                                {/* DELETE */}
                                                <button
                                                    className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-700"
                                                    onClick={() => deleteJob(job.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default JobsPosted;
