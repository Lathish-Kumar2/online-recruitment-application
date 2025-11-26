// src/pages/employer/InterviewSchedule.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import EmployerNavBar from "../../components/employer/EmployerNavBar.jsx";
import EmployerSideBar from "../../components/employer/EmployerSideBar.jsx";
import "react-toastify/dist/ReactToastify.css";



const InterviewSchedule = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(null); // interview being edited
    const [showEdit, setShowEdit] = useState(false);

    const [formData, setFormData] = useState({
        candidateName: "",
        jobTitle: "",
        date: "",
        time: "",
        mode: "",
        comments: "",
        candidateEmail: "",
        status: "In Progress",
        remarks: "No remarks yet",
    });

    const employerId = JSON.parse(localStorage.getItem("user"))?.id;


    useEffect(() => {
        document.title = "Interview Schedule - Employer";
        if (!employerId) {
            toast.error("Employer not logged in. Please login.");
            return;
        }
        fetchRecentInterviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employerId]);

    const fetchRecentInterviews = async () => {
        if (!employerId) return;
        setLoading(true);
        try {
            // backend should accept a limit query param; fallback to /all if not implemented
            const res = await axios.get(
                `http://localhost:8080/api/employer/${employerId}/interviews?limit=5`
            );
            setInterviews(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            // If endpoint with ?limit isn't present, try fetching all and slice client-side
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/employer/${employerId}/interviews`
                );
                const arr = Array.isArray(res.data) ? res.data : [];
                setInterviews(arr);
            } catch (err2) {
                console.error("Failed to fetch interviews:", err2);
                toast.error("Failed to load interviews");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((s) => ({ ...s, [name]: value }));
    };

    const clearForm = () =>
        setFormData({
            candidateName: "",
            jobTitle: "",
            date: "",
            time: "",
            mode: "",
            comments: "",
            candidateEmail: "",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.candidateName ||
            !formData.candidateEmail ||
            !formData.jobTitle ||
            !formData.date ||
            !formData.time ||
            !formData.mode
        ) {
            toast.error("Please fill in all required fields.");
            return;
        }

        if (!employerId) {
            toast.error("You must be logged in as an employer to schedule interviews.");
            return;
        }

        const payload = {
            candidateName: formData.candidateName,
            candidateEmail: formData.candidateEmail,
            jobTitle: formData.jobTitle,
            date: formData.date,
            time: formData.time,
            mode: formData.mode,
            comments: formData.comments,
            status: "In Progress",
            remarks: "No remarks yet",
            // optional: employerId included to be safe
            employerId,
            // server can set timestamps itself; client can also send postedAt if desired
        };

        try {
            const res = await axios.post(
                `http://localhost:8080/api/employer/${employerId}/interviews`,
                payload
            );

            // On success, refresh list (server returns created interview ideally)
            if (res?.data) {
                // Insert created item at top
                setInterviews((prev) => [res.data, ...prev]);
            } else {
                // fallback: re-fetch
                await fetchRecentInterviews();
            }

            toast.success("Interview scheduled successfully!");
            clearForm();
        } catch (err) {
            console.error("Failed to schedule interview:", err);
            toast.error(`Failed ! Candidate already exists with same Job `);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this interview?")) return;
        if (!employerId) {
            toast.error("Employer not found in localStorage.");
            return;
        }

        try {
            await axios.delete(
                `http://localhost:8080/api/employer/${employerId}/interviews/${id}`
            );
            setInterviews((prev) => prev.filter((i) => i.id !== id));
            toast.success("Interview deleted.");
        } catch (err) {
            console.error("Delete failed:", err);
            toast.error("Failed to delete interview.");
        }
    };



    const updateInterview = async () => {
        try {
            const res = await fetch(
                `http://localhost:8080/api/employer/${employerId}/interviews/update/${editing.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editing),
                }
            );

            const updated = await res.json();

            setInterviews(
                interviews.map((item) => (item.id === updated.id ? updated : item))
            );

            setShowEdit(false);
        } catch (err) {
            console.error(err);
            alert("Failed to update interview!");
        }
    };


    return (
        <div className="bg-white h-screen w-full px-15 py-3">
            <EmployerNavBar />
            <div className=" h-[90%] flex">
                <EmployerSideBar />
                <div className="h-full w-full bg-gray-200 rounded-tl-4xl p-10 overflow-y-auto ">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Schedule Interview
                    </h2>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                    >
                        <input
                            type="text"
                            name="candidateName"
                            value={formData.candidateName}
                            onChange={handleChange}
                            placeholder="Candidate Name"
                            className="border border-gray-500 bg-white/90 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                        <input
                            type="text"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            placeholder="Job Title"
                            className="border border-gray-500 bg-white/90 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                        <input
                            type="email"
                            name="candidateEmail"
                            value={formData.candidateEmail}
                            onChange={handleChange}
                            placeholder="Candidate Email"
                            className="border border-gray-500 bg-white/90 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="border border-gray-500 bg-white/90 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="border border-gray-500 bg-white/90 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                        <select
                            name="mode"
                            value={formData.mode}
                            onChange={handleChange}
                            className="border border-gray-500 bg-white/90 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        >
                            <option value="">Select Mode</option>
                            <option value="Online">Online</option>
                            <option value="In-person">In-person</option>
                        </select>
                        <input
                            type="text"
                            name="comments"
                            value={formData.comments}
                            onChange={handleChange}
                            placeholder="Comments (optional)"
                            className="border border-gray-500 bg-white/90 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 md:col-span-2"
                        />

                        <div className="md:col-span-2 text-center">
                            <button
                                type="submit"
                                className="bg-violet-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-violet-700 active:scale-95 transition"
                            >
                                Schedule Interview
                            </button>
                        </div>
                    </form>

                    {/* List of Scheduled Interviews */}
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Scheduled Interviews
                    </h3>
                    <a
                        href={`/employer/${employerId}/interview-details`}
                        className="text-indigo-600 text-sm mb-4 block"
                    >
                        Please visit here to view, update Status and Remarks →
                    </a>

                    {loading ? (
                        <p className="text-gray-500 text-center">Loading...</p>
                    ) : interviews.length === 0 ? (
                        <p className="text-gray-500 text-center">No interviews scheduled yet.</p>
                    ) : (
                        <div className="flex gap-10 flex-wrap">
                            {interviews.map((item) =>
                                (item.status === "In Progress" || item.status === "Interested") && (
                                    <div
                                        key={item.id}
                                        className="w-80 h-70 transition p-5 bg-white/70 backdrop-blur-2xl rounded-2xl hover:shadow-xl hover:outline-gray-400 hover:scale-101 flex flex-col justify-between"
                                    >
                                        <div>
                                            <p className="text-lg text-center font-bold">{item.candidateName}</p>
                                            <p className="text-sm text-center font-semibold text-gray-600">
                                                {item.jobTitle?item.jobTitle : "Not set"}
                                            </p>

                                            <div className="flex justify-between w-full p-3">
                                                <p className="text-sm font-semibold text-gray-500">Date: {item.date?item.date:"TBD"}</p>
                                                <p className="text-sm font-semibold text-gray-500">Time: {item.time?item.time:"TBD"}</p>
                                            </div>

                                            <p className="text-sm text-center font-semibold text-gray-500">
                                                Mode: {item.mode?item.mode : "Not Selected"}
                                            </p>

                                            {item.status && (
                                                <p className="text-sm w-full text-center">
                                                    <span
                                                        className={
                                                            item.status === "Selected"
                                                                ? "text-green-600 font-semibold"
                                                                : item.status === "Rejected"
                                                                    ? "text-red-600"
                                                                    : item.status === "Offered"
                                                                        ? "text-yellow-600"
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
                                                    “{item.comments?item.comments : " - - -"}”
                                                </p>
                                            )}
                                        </div>

                                        <div className="h-10 flex justify-between items-center">
                                            <button
                                                onClick={() => {
                                                    setEditing(item);
                                                    setShowEdit(true);
                                                }}
                                                className="text-white text-sm font-medium rounded w-20 h-10 bg-blue-500 hover:bg-blue-900 transition"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-white text-sm font-medium rounded w-20 h-10 bg-red-500 hover:bg-red-900 transition"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )
                            )}

                        </div>
                    )}
                    <ToastContainer position="top-center" />
                    {showEdit && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                            <div className="bg-white p-6 rounded-lg w-96">

                                <h2 className="text-xl font-bold mb-4">Edit Interview</h2>

                                <input
                                    type="text"
                                    value={editing.candidateName}
                                    onChange={(e) =>
                                        setEditing({ ...editing, candidateName: e.target.value })
                                    }
                                    className="w-full border p-2 rounded mb-3"
                                    placeholder="Name"
                                />

                                <input
                                    type="email"
                                    value={editing.candidateEmail}
                                    onChange={(e) =>
                                        setEditing({ ...editing, candidateEmail: e.target.value })
                                    }
                                    className="w-full border p-2 rounded mb-3"
                                    placeholder="Email"
                                />

                                <input
                                    type="text"
                                    value={editing.jobTitle}
                                    onChange={(e) =>
                                        setEditing({ ...editing, jobTitle: e.target.value })
                                    }
                                    className="w-full border p-2 rounded mb-3"
                                    placeholder="Job Title"
                                />

                                <input
                                    type="date"
                                    value={editing.date}
                                    onChange={(e) =>
                                        setEditing({ ...editing, date: e.target.value })
                                    }
                                    className="w-full border p-2 rounded mb-3"
                                    placeholder="Date"
                                />

                                <input
                                    type="time"
                                    value={editing.time}
                                    onChange={(e) =>
                                        setEditing({ ...editing, time: e.target.value })
                                    }
                                    className="w-full border p-2 rounded mb-3"
                                    placeholder="Time"
                                />

                                <select
                                    value={editing.mode}
                                    onChange={(e) =>
                                        setEditing({ ...editing, mode: e.target.value })
                                    }
                                    className="w-full border p-2 rounded mb-3"
                                >
                                    <option value="Online">Online</option>
                                    <option value="In-person">In-person</option>
                                </select>

                                <input
                                    type="text"
                                    value={editing.comments}
                                    onChange={(e) =>
                                        setEditing({ ...editing, comments: e.target.value })
                                    }
                                    className="w-full border p-2 rounded mb-3"
                                    placeholder="Comments"
                                />

                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => setShowEdit(false)}
                                        className="px-4 py-2 bg-gray-300 rounded"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={updateInterview}
                                        className="px-4 py-2 bg-violet-500 text-white rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>

    );
};

export default InterviewSchedule;
