import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/signup";
import SignUpStepTwo from "./component/signupStepTwo";
import JobsDetails from "./pages/JobsDetails";
import SavedJobs from "./component/SavedJobs";
import JobSeekerNavbar from "./component/JobSeekerNavbar";
import JobSeekerSidebar from "./component/JobSeekerSidebar";
import Jobs from "./pages/Jobs";
import JobSeekerMyProfileEdit from "./component/JobSeekerMyProfileEdit";
import Setting from "./component/Setting/index.jsx";
import Candidates from "./pages/Candidates";
import JobSeekerProfile from "./pages/JobSeekerProfile";
import Footer from "./component/Footer";
import JobApplication from "./pages/JobApplication";
import SendEmailToForgetPassword from "./pages/SendEmailToForgetPassword";
import Dashboard from "./component/Dashboard";
import AppliedJobs from "./component/AppliedJobs";
import ManageCV from "./component/ManageCV/index .jsx";
import NotFound from './pages/NotFound';
import AboutUsPage from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/login/index.jsx';

import './i18n.js';
import "react-toastify/dist/ReactToastify.css";
import { useTransition } from "react";
import { RegisterFormProvider } from "./contexts/RegisterFormContext";
import { ToastContainer } from "react-bootstrap";
import { AuthProvider } from "./contexts/authContext";
import Guards from "./Guards";
import DashboardJobSekeer from "./pages/DashboardJobSekeer/index.jsx";
import Companies from "./pages/Companies/index.jsx";
import MyAccount from "./pages/myAccount/index.jsx";


export default function App() {
  const { t } = useTransition();
  
  return (
    <AuthProvider>
      <Router>
        <MainContent/>
      </Router>
    </AuthProvider>
  );
}
const MainContent = () => {
  const location = useLocation();

  const noFooterRoutes = [
    '/dashboard',
    '/dashboard/dashboard-info',
    '/dashboard/my-Profile',
    '/dashboard/saved-jobs',
    '/dashboard/manage-cv',
    '/dashboard/applied-jobs',
    '/dashboard/settings'
  ];

  const showFooter = !noFooterRoutes.some(route => location.pathname.startsWith(route));

  return (
    <>
      <JobSeekerNavbar />
      <RegisterFormProvider>
        <ToastContainer theme="colored" />
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/endemailtoforgetpass" element={<SendEmailToForgetPassword />} />
          {/* ----------------------------------protected------------------------------------ */}
          <Route element={<Guards />}>
            <Route path="/step-two" element={<SignUpStepTwo />} />
            <Route path="/jobseeker" element={<JobSeekerSidebar />} />
            <Route path="/JobsDetails/:id" element={<JobsDetails />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/dashboard" element={<DashboardJobSekeer />}>
            <Route path="dashboard-info" element={<Dashboard />} />
            <Route path="applied-jobs" element={<AppliedJobs />} />
            
              <Route path="my-Profile" element={<JobSeekerMyProfileEdit />} />
              <Route path="saved-jobs" element={<SavedJobs />} />
              <Route path="manage-cv" element={<ManageCV />} />
              <Route path="settings" element={<Setting />} />
            </Route>
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/profile/:userId" element={<JobSeekerProfile />} />
            <Route path="/my-account/:userId" element={<MyAccount />} />
            <Route path="/applicationform/:jobId" element={<JobApplication />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </RegisterFormProvider>
      {showFooter && <Footer />}
    </>
  );
};