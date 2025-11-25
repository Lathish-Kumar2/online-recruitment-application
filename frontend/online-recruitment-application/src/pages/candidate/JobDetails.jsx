import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CandidateNavBar from "../../components/candidate/CandidateNavBar";
import CandidateSideBar from "../../components/candidate/CandidateSideBar";

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/job/${jobId}`)
      .then((res) => setJob(res.data))
      .catch((err) => console.error("Error fetching job details", err));
  }, [jobId]);

  if (!job) return <p className="p-10 text-lg">Loading...</p>;

  return (
    <div className="bg-white h-screen w-full px-15 py-3">
      <CandidateNavBar />

      <div className="h-[90%] flex">
        <CandidateSideBar />

        <div className="h-full w-full bg-gray-200 rounded-tl-4xl rounded-tr-4xl p-10 overflow-y-auto">
          <div className="bg-white p-8 rounded-xl shadow-md border max-w-3xl mx-auto">

            <h1 className="text-3xl font-bold text-violet-500 mb-3">{job.job_title}</h1>
            <p className="text-lg text-gray-700 mb-5">{job.designation}</p>

            <div className="mb-5">
              <p className="text-gray-600"><strong>Location:</strong> {job.location}</p>
              <p className="text-gray-600"><strong>Salary:</strong> {job.salary}</p>
              <p className="text-gray-600"><strong>Job Type:</strong> {job.jobType}</p>
              <p className="text-gray-600"><strong>Posted Date:</strong> {job.postedDate}</p>
              <p className="text-gray-600"><strong>Qualification:</strong> {job.qualification}</p>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-2">Job Description</h2>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>

            <button
              className="mt-8 px-6 py-3 bg-violet-500 text-white rounded-lg shadow hover:bg-violet-600"
              onClick={() => alert("Apply feature coming next!")}
            >
              Apply to this Job
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
