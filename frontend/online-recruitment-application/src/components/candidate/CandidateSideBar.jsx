import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdWork } from "react-icons/md";
import { HiOutlineDocumentReport, HiOutlineLogout } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { MdOutlinePendingActions } from "react-icons/md";

import { FiMenu } from "react-icons/fi";

const CandidateSideBar = () => {
  const candidateId = JSON.parse(localStorage.getItem("candidate"))?.id;

  // COLLAPSE STATE
  const [collapsed, setCollapsed] = useState(false);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md transition 
    ${isActive ? "bg-gray-200 text-violet-500 font-bold" : "hover:bg-gray-200 text-black"}
    ${collapsed ? "justify-center" : ""}
  `;

  return (
    <div
      className={`bg-white h-screen py-6 px-4 flex flex-col transition-all duration-300 
      ${collapsed ? "w-20" : "w-64"}`}
    >

      {/* ------------ TOGGLE BUTTON ------------ */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-4 text-gray-700 hover:text-black"
      >
        <FiMenu size={25} />
      </button>

      {/* ------------ TOP LINKS ------------ */}
      <div className="flex flex-col gap-3">

        <NavLink to={`/candidate/${candidateId}/dashboard`} className={linkClasses}>
          <MdDashboard size={25} />
          {!collapsed && "Dashboard"}
        </NavLink>

        <NavLink to={`/candidate/${candidateId}/applied-jobs`} className={linkClasses}>
          <MdWork size={25} />
          {!collapsed && "Applied Jobs"}
        </NavLink>

        <NavLink to={`/candidate/${candidateId}/report`} className={linkClasses}>
          <HiOutlineDocumentReport size={25} />
          {!collapsed && "Report"}
        </NavLink>

        <NavLink to={`/candidate/${candidateId}/application-status`} className={linkClasses}>
          < MdOutlinePendingActions size={25} />
          {!collapsed && "Application Status"}
        </NavLink>
      </div>

      {/* ------------ BOTTOM LINKS ------------ */}
      <div className="flex flex-col items-center gap-4 border-t pt-4 mt-auto">

        <NavLink
          to={`/candidate/${candidateId}/profile`}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md transition
             ${isActive ? "bg-violet-500 text-white font-semibold" : "hover:bg-gray-200 text-black"}
             ${collapsed ? "justify-center" : ""}`
          }
        >
          <CgProfile size={28} />
          {!collapsed && "Profile"}
        </NavLink>

        <NavLink
          to="/login?role=candidate"
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-red-500 transition hover:bg-gray-200
           ${collapsed ? "justify-center" : ""}`}
        >
          <HiOutlineLogout size={28} />
          {!collapsed && "Logout"}
        </NavLink>
      </div>
    </div>
  );
};

export default CandidateSideBar;
