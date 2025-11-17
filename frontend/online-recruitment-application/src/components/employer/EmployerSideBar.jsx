// import React from 'react'
// import { useNavigate } from 'react-router-dom';
// import { MdDashboard, MdCreateNewFolder, MdMore } from "react-icons/md";
// import { FaUsers } from "react-icons/fa";
// import { RiCalendarScheduleFill } from "react-icons/ri";
// import { TbReportSearch } from "react-icons/tb";
// import { VscGraph } from "react-icons/vsc";
// import { BiSolidReport } from "react-icons/bi";
// import { CgProfile } from "react-icons/cg";
// import { HiOutlineLogout } from "react-icons/hi";

// const EmployerSideBar = () => {
//    const navigate = useNavigate();

//   return (
//     <div>
//       <div className="bg-white h-full w-70 py-5 px-5 gap-5 flex flex-col justify-between">
//                     <div className="flex flex-col space-y-3 gap-2">
//                         <button
//                             onClick={() => navigate("/employer/dashboard")}
//                             className="text-left hover:bg-gray-200 hover:font-bold h-12 active:scale-98 px-3 py-2 rounded-md transition flex items-center gap-2 w-66"
//                         >
//                             <MdDashboard size={25} color="violet" /> Dashboard
//                         </button>
//                         <button
//                             onClick={() => navigate("/employer/post-job")}
//                             className="text-left  hover:bg-gray-200 hover:font-bold h-12 active:scale-98 px-3 py-2 rounded-md transition flex items-center gap-2 w-66"
//                         >
//                             <MdCreateNewFolder size={25} color="violet" /> Post Job
//                         </button>
//                         <button
//                             onClick={() => navigate("/employer/candidate-search")}
//                             className="text-left hover:bg-gray-200 hover:font-bold h-12 active:scale-98 px-3 py-2 rounded-md transition flex items-center gap-2 w-66"
//                         >
//                             <FaUsers size={25} color="violet" /> Candidates
//                         </button>
//                         <button
//                             onClick={() => navigate("/employer/interview-schedule")}
//                             className="text-left hover:bg-gray-200 hover:font-bold h-12 active:scale-98 px-3 py-2 rounded-md transition flex items-center gap-2 w-66"
//                         >
//                             <RiCalendarScheduleFill size={25} color="violet" /> Schedule Interviews
//                         </button>

//                         <button
//                             onClick={() => navigate("/employer/interview-details")}
//                             className="text-wrap text-left hover:bg-gray-200 hover:font-bold h-12 active:scale-98 px-3 py-2 rounded-md transition flex items-center gap-2 w-66"
//                         >
//                             <MdMore size={25} color="violet" /> Interview Status and <br /> details
//                         </button>

//                         <button
//                             onClick={() => navigate("/employer/reports")}
//                             className="text-left hover:bg-gray-200 hover:font-bold h-12 active:scale-98 px-3 py-2 rounded-md transition flex items-center gap-2 w-66"
//                         >
//                             <BiSolidReport size={25} color="violet" /> Reports
//                         </button>
//                     </div>
//                     <div className=" flex flex-col h-30 items-center justify-center gap-5 border-t border-gray-400">
//                         <button
//                             onClick={() => navigate("/employer/profile")}
//                             className="px-2 flex items-center gap-2 bg-white/40 backdrop-blur-md w-3/4 h-10 text-black  font-semibold rounded-md hover:bg-gray-100 transition"
//                         >
//                             <CgProfile size={30} color="black" /> Profile
//                         </button>

//                         <button
//                             onClick={() => navigate("/login?role=employer")}
//                             className="px-2 flex items-center gap-2  bg-white/40 backdrop-blur-md w-3/4 h-10 text-red-400 font-semibold rounded-md hover:bg-gray-100 transition"
//                         >
//                             <HiOutlineLogout size={30} color="black"/> Logout
//                         </button>
//                     </div>

//                 </div>
//     </div>
//   )
// }

// export default EmployerSideBar

import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdCreateNewFolder, MdMore } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { BiSolidReport } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";

const EmployerSideBar = () => {
  
  const linkClasses = ({ isActive }) =>
    `text-left h-12 active:scale-98 px-3 py-2 rounded-md transition flex items-center gap-2 w-66 ${isActive
      ? "bg-gray-200 text-violet-400 font-bold" 
      : "hover:bg-gray-200 hover:font-bold text-black" 
    }`;

  return (
    <div className="bg-white h-full w-70 py-5 px-5 gap-5 flex flex-col justify-between">
      <div className="flex flex-col space-y-3 gap-2">
        <NavLink to="/employer/dashboard" className={linkClasses}>
          <MdDashboard size={25} /> Dashboard
        </NavLink>

        <NavLink to="/employer/post-job" className={linkClasses}>
          <MdCreateNewFolder size={25} /> Post Job
        </NavLink>

        <NavLink to="/employer/candidate-search" className={linkClasses}>
          <FaUsers size={25} /> Candidates
        </NavLink>

        <NavLink to="/employer/interview-schedule" className={linkClasses}>
          <RiCalendarScheduleFill size={25} /> Schedule Interviews
        </NavLink>

        <NavLink to="/employer/interview-details" className={linkClasses}>
          <MdMore size={25} /> Interview Status and <br /> details
        </NavLink>

        <NavLink to="/employer/reports" className={linkClasses}>
          <BiSolidReport size={25} /> Reports
        </NavLink>
      </div>

      <div className="flex flex-col h-30 items-center justify-center gap-5 border-t border-gray-400">
        <NavLink
          to="/employer/profile"
          className={({ isActive }) =>
            `px-2 flex items-center gap-2 bg-white/40 backdrop-blur-md w-3/4 h-10 text-black font-semibold rounded-md hover:bg-gray-100 transition ${isActive ? "bg-violet-500 text-white font-bold" : ""
            }`
          }
        >
          <CgProfile size={30} /> Profile
        </NavLink>

        <NavLink
          to="/login?role=employer"
          className="px-2 flex items-center gap-2 bg-white/40 backdrop-blur-md w-3/4 h-10 text-red-400 font-semibold rounded-md hover:bg-gray-100 transition"
        >
          <HiOutlineLogout size={30} /> Logout
        </NavLink>
      </div>
    </div>
  );
};

export default EmployerSideBar;
