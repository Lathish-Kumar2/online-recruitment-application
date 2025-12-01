import React from 'react';
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const CandidateNavBar = () => {

  const candidate = JSON.parse(localStorage.getItem("candidate"));

  return (
    <div className="w-full px-10 py-6 h-18 bg-white flex justify-between items-center relative">
      <h1 className="text-3xl font-bold">Hire<span className="text-violet-400">Now</span></h1>

      <div className="flex items-center gap-3">
        <h1 className="font-mono text-xl">
          Welcome, {candidate?.fullName || "Candidate"}!
        </h1>

        <Link to={`/candidate/${candidate?.candidateId}/profile`}>
          <CgProfile 
            size={40} 
            className="text-violet-400 cursor-pointer hover:scale-110 transition"
          />
        </Link>
      </div>
    </div>
  );
};

export default CandidateNavBar;
