import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/home/LandingPage.jsx'
import Login from './pages/auth/Login.jsx'
import SignUp from './pages/auth/SignUp.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import NotFound from './pages/NotFound.jsx'
import EmployerDashboard from './pages/employer/EmployerDashboard.jsx'
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import PostJob from './pages/employer/PostJob.jsx';
import CandidateSearch from './pages/employer/CandidateSearch.jsx'
import InterviewSchedule from './pages/employer/InterviewsSchecule.jsx'
import InterviewDetails from './pages/employer/InterviewDetails.jsx'
import Reports from './pages/employer/Reports.jsx'
import EmployerProfile from './pages/employer/EmployerProfile.jsx'
import JobsPosted from './components/employer/JobsPosted.jsx'
import ApplicationsReceived from './components/employer/ApplicationsReceived.jsx'
import JobDetails from './pages/candidate/JobDetails.jsx'
import CandidateProfile from "./pages/candidate/CandidateProfile";
import ApplicationStatus from "./pages/candidate/ApplicationStatus";
import CandidateDashboard from './pages/candidate/CandidateDashboard.jsx';
//import CandidateDashboard from "./pages/candidate/CandidateDashboard.jsx";





const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* <Route path="/employer/dashboard" element={<EmployerDashboard />} /> */}
          <Route
            path="/employer/:employerId/dashboard"
            element={
              <ProtectedRoute allowedRole="employer">
                <EmployerDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/employer/:employerId/post-job" element={<PostJob />} />
          <Route path="/employer/:employerId/candidate-search" element={<CandidateSearch />} />
          <Route path="/employer/:employerId/interview-schedule" element={<InterviewSchedule />} />
          <Route path="/employer/:employerId/interview-details" element={<InterviewDetails />} />
          <Route path="/employer/:employerId/profile" element={<EmployerProfile />} />
          <Route path="/employer/:employerId/reports" element={<Reports />} />
          <Route path="/employer/:employerId/jobs-posted" element={<JobsPosted />} />
          <Route path="/employer/:employerId/applications-received" element={<ApplicationsReceived />} />
          <Route path="/candidate/:candidateId/dashboard" element={<CandidateDashboard />} />
          <Route path="/job/:jobId" element={<JobDetails />} />

          <Route path="*" element={<NotFound />} />
            {/* Candidate Pages */}
          <Route path="/candidate/:candidateId/profile" element={<CandidateProfile />} />
          <Route path="/candidate/:candidateId/application-status" element={<ApplicationStatus />} />
         

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App