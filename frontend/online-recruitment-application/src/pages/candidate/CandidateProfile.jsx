import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import EmployerNavBar from "../../components/employer/EmployerNavBar.jsx";
import EmployerSideBar from "../../components/employer/EmployerSideBar.jsx";

const CandidateProfile = () => {
    const { employerId, candidateId } = useParams();
    const navigate = useNavigate();
    const [candidate, setCandidate] = useState(null);

    useEffect(() => {
        document.title = "Candidate Profile - Employer";
        fetchCandidate();
        // eslint-disable-next-line
    }, [candidateId]);

    const fetchCandidate = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/candidates/${candidateId}`);
            setCandidate(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load candidate.");
        }
    };

    // const handleSendInterest = async () => {
    //     try {
    //         const payload = {
    //             candidateId: parseInt(candidateId),
    //             jobId: null // optionally pass job id if employer selects job context
    //         };
    //         await axios.post(`http://localhost:8080/api/employer/${employerId}/applications`, payload);
    //         toast.success("Interest sent to candidate!");
    //     } catch (err) {
    //         console.error(err);
    //         toast.error("Failed to send interest.");
    //     }
    // };

    const handleSendInterest = async (candidate) => {
        if (!employerId) {
            toast.error("Please Login as Employer");
            return;
        }

        try {
            const payload = {
                candidateId: candidate.id,
                candidateName: candidate.fullName,
                candidateEmail: candidate.email,
                jobId: null,
                jobTitle: null,
                date: null,
                time: null,
                mode: "Online",
                comments: "Employer is interested",
                status: "Interested"
            };

            const res = await axios.post(`http://localhost:8080/api/employer/${employerId}/interviews`, payload);

            if (res?.data) {
                toast.success("Interest sent - interview record added");
            } else {
                toast.success("Interest sent")
            }
        } catch (err) {
            // console.error("Send interest failed", err)
            // toast.error(`Failed ! ${candidate.fullName} already exists in Interview` )
            window.alert(`Failed ! ${candidate.fullName} already exists in Interview`)
        }
    };

    console.log(candidate);
    // console.log(candidate.fullName);
    
    
    
    if (!candidate) {
        return <div>Loading...</div>
    }

    return (
        <div className="bg-white h-screen w-full px-15 py-3 ">
            <EmployerNavBar />
            <div className=" h-[90%] flex">
                <EmployerSideBar />
                <div className="h-full w-full bg-gray-200 rounded-tl-4xl p-10 overflow-y-auto ">
                    <h2 className="text-2xl font-bold mb-4">{candidate.fullName}</h2>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <p><strong>Email:</strong> {candidate.email}</p>
                        <p><strong>Phone:</strong> {candidate.phone}</p>
                        <p><strong>Education:</strong> {candidate.education}</p>
                        <p><strong>Experience:</strong> {candidate.experience ?? "N/A"} years</p>
                        <p><strong>Location:</strong> {candidate.location}</p>
                        <p><strong>Skills:</strong> {candidate.skills}</p>
                        <p><strong>Preferences: </strong> {candidate.jobPreference}</p>
                        <p><strong>Resume URL: </strong>{candidate.resume}</p>
                        <p className="mt-4"><strong>About:</strong><br/>{candidate.aboutMe}</p>

                        <div className="mt-6 flex gap-3">
                            <button className="bg-violet-400 text-white px-4 py-2 rounded" onClick={() => handleSendInterest(candidate)}>
                                Send Interest
                            </button>
                            <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => navigate(-1)}>
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateProfile;
