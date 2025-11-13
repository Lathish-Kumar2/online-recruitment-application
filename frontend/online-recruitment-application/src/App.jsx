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
            path="/employer/dashboard"
            element={
              <ProtectedRoute allowedRole="employer">
                <EmployerDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/employer/post-job" element={<PostJob />} />


          <Route path="/employer/candidate-search" element={<CandidateSearch />} />
          <Route path="/employer/interview-schedule" element={<InterviewSchedule/>} />
          <Route path="/employer/interview-details" element={<InterviewDetails />} />
          <Route path="/employer/profile" element={<EmployerProfile/>}/>
          <Route path="/employer/reports" element={<Reports />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App