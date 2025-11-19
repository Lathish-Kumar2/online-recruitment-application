import EmployerNavBar from "../../components/employer/EmployerNavBar";
import EmployerSideBar from "../../components/employer/EmployerSideBar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";





const EmployerProfile = () => {

    const { id } = useParams();
    const employerId = JSON.parse(localStorage.getItem("user"))?.id;

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        orgName: "",
        estd: "",
        employees: "",
        turnover: "",
        email: "",
    });



    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            setFormData({
                orgName: user.companyName,
                estd: user.estd,
                employees: user.employees,
                turnover: user.turnover,
                email: user.email
            });
        }
    }, []);


    const [profileSaved, setProfileSaved] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const updatedData = {
            id: employerId,
            companyName: formData.orgName,
            estd: formData.estd,
            employees: formData.employees,
            turnover: formData.turnover,
            email: formData.email
        };

        const res = await axios.put(
            `http://localhost:8080/employer/update/${employerId}`,
            updatedData
        );

        // ⭐ Update localStorage so dashboard/user sees updated info
        localStorage.setItem("user", JSON.stringify(res.data));

        setProfileSaved(true);
        alert("✅ Profile updated successfully!");
        console.log("Updated Employer Profile:", res.data);

    } catch (error) {
        console.error(error);
        alert("❌ Update failed. Please try again.");
    }
};


    return (
        <div className="bg-white h-screen w-full px-15 py-3">
            <EmployerNavBar />
            <div className=" h-[90%] flex">
                <EmployerSideBar />
                <div className="h-full w-full bg-gray-200 rounded-tl-4xl p-10">
                    <div className="bg-white/60 backdrop-blur-md shadow-md rounded-xl p-8 w-[800px]">

                        <h2 className="text-2xl font-semibold text-center text-indigo-700 mb-6">
                            Employer Profile
                        </h2>

                        {/* ✅ Preview Section (only shown after save) */}
                        {profileSaved && (
                            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6 shadow-sm">
                                <h3 className="text-lg font-semibold text-indigo-700 mb-3">
                                    Profile Summary
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-gray-700">
                                    <p>
                                        <strong>Organization:</strong> {formData.orgName || "—"}
                                    </p>
                                    <p>
                                        <strong>Established:</strong> {formData.estd || "—"}
                                    </p>
                                    <p>
                                        <strong>Employees:</strong> {formData.employees || "—"}
                                    </p>
                                    <p>
                                        <strong>Turnover:</strong> {formData.turnover || "—"}
                                    </p>
                                    <p className="col-span-2">
                                        <strong>Email:</strong> {formData.email || "—"}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-1 font-medium">
                                    Organization Name
                                </label>
                                <input
                                    type="text"
                                    name="orgName"
                                    value={formData.orgName}
                                    onChange={handleChange}
                                    placeholder="Enter organization name"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-1 font-medium">
                                        Established Year
                                    </label>
                                    <input
                                        type="text"
                                        name="estd"
                                        value={formData.estd}
                                        onChange={handleChange}
                                        placeholder="e.g., 2005"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1 font-medium">
                                        Number of Employees
                                    </label>
                                    <input
                                        type="text"
                                        name="employees"
                                        value={formData.employees}
                                        onChange={handleChange}
                                        placeholder="e.g., 150"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1 font-medium">
                                    Annual Turnover (in ₹)
                                </label>
                                <input
                                    type="text"
                                    name="turnover"
                                    value={formData.turnover}
                                    onChange={handleChange}
                                    placeholder="e.g., ₹50,00,000"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1 font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter contact email"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between mt-6">
                                <button
                                    type="button"
                                    onClick={() => navigate(`/employer/${employerId}/dashboard`)}
                                    className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
                                >
                                    ← Back
                                </button>

                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
                                >
                                    Save Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerProfile;
