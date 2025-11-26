import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecruitmentReportChart from "../../components/charts/ApplicationStatusChart.jsx";
import ApplicationStatusChart from "../../components/charts/ApplicationStatusChart.jsx";
import EmployerNavBar from "../../components/employer/EmployerNavBar.jsx";
import EmployerSideBar from "../../components/employer/EmployerSideBar.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const Reports = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [interviews, setInterviews] = useState([]);
    const employerId = JSON.parse(localStorage.getItem("user"))?.id;
    const [countSelected, setCountSelected] = useState(0);
    const [countRejected, setCountRejected] = useState(0);
    const [countOffers, setCountOffers] = useState(0);


    const loadJobs = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/job/employer/${employerId}/all`
            );

            setJobs(response.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch jobs");
        }
    };

    const loadInterviews = async () => {
        const res = await axios.get(`http://localhost:8080/api/employer/${employerId}/interviews`);

        const data = res.data;

        if (!Array.isArray(data)) {
            console.error("Expected array but got:", data);
            setInterviews([]);
            return;
        }

        setInterviews(data);
    };

    // interviews.map((interview) => {
    //     if (interview.status === "Selected") {
    //         setCountSelected((prevCount) => prevCount + 1);
    //     } else if (interview.status === "Rejected") {
    //         setCountRejected((prevCount) => prevCount + 1);
    //     } else if (interview.status === "Offered") {
    //         setCountOffers((prevCount) => prevCount + 1);
    //     }
    // });

    // console.log(jobs);
    // console.log(employerId);

    const filteredJobs = jobs.filter((job) =>
        job.jobTitle.toLowerCase().includes(search.toLowerCase())
    );


    useEffect(() => {
        document.title = "Employer Reports", loadJobs(), loadInterviews();
    }, []);

    useEffect(() => {
        let selected = 0;
        let rejected = 0;
        let offered = 0;

        interviews.forEach((interview) => {
            if (interview.status === "Selected") selected++;
            else if (interview.status === "Rejected") rejected++;
            else if (interview.status === "Offered") offered++;
        });

        setCountSelected(selected);
        setCountRejected(rejected);
        setCountOffers(offered);
    }, [interviews]);



    const chartData = [
        { label: "Jobs Posted", count: jobs.length },
        { label: "Interviews", count: interviews.length },
        { label: "Selected", count: countSelected },
        { label: "Rejected", count: countRejected },
        { label: "Offers", count: countOffers },
    ];

    return (
        <div className="bg-white h-screen w-full px-15 py-3">
            <EmployerNavBar />
            <div className=" h-[90%] flex">
                <EmployerSideBar />
                <div className="h-full w-full bg-gray-200 rounded-tl-4xl p-10 overflow-y-auto ">

                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Recruitment Reports
                    </h2>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-6 mb-8 ">
                        <div className="bg-indigo-50 p-4 rounded-lg text-center shadow-sm">
                            <p className="text-gray-600">Jobs Posted</p>
                            <h3 className="text-2xl font-semibold text-indigo-600">
                                {jobs.length}
                            </h3>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg text-center shadow-sm">
                            <p className="text-gray-600">Interviews</p>
                            <h3 className="text-2xl font-semibold text-blue-600">
                                {interviews.length}
                            </h3>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg text-center shadow-sm">
                            <p className="text-gray-600">Selected</p>
                            <h3 className="text-2xl font-semibold text-green-600">
                                {countSelected}
                            </h3>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg text-center shadow-sm col-span-1">
                            <p className="text-gray-600">Rejected</p>
                            <h3 className="text-2xl font-semibold text-red-600">
                                {countRejected}
                            </h3>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg text-center shadow-sm col-span-2">
                            <p className="text-gray-600">Offers Made</p>
                            <h3 className="text-2xl font-semibold text-yellow-600">
                                {countOffers}
                            </h3>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="border rounded-lg p-6 bg-white shadow-inner o">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Recruitment Summary
                        </h3>
                        <ApplicationStatusChart data={chartData} />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Reports;
