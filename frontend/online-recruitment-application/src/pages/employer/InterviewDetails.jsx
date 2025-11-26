
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployerNavBar from "../../components/employer/EmployerNavBar.jsx";
import EmployerSideBar from "../../components/employer/EmployerSideBar.jsx";
import axios from "axios";


const InterviewDetails = () => {
    const navigate = useNavigate();
    const employerId = JSON.parse(localStorage.getItem("user"))?.id;

    const [interviews, setInterviews] = useState([]);

    useEffect(() => {
        loadInterviews();
    }, []);

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

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!updateData.status) return alert("Please select a status");


        await axios.put(
            `http://localhost:8080/api/employer/${employerId}/interviews/update-status/${selected.id}`,
            updateData
        );

        alert("Status updated");
        setSelected(null);
        loadInterviews();
    };


    return (
        <div className="bg-white h-screen w-full px-15 py-3">
            <EmployerNavBar />
            <div className=" h-[90%] flex">
                <EmployerSideBar />
                <div className="h-full w-full bg-gray-200 rounded-tl-4xl p-10 overflow-y-auto">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Interview Details & Status Update
                    </h2>

                    {/* Table */}
                    {/* <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gray-100 text-gray-700 text-sm">
                                <tr>
                                    <th className="py-3 px-4 text-left">Candidate</th>
                                    <th className="py-3 px-4 text-left">Job Title</th>
                                    <th className="py-3 px-4 text-left">Date</th>
                                    <th className="py-3 px-4 text-left">Mode</th>
                                    <th className="py-3 px-4 text-left">Status</th>
                                    <th className="py-3 px-4 text-left">Remarks</th>
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
                                            className={`py-2 px-4 font-medium ${i.status === "Selected"
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
                                        <td className="py-2 px-4">{i.remarks || "—"}</td>
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
                    </div> */}

                    <div className="flex gap-10 flex-wrap">
                        {interviews.map((item) => (
                            <div
                                key={item.id}
                                className="w-80 h-80 transition p-5 bg-white/70 backdrop-blur-2xl rounded-2xl hover:shadow-xl hover:outline-gray-400 hover:scale-101 flex flex-col justify-between"
                            >
                                <div>
                                    <p className="text-lg text-center font-bold">{item.candidateName}</p>
                                    <p className="text-sm text-center font-semibold text-gray-600">
                                        {item.jobTitle}
                                    </p>

                                    <div className="flex justify-between w-full p-3">
                                        <p className="text-sm font-semibold text-gray-500">Date: {item.date}</p>
                                        <p className="text-sm font-semibold text-gray-500">Time: {item.time}</p>
                                    </div>

                                    <p className="text-sm text-center font-semibold text-gray-500">
                                        Mode: {item.mode}
                                    </p>

                                    {item.status && (
                                        <p className="text-sm w-full text-center">
                                            <span
                                                className={
                                                    item.status === "Selected"
                                                        ? "text-green-600 font-semibold"
                                                        : item.status === "Rejected" || item.status === "Cancelled" || item.status === "No Show"
                                                            ? "text-red-600 font-semibold"
                                                            : item.status === "Offered"
                                                                ? "text-yellow-600 font-semibold"
                                                                : item.status === "In Progress"
                                                                    ? "text-blue-600 font-semibold"
                                                                        : "text-gray-600 font-semibold"
                                                }
                                            >
                                                {item.status}
                                            </span>
                                        </p>
                                    )}

                                    {item.comments && (
                                        <p className="text-sm font-semibold text-gray-500 text-center mt-2">
                                            “{item.comments}”
                                        </p>
                                    )}

                                    <p className="text-sm font-semibold text-gray-500 mt-5">Remarks: {item.remarks}</p>
                                </div>

                                <div className="h-10 flex justify-center items-center w-full">
                                    <button
                                        onClick={() => handleSelect(item)}
                                        className="text-white text-sm font-medium rounded w-20 h-10 bg-violet-400 hover:bg-violet-900 transition "
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        )
                        )}

                    </div>

                    {/* Update Form */}
                    {selected && (
                        <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-xs flex-col">
                            <h3 className="text-lg font-semibold mb-4 text-gray-700">
                                Update Status for {selected.candidateName}
                            </h3>
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <select
                                    defaultValue={"Pending"}
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
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="No Show">No Show</option>
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
        </div>
    );
};

export default InterviewDetails;
