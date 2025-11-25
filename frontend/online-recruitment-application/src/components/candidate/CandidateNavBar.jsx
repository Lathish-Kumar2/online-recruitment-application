import React from 'react';
import { CgProfile } from "react-icons/cg";

const CandidateNavBar = () => {
  return (
    <div className="w-full px-10 py-6 h-18 bg-white flex justify-between items-center relative">
      <h1 className="text-3xl font-bold text-">Hire<span className="text-violet-400">Now</span></h1>

      <div className="flex items-center gap-3">
        <h1 className="font-mono text-xl">Welcome, Candidate</h1>
        <CgProfile size={40} className="text-violet-400 cursor-pointer" />
      </div>
    </div>
  );
};

export default CandidateNavBar;
