import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit3 } from "react-icons/fi";
import CandidateNavBar from "../../components/candidate/CandidateNavBar";
import CandidateSideBar from "../../components/candidate/CandidateSideBar";

const API_BASE_URL = "http://localhost:8080/api/candidates";

const CandidateProfile = () => {
const storedCandidate = JSON.parse(localStorage.getItem("candidate"));
const id = storedCandidate?.id;

const [candidate, setCandidate] = useState({
fullName: "",
email: "",
phone: "",
password: "",
location: "",
skills: [],
jobPreference: [],
aboutMe: "",
resumeUrl: "",
education: "",
experience: "",
});

const [editingField, setEditingField] = useState(null);
const [showWelcomeModal, setShowWelcomeModal] = useState(true);

useEffect(() => {
if (!id) return;

axios
  .get(`${API_BASE_URL}/${id}`)
  .then((res) => {
    const data = res.data;

    setCandidate({
      fullName: data.fullName || "hi",
      email: data.email || "",
      phone: data.phone || "",
      password: data.password || "",
      location: data.location || "",
      skills: data.skills ? data.skills.split(",").map((s) => s.trim()) : [],
      jobPreference: data.jobPreference
        ? data.jobPreference.split(",").map((j) => j.trim())
        : [],
      aboutMe: data.aboutMe || "",
      resumeUrl: data.resume ? "Uploaded" : "",
      education: data.education || "",
      experience: data.experience || "",
    });
  })
  .catch((err) => console.error("Failed to load candidate:", err));


}, [id]);

const saveField = (field, value) => {
const payload = {
...candidate,
[field]: value,
skills: Array.isArray(candidate.skills)
? candidate.skills.join(",")
: candidate.skills,
jobPreference: Array.isArray(candidate.jobPreference)
? candidate.jobPreference.join(",")
: candidate.jobPreference,
password: candidate.password,
};


axios
  .put(`${API_BASE_URL}/update/${id}`, payload)
  .then(() => {
    setEditingField(null);
    setCandidate((prev) => ({ ...prev, [field]: value }));
  })
  .catch((err) => {
    console.error("Update failed:", err);
    alert("Update Failed");
  });


};

const handleChange = (field, value) =>
setCandidate((prev) => ({ ...prev, [field]: value }));
const handleSkillChange = (value) =>
setCandidate((prev) => ({
...prev,
skills: value.split(",").map((s) => s.trim()),
}));
const handleJobPreferenceChange = (value) =>
setCandidate((prev) => ({
...prev,
jobPreference: value.split(",").map((j) => j.trim()),
}));

const handleResumeUpload = async (e) => {
const file = e.target.files[0];
if (!file) return;


if (file.size > 2 * 1024 * 1024) {
  alert("File too large! Max 2MB allowed.");
  return;
}

const formData = new FormData();
formData.append("resume", file);

try {
  await axios.put(`${API_BASE_URL}/resume/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  alert("Resume uploaded!");
  setCandidate((prev) => ({ ...prev, resumeUrl: "Uploaded" }));
} catch (err) {
  console.error("Upload failed:", err);
  alert("Failed to upload resume.");
}


};

const handleSaveProfile = () => {
const fields = [
"fullName",
"email",
"phone",
"location",
"skills",
"jobPreference",
"education",
"experience",
"aboutMe",
"resumeUrl",
];
fields.forEach((field) => {
const value =
field === "skills" || field === "jobPreference"
? candidate[field].join(",")
: candidate[field];
saveField(field, value);
});
setShowWelcomeModal(false);
};

return ( <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50"> <CandidateNavBar />


  <div className="flex">
    <CandidateSideBar />

    {/* MAIN SECTION */}
    <div className="flex-1 px-10 py-12">
      {/* CENTER CONTAINER */}
      <div className="max-w-5xl mx-auto">

        {/* ----------- WELCOME MODAL ----------- */}
        {showWelcomeModal && (
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex justify-center items-center px-4 z-50">
            <div className="bg-white/95 backdrop-blur-2xl p-10 w-full max-w-4xl rounded-[40px] shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-center text-purple-700 mb-10">
                Complete Your Profile
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InputField
                  label="Full Name"
                  value={candidate.fullName}
                  onChange={(v) => handleChange("fullName", v)}
                  full
                />
                <InputField
                  label="Email"
                  value={candidate.email}
                  onChange={(v) => handleChange("email", v)}
                />
                <InputField
                  label="Phone"
                  value={candidate.phone}
                  onChange={(v) => handleChange("phone", v)}
                />
                <InputField
                  label="Location"
                  value={candidate.location}
                  onChange={(v) => handleChange("location", v)}
                />
                <InputField
                  label="Skills"
                  value={candidate.skills.join(", ")}
                  onChange={handleSkillChange}
                />
                <InputField
                  label="Job Preference"
                  value={candidate.jobPreference.join(", ")}
                  onChange={handleJobPreferenceChange}
                />

                <InputField
                  label="Education"
                  value={candidate.education}
                  onChange={(v) => handleChange("education", v)}
                  full
                />
                <InputField
                  label="Experience"
                  value={candidate.experience}
                  onChange={(v) => handleChange("experience", v)}
                  full
                />

                <div className="flex flex-col gap-2 col-span-2">
                  <label className="text-lg font-semibold text-gray-700">
                    Resume
                  </label>
                  <label className="w-full p-4 bg-gray-100 border border-gray-300 rounded-2xl cursor-pointer flex items-center gap-3">
                    📎 {candidate.resumeUrl || "Attach Resume"}
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleResumeUpload}
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-2 col-span-2">
                  <label className="text-lg font-semibold text-gray-700">
                    About Me
                  </label>
                  <textarea
                    className="w-full p-4 bg-gray-100 border border-gray-300 rounded-2xl h-32 resize-none focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    value={candidate.aboutMe}
                    onChange={(e) =>
                      handleChange("aboutMe", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="flex justify-between mt-10">
                <button
                  className="px-6 py-3 text-lg text-gray-600 hover:underline"
                  onClick={() => setShowWelcomeModal(false)}
                >
                  Skip
                </button>
                <button
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg rounded-2xl shadow-md"
                  onClick={handleSaveProfile}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ----------- PROFILE CONTENT ----------- */}
        <div className="w-full max-w-10xl bg-white/90 backdrop-blur-xl shadow-xl rounded-3xl p-10 border border-white/40">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-purple-700 mb-15 mt-10 text-center">
            Hi,{" "}
            <span className="text-indigo-600">
              {candidate.fullName || "Candidate"}!
            </span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Section
                index={0}
                label="Full Name"
                value={candidate.fullName}
                field="fullName"
                editingField={editingField}
                setEditingField={setEditingField}
                onChange={handleChange}
                saveField={saveField}
              />
              <Section
                index={1}
                label="Email"
                value={candidate.email}
                field="email"
                editingField={editingField}
                setEditingField={setEditingField}
                onChange={handleChange}
                saveField={saveField}
              />
              <Section
                index={2}
                label="Phone"
                value={candidate.phone}
                field="phone"
                editingField={editingField}
                setEditingField={setEditingField}
                onChange={handleChange}
                saveField={saveField}
              />
              <Section
                index={3}
                label="Location"
                value={candidate.location}
                field="location"
                editingField={editingField}
                setEditingField={setEditingField}
                onChange={handleChange}
                saveField={saveField}
              />
              <Section
                index={4}
                label="Education"
                value={candidate.education}
                field="education"
                editingField={editingField}
                setEditingField={setEditingField}
                onChange={handleChange}
                saveField={saveField}
              />
              <Section
                index={5}
                label="Experience"
                value={candidate.experience}
                field="experience"
                editingField={editingField}
                setEditingField={setEditingField}
                onChange={handleChange}
                saveField={saveField}
              />
            </div>

            <div className="space-y-6">
              <SectionAboutMe
                index={6}
                aboutMe={candidate.aboutMe}
                editingField={editingField}
                setEditingField={setEditingField}
                onChange={handleChange}
                saveField={saveField}
              />

              <SectionSkills
                index={7}
                label="Skills"
                skills={candidate.skills}
                editingField={editingField}
                setEditingField={setEditingField}
                onChange={handleSkillChange}
                saveField={saveField}
              />

              <SectionSkills
                index={8}
                label="Job Preference"
                skills={candidate.jobPreference}
                editingField={editingField}
                setEditingField={setEditingField}
                onChange={handleJobPreferenceChange}
                saveField={saveField}
              />

              <SectionResume
                index={9}
                resume={candidate.resumeUrl}
                editingField={editingField}
                setEditingField={setEditingField}
                onUpload={handleResumeUpload}
                id={id}
              />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</div>


);
};

export default CandidateProfile;

/* ------------------ REUSABLE COMPONENTS ------------------ */

const Card = ({ children, variant = "white" }) => {
const base =
"p-6 border rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200 min-h-[120px]";
const colored =
variant === "purple"
? "bg-purple-100 border-purple-300 text-purple-900"
: "bg-white/80 border-gray-200 text-gray-700";

return <div className={`${base} ${colored}`}>{children}</div>;
};

const InputField = ({ label, value, onChange, full }) => (

  <div className={`flex flex-col gap-2 ${full ? "col-span-2" : ""}`}>
    <label className="text-lg font-semibold text-gray-700">{label}</label>
    <input
      className="w-full p-4 bg-gray-100 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const Section = ({
label,
value,
field,
editingField,
setEditingField,
onChange,
saveField,
index,
}) => (
<Card variant={index % 2 === 0 ? "white" : "purple"}> <div className="flex justify-between items-center"> <h3 className="font-semibold text-lg">{label}</h3>
<button
className="text-purple-600"
onClick={() => setEditingField(field)}
> <FiEdit3 size={20} /> </button> </div>


{editingField === field ? (
  <div className="mt-4 flex gap-3">
    <input
      className="border p-3 rounded-xl w-full"
      value={value}
      onChange={(e) => onChange(field, e.target.value)}
    />
    <button
      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
      onClick={() => saveField(field, value)}
    >
      Save
    </button>
  </div>
) : (
  <p className="mt-3">{value || "Not added yet"}</p>
)}


  </Card>
);

const SectionAboutMe = ({
aboutMe,
editingField,
setEditingField,
onChange,
saveField,
index,
}) => (
<Card variant={index % 2 === 0 ? "white" : "purple"}> <div className="flex justify-between items-center"> <h3 className="font-semibold text-lg">About Me</h3>
<button
className="text-purple-600"
onClick={() => setEditingField("aboutMe")}
> <FiEdit3 size={20} /> </button> </div>

{editingField === "aboutMe" ? (
  <>
    <textarea
      className="w-full h-32 p-3 mt-3 rounded-xl resize-none border focus:ring-2 focus:ring-purple-400 focus:outline-none"
      value={aboutMe}
      onChange={(e) => onChange("aboutMe", e.target.value)}
    />
    <button
      className="px-4 py-2 mt-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
      onClick={() => saveField("aboutMe", aboutMe)}
    >
      Save
    </button>
  </>
) : (
  <p className="mt-3 h-81 p-3 overflow-y-auto rounded-xl bg-purple-50">
    {aboutMe || "No description added."}
  </p>
)}


  </Card>
);

const SectionSkills = ({
label,
skills,
editingField,
setEditingField,
onChange,
saveField,
index,
}) => {
if (!Array.isArray(skills))
skills =
typeof skills === "string"
? skills.split(",").map((s) => s.trim())
: [];

return (
<Card variant={index % 2 === 0 ? "white" : "purple"}> <div className="flex justify-between items-center"> <h3 className="font-semibold text-lg">{label}</h3>
<button
className="text-purple-600"
onClick={() => setEditingField(label)}
> <FiEdit3 size={20} /> </button> </div>


  {editingField === label ? (
    <div className="mt-4 flex gap-3">
      <input
        className="border p-3 rounded-xl w-full"
        value={skills.join(", ")}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
        onClick={() =>
          saveField(
            label === "Skills" ? "skills" : "jobPreference",
            skills.join(", ")
          )
        }
      >
        Save
      </button>
    </div>
  ) : (
    <div className="flex gap-2 mt-4 flex-wrap">
      {skills.map((skill, idx) => (
        <span
          key={idx}
          className="bg-gradient-to-r from-purple-200 to-indigo-200 text-purple-800 px-4 py-1.5 rounded-full font-medium shadow-sm hover:scale-105 transform transition duration-150"
        >
          {skill}
        </span>
      ))}
    </div>
  )}
</Card>


);
};

const SectionResume = ({ resume, editingField, setEditingField, onUpload, id }) => (

  <div className="p-6 border border-gray-200 bg-white/80 backdrop-blur-md rounded-2xl shadow-md">
    <div className="flex justify-between items-center">
      <h3 className="font-semibold text-gray-700 text-lg">Resume</h3>
      <button
        className="text-purple-600"
        onClick={() => setEditingField("resume")}
      >
        <FiEdit3 size={20} />
      </button>
    </div>


{editingField === "resume" ? (
  <input
    type="file"
    className="border p-3 rounded-xl w-full"
    onChange={onUpload}
  />
) : resume ? (
  <a
    href={`http://localhost:8080/api/candidates/${id}/resume`}
    className="text-purple-600 underline"
    target="_blank"
    rel="noopener noreferrer"
  >
    Download Resume
  </a>
) : (
  <p className="text-gray-600 mt-3">No resume uploaded</p>
)}


  </div>
);
