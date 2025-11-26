import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployerNavBar from "../../components/employer/EmployerNavBar";
import EmployerSideBar from "../../components/employer/EmployerSideBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ApplicationsReceived = () => {
    const [applications, setApplications] = useState([]);
    const employerId = JSON.parse(localStorage.getItem("user"))?.id;
    const navigate = useNavigate();

    useEffect(() => {
        fetchApplications();
        // eslint-disable-next-line
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/employer/${employerId}/applications`);
            setApplications(res.data || []);
        } catch (err) {
            console.error("Failed to load applications:", err);
            setApplications([]);
        }
    };

    const accept = async (appId) => {
        try {
            await axios.post(`http://localhost:8080/api/employer/${employerId}/applications/${appId}/accept`);
            toast.success("Accepted");
            fetchApplications();
        } catch (err) {
            console.error("Failed ", err);
            toast.error("Failed")
        }
    };

    const reject = async (appId) => {
        try {
            await axios.post(`http://localhost:8080/api/employer/${employerId}/applications/${appId}/reject`);
            toast.success("Rejected");
            fetchApplications();
        } catch (err) {
            console.error("Failed ", err);
            toast.error("Failed");
        }
    };

    return (
        <div className="bg-white h-screen w-full px-15 py-3 ">
            <EmployerNavBar />
            <div className="flex h-[90%]">
                <EmployerSideBar />
                <div className="h-full w-full bg-gray-200 rounded-tl-4xl rounded-tr-4xl p-10 overflow-y-auto">
                    <h1 className="text-3xl font-semibold mb-6">Applications Received</h1>

                    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-3">Candidate</th>
                                    <th className="p-3">Applied For</th>
                                    <th className="p-3">Job ID</th>
                                    <th className="p-3">Date</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {applications.map((app, index) => (
                                    <tr key={app.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3 font-medium">{app.candidateName ?? `#${app.candidateId}`}</td>
                                        <td className="p-3">{app.jobTitle ?? (app.jobId ? `Job #${app.jobId}` : "General Interest")}</td>
                                        <td className="p-3">{app.jobId}</td>
                                        <td className="p-3">{app.appliedDate}</td>
                                        <td className="p-3">{app.interviewStatus || "Pending"}</td>
                                        <td className="p-3">

                                            <div>
                                                <button
                                                    onClick={() => navigate(`/employer/${employerId}/candidate/${app.candidateId}`)}
                                                    className="text-indigo-600 hover:underline"
                                                >
                                                    View Profile
                                                </button>
                                                <button onClick={() => accept(app.id)} className="bg-green-500 text-white px-2 py-1 rounded ml-2 mr-2">Accept</button>
                                                <button onClick={() => reject(app.id)} className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
                                            </div>

                                        </td>
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
