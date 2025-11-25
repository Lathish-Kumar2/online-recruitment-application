import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdReport } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiOutlineDocumentReport, HiOutlineLogout } from "react-icons/hi";

const CandidateSideBar = () => {
  const candidateId = JSON.parse(localStorage.getItem("user"))?.id;

  const linkClasses = ({ isActive }) =>
    `text-left h-12 active:scale-98 px-3 py-2 rounded-md transition flex items-center gap-2 w-66 ${
      isActive
        ? "bg-gray-200 text-violet-400 font-bold"
        : "hover:bg-gray-200 hover:font-bold text-black"
    }`;

  return (
    <div className="bg-white h-full w-70 py-5 px-5 gap-5 flex flex-col justify-between">

      <div className="flex flex-col space-y-3 gap-2">

        <NavLink to={`/candidate/${candidateId}/dashboard`} className={linkClasses}>
          <MdDashboard size={25} /> Dashboard
        </NavLink>

        <NavLink to={`/candidate/${candidateId}/applied-jobs`} className={linkClasses}>
          <MdWork size={25} /> Applied Jobs
        </NavLink>

        <NavLink to={`/candidate/${candidateId}/report`} className={linkClasses}>
          <HiOutlineDocumentReport size={25} /> Report
        </NavLink>


      </div>

      <div className="flex flex-col h-30 items-center justify-center gap-5 border-t border-gray-400">

        <NavLink
          to={`/candidate/${candidateId}/profile`}
          className={({ isActive }) =>
            `px-2 flex items-center gap-2 bg-white/40 backdrop-blur-md w-3/4 h-10 text-black font-semibold rounded-md hover:bg-gray-100 transition ${
              isActive ? "bg-violet-500 text-white font-bold" : ""
            }`
          }
        >
          <CgProfile size={30} /> Profile
        </NavLink>

        <NavLink
          to="/login?role=candidate"
          className="px-2 flex items-center gap-2 bg-white/40 backdrop-blur-md w-3/4 h-10 text-red-400 font-semibold rounded-md hover:bg-gray-100 transition"
        >
          <HiOutlineLogout size={30} /> Logout
        </NavLink>
      </div>
    </div>
  );
};

export default CandidateSideBar;
