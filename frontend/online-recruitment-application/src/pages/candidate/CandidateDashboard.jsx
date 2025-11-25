import React, { useEffect, useState } from "react";
import axios from "axios";
import CandidateNavBar from "../../components/candidate/CandidateNavBar";
import CandidateSideBar from "../../components/candidate/CandidateSideBar";

const CandidateDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [payscale, setPayscale] = useState("");
  const [jobType, setJobType] = useState("");

  // Dynamic dropdown lists
  const [locations, setLocations] = useState([]);
  const [payscales, setPayscales] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);

  // Load jobs
  const loadAllJobs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/job/all");
      setJobs(res.data);
      setFilteredJobs(res.data);

      // Extract dropdown values dynamically
      setLocations([...new Set(res.data.map((j) => j.location))]);
      setPayscales([...new Set(res.data.map((j) => j.salary))]);
      setJobTypes([...new Set(res.data.map((j) => j.jobType))]);
    } catch (err) {
      console.error("Error loading jobs", err);
    }
  };

  useEffect(() => {
    loadAllJobs();
  }, []);

  const convertSalaryToRange = (salaryString) => {
    if (!salaryString) return { min: 0, max: 99999999 };
  
    // Extract both numbers (supports decimals)
    const numbers = salaryString.match(/(\d+(\.\d+)?)/g);
  
    if (numbers && numbers.length >= 2) {
      const min = parseFloat(numbers[0]) * 100000;
      const max = parseFloat(numbers[1]) * 100000;
  
      return { min, max };
    }
  
    return { min: 0, max: 99999999 };
  };  

  // Apply filters
  useEffect(() => {
    let updated = [...jobs];

    // Search (job_title field in DB)
    if (search.trim() !== "") {
      updated = updated.filter((job) =>
        job.designation.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Location filter
    if (location !== "") {
      updated = updated.filter((job) => job.location === location);
    }

    // Salary filter
    if (payscale !== "") {
        const selectedRange = convertSalaryToRange(payscale);
      
        updated = updated.filter((job) => {
          const jobRange = convertSalaryToRange(job.salary);
      
          // Correct overlapping logic
          return (
            jobRange.min <= selectedRange.max &&
            jobRange.max >= selectedRange.min
          );
        });
      }      

    // Job Type filter (job_type column)
    if (jobType !== "") {
      updated = updated.filter((job) => job.jobType === jobType);
    }

    setFilteredJobs(updated);
  }, [search, location, payscale, jobType, jobs]);

  return (
    <div className="bg-white h-screen w-full px-15 py-3">
      <CandidateNavBar />

      <div className="h-[90%] flex">
        <CandidateSideBar />

        <div className="h-full w-full bg-gray-200 rounded-tl-4xl rounded-tr-4xl p-10 overflow-y-auto">

          {/* Filter Panel */}
          <div className="bg-white p-5 rounded-xl shadow-md border mb-5">
            <h2 className="text-xl font-semibold mb-3 text-violet-400">Filter Jobs</h2>

            <div className="grid grid-cols-4 gap-5">
              {/* Search */}
              <input
                type="text"
                placeholder="Search job title..."
                className="px-3 py-2 rounded-lg border"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {/* Location */}
              <select
                className="px-3 py-2 rounded-lg border"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map((loc, i) => (
                  <option key={i} value={loc}>{loc}</option>
                ))}
              </select>

              {/* Payscale */}
              <select
                className="px-3 py-2 rounded-lg border"
                value={payscale}
                onChange={(e) => setPayscale(e.target.value)}
              >
                <option value="">All Payscales</option>
                {payscales.map((s, i) => (
                  <option key={i} value={s}>{s}</option>
                ))}
              </select>

              {/* Job type */}
              <select
                className="px-3 py-2 rounded-lg border"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="">All Job Types</option>
                {jobTypes.map((jt, i) => (
                  <option key={i} value={jt}>{jt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Job Cards */}
          <div className="bg-white p-5 rounded-xl shadow-md border">
            <h2 className="text-xl font-semibold mb-3 text-violet-400">Available Jobs</h2>

            <div className="flex gap-6 mt-5 flex-wrap">
              {filteredJobs.length === 0 ? (
                <p className="text-gray-500">No matching jobs found.</p>
              ) : (
                filteredJobs.map((job, index) => (
                    <div
                    key={index}
                    className="p-4 w-64 rounded-xl bg-gray-100 border cursor-pointer hover:shadow-lg"
                    onClick={() => window.location.href = `/job/${job.id}`}
                  >
                    <h1 className="font-bold text-black text-lg">{job.designation}</h1>
                    <p className="text-gray-600 text-sm mt-1">Location: {job.location}</p>
                    <p className="text-gray-600 text-sm mt-1">Salary: {job.salary}</p>
                    <p className="text-gray-600 text-sm mt-1">Type: {job.jobType}</p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
