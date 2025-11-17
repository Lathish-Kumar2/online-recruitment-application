import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployerNavBar from "../../components/employer/EmployerNavBar.jsx";
import EmployerSideBar from "../../components/employer/EmployerSideBar.jsx";

const CandidateSearch = () => {
    const navigate = useNavigate();

    // dummy candidate data for UI (can be fetched from backend later)
    const [candidates, setCandidates] = useState([
        {
            id: 1,
            name: "Rahul Sharma",
            qualification: "B.E Computer Science",
            location: "Bangalore",
            salary: "6 LPA",
            jobType: "Permanent",
        },
        {
            id: 2,
            name: "Priya Nair",
            qualification: "MBA HR",
            location: "Chennai",
            salary: "4 LPA",
            jobType: "Temporary",
        },
        {
            id: 3,
            name: "Karthik Reddy",
            qualification: "MCA",
            location: "Hyderabad",
            salary: "5.5 LPA",
            jobType: "Permanent",
        },
    ]);

    const [filters, setFilters] = useState({
        qualification: "",
        location: "",
        salary: "",
        jobType: "",
    });

    const [filteredData, setFilteredData] = useState(candidates);

    useEffect(() => {
        document.title = "Search Candidates - Employer";
    }, []);

    // filter logic
    const handleFilter = (e) => {
        e.preventDefault();
        let filtered = candidates.filter((candidate) => {
            return (
                (filters.qualification
                    ? candidate.qualification
                        .toLowerCase()
                        .includes(filters.qualification.toLowerCase())
                    : true) &&
                (filters.location
                    ? candidate.location
                        .toLowerCase()
                        .includes(filters.location.toLowerCase())
                    : true) &&
                (filters.salary
                    ? parseFloat(candidate.salary) <= parseFloat(filters.salary)
                    : true) &&
                (filters.jobType ? candidate.jobType === filters.jobType : true)
            );
        });
        setFilteredData(filtered);
    };

    // handle input change
    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        // <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 relative">
        //     <EmployerNavBar/>
        //     <EmployerSideBar/>
        //   {/* Back Button */}
        //   <button
        //     onClick={() => navigate("/employer/dashboard")}
        //     className="absolute top-6 left-10 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition font-medium shadow-sm"
        //   >
        //     ← Back to Dashboard
        //   </button>

        //   <div className="bg-white/60 backdrop-blur-md shadow-md rounded-xl p-8 w-[900px]">
        //     <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        //       Search Candidates
        //     </h2>

        //     {/* Filters Form */}
        //     <form
        //       onSubmit={handleFilter}
        //       className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        //     >
        //       <input
        //         type="text"
        //         name="qualification"
        //         value={filters.qualification}
        //         onChange={handleChange}
        //         placeholder="Qualification"
        //         className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        //       />

        //       <input
        //         type="text"
        //         name="location"
        //         value={filters.location}
        //         onChange={handleChange}
        //         placeholder="Location"
        //         className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        //       />

        //       <input
        //         type="number"
        //         name="salary"
        //         value={filters.salary}
        //         onChange={handleChange}
        //         placeholder="Max Salary (in LPA)"
        //         className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        //       />

        //       <select
        //         name="jobType"
        //         value={filters.jobType}
        //         onChange={handleChange}
        //         className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        //       >
        //         <option value="">Job Type</option>
        //         <option value="Permanent">Permanent</option>
        //         <option value="Temporary">Temporary</option>
        //       </select>

        //       <div className="col-span-2 md:col-span-4 text-center">
        //         <button
        //           type="submit"
        //           className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 active:scale-95 transition"
        //         >
        //           Search
        //         </button>
        //       </div>
        //     </form>

        //     {/* Results */}
        //     {filteredData.length > 0 ? (
        //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        //         {filteredData.map((candidate) => (
        //           <div
        //             key={candidate.id}
        //             className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
        //           >
        //             <h3 className="text-lg font-semibold text-gray-800 mb-1">
        //               {candidate.name}
        //             </h3>
        //             <p className="text-gray-600">
        //               <strong>Qualification:</strong> {candidate.qualification}
        //             </p>
        //             <p className="text-gray-600">
        //               <strong>Location:</strong> {candidate.location}
        //             </p>
        //             <p className="text-gray-600">
        //               <strong>Expected Salary:</strong> {candidate.salary}
        //             </p>
        //             <p className="text-gray-600">
        //               <strong>Job Type:</strong> {candidate.jobType}
        //             </p>
        //           </div>
        //         ))}
        //       </div>
        //     ) : (
        //       <p className="text-center text-gray-500 mt-4">
        //         No candidates found matching your criteria.
        //       </p>
        //     )}
        //   </div>
        // </div>


        <div className="bg-white h-screen w-full px-15 py-3 ">
            <EmployerNavBar />
            <div className=" h-[90%] flex">
                <EmployerSideBar />
                <div className="h-full w-full bg-gray-200 rounded-tl-4xl p-10 overflow-y-scroll ">
                        <h2 className="text-2xl font-bold text-center text-violet-800 mb-6">
                            Search Candidates
                        </h2>

                        {/* Filters Form */}
                        <form
                            onSubmit={handleFilter}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
                        >
                            <input
                                type="text"
                                name="qualification"
                                value={filters.qualification}
                                onChange={handleChange}
                                placeholder="Qualification"
                                className="border border-gray-500 bg-white/90 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 "
                            />

                            <input
                                type="text"
                                name="location"
                                value={filters.location}
                                onChange={handleChange}
                                placeholder="Location"
                                className="border border-gray-500 bg-white/90 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                            <input
                                type="text"
                                name="salary"
                                value={filters.salary}
                                onChange={handleChange}
                                placeholder="Max Salary (in LPA)"
                                className="border border-gray-500 bg-white/90 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                            <select
                                name="jobType"
                                value={filters.jobType}
                                onChange={handleChange}
                                className="border border-gray-500 bg-white/90 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-violet=400"
                            >
                                <option value="">Job Type</option>
                                <option value="Permanent">Permanent</option>
                                <option value="Temporary">Temporary</option>
                            </select>

                            <div className="col-span-2 md:col-span-4 text-center">
                                <button
                                    type="submit"
                                    className="bg-violet-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-violet-700 active:scale-95 transition"
                                >
                                    Search
                                </button>
                            </div>
                        </form>

                        {filteredData.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {filteredData.map((candidate) => (
                                    <div
                                        key={candidate.id}
                                        className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                            {candidate.name}
                                        </h3>
                                        <p className="text-gray-600">
                                            <strong>Qualification:</strong> {candidate.qualification}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>Location:</strong> {candidate.location}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>Expected Salary:</strong> {candidate.salary}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>Job Type:</strong> {candidate.jobType}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 mt-4">
                                No candidates found matching your criteria.
                            </p>
                        )}
                    
                </div>
            </div>
        </div>
    );
};

export default CandidateSearch;
