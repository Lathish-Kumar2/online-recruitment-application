import { PiBuildingOfficeLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { LuUserRoundSearch } from "react-icons/lu";


export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center py-10 min-h-screen bg-gray-100">
      <div className=" flex flex-col h-3/4 w-170 p-10 rounded-lg shadow-lg bg-white">
        <h1 className="text-3xl font-bold mb-5">Welcome to <span className="text-violet-500"> Online Recruitment Portal </span> </h1>
        <p className="mb-5 font-semibold text-lg">Streamline your hiring and job-seeking journey.
          Employers can post vacancies, manage candidates, and track interviews effortlessly — while candidates can explore job openings, apply instantly, and monitor their application status in real time.</p>
        <div className="flex gap-4 flex-col mt-5">
          <button onClick={() => navigate("/login?type=employer")} className="text-start h-35 items-center flex gap-5 mb-5 hover:bg-gray-300 hover:shadow-md hover:rounded cursor-pointer hover:scale-103 transition-all duration-300  bg-gray-100 rounded-2xl px-5"> 
            <div className="h-20 relative overflow-hidden py-0 w-40 ">
              <PiBuildingOfficeLight size={80}/>
            </div>
            <div>
               <span className="font-bold text-lg">For Employers</span> <br /> <span className="font-semibold text-gray-500">Create your organization profile, post new job openings, and find the perfect candidates through intelligent search and filtering options.</span>
            </div>
          </button>
          <button onClick={() => navigate("/login?type=candidate")} className="text-start h-35 items-center flex gap-5 mb-5 hover:bg-gray-300 hover:shadow-md hover:rounded cursor-pointer hover:scale-103 transition-all duration-300 bg-gray-100 rounded-2xl px-5">
            <div className="h-20 relative overflow-hidden py-0 w-31 px-3">
              <LuUserRoundSearch size={70}/>
            </div>
            <div>
               <span className="font-bold text-lg">For Candidates</span> <br /><span className="font-semibold text-gray-500">Build your profile, showcase your qualifications, and discover job opportunities that match your skills and preferences</span>
            </div>          
          </button>
        </div>
      </div>
    </div>
  );
}
