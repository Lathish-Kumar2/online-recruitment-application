import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmployerNavBar from "../../components/employer/EmployerNavBar.jsx";
import EmployerSideBar from "../../components/employer/EmployerSideBar.jsx";
import { toast } from "react-toastify";

const CandidateSearch = () => {
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [filters, setFilters] = useState({
        qualification: "",
        location: "",
        salary: "",
        jobType: "",
        skills: "",
        minExperience: ""
    });

    // const employerId = JSON.parse(localStorage.getItem("user"))?.id;

    useEffect(() => {
        document.title = "Search Candidates - Employer";
        // optionally load all initially
        fetchCandidates();
    }, []);

    const fetchCandidates = async (params = {}) => {
        try {
            const res = await axios.get("http://localhost:8080/api/candidates", { params });
            setCandidates(res.data || []);
        } catch (err) {
            console.error("Failed to fetch candidates:", err);
            setCandidates([]);
        }
    };

    const handleFilter = (e) => {
        e.preventDefault();
        const params = {};
        if (filters.qualification) params.qualification = filters.qualification;
        if (filters.location) params.location = filters.location;
        if (filters.jobType) params.jobType = filters.jobType;
        if (filters.skills) params.skills = filters.skills;
        if (filters.minExperience) params.minExperience = parseFloat(filters.minExperience);
        if (filters.salary) params.maxSalary = parseFloat(filters.salary);
        fetchCandidates(params);
    };

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    // const sendInterest = async (candidate) => {
    //     if (!employerId) {
    //         toast.error("Please Login as Employer");
    //         return;
    //     }

    //     try {
    //         const payload = {
    //             candidateId: candidate.id,
    //             candidateName: candidate.fullName,
    //             candidateEmail: candidate.email,
    //             jobId: null,
    //             jobTitle: null,
    //             date: null,
    //             time: null,
    //             mode: "Online",
    //             comments: "Employer is interested",
    //             status: "Interested"
    //         };

    //         const res = await axios.post(`http://localhost:8080/api/employer/${employerId}/interviews`, payload);

    //         if (res?.data) {
    //             toast.success("Interest sent - interview record added");
    //         } else {
    //             toast.success("Interest sent")
    //         }
    //     } catch (err) {
    //         console.error("Send interest failed", err)
    //         toast.error("Failed")
    //     }
    // };


    return (
        <div className="bg-white h-screen w-full px-15 py-3 ">
            <EmployerNavBar />
            <div className=" h-[90%] flex">
                <EmployerSideBar />
                <div className="h-full w-full bg-gray-200 rounded-tl-4xl p-10 overflow-y-auto ">
                    <h2 className="text-2xl font-bold text-center text-violet-800 mb-6">
                        Search Candidates
                    </h2>

                    <form onSubmit={handleFilter} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <input name="qualification" value={filters.qualification} onChange={handleChange} placeholder="Qualification" className="..." />
                        <input name="location" value={filters.location} onChange={handleChange} placeholder="Location" className="..." />
                        <input name="salary" value={filters.salary} onChange={handleChange} placeholder="Max Salary (LPA)" className="..." />
                        <select name="jobType" value={filters.jobType} onChange={handleChange} className="...">
                            <option value="">Job Type</option>
                            <option value="Permanent">Permanent</option>
                            <option value="Temporary">Temporary</option>
                        </select>

                        <input name="skills" value={filters.skills} onChange={handleChange} placeholder="Skills (comma-separated)" className="..." />
                        <input name="minExperience" type="number" value={filters.minExperience} onChange={handleChange} placeholder="Min Experience (yrs)" className="..." />
                        <div className="col-span-2 md:col-span-4 text-center">
                            <button type="submit" className="bg-violet-400 text-white px-6 py-2 rounded-lg font-semibold">Search</button>
                        </div>
                    </form>

                    {candidates.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {candidates.map(c => (
                                <div key={c.id} className="bg-white/70 border rounded-lg p-4 cursor-pointer"
                                    onClick={() => navigate(`/employer/${JSON.parse(localStorage.getItem("user"))?.id}/candidate/${c.id}`)}>
                                    <h3 className="text-lg font-semibold">{c.fullName}</h3>
                                    <p><strong>Qualification:</strong> {c.education}</p>
                                    <p><strong>Location:</strong> {c.location}</p>
                                    <p><strong>Expected Salary:</strong> {c.expectedSalary ?? "N/A"}</p>
                                    <p><strong>Skills:</strong> {c.skills}</p>
                                </div>

                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 mt-4">No candidates found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CandidateSearch;
