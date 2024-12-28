import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import LandingPage from './pages/LandingPage';
import PatientLandingPage from './pages/PatientLandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import UserProfile from './pages/UserProfile';
import AdminSignup from './pages/AdminSignup';
import AdminLogin from './pages/AdminLogin';
import PatientMedicalRecords from './pages/PatientMedicalRecord';
import DiagnosisDetails from './pages/DiagnosisDetails';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="app-body">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/patient-landing-page" element={<PatientLandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/user-profile/:id" element={<UserProfile />} />
            <Route path="/admin-signup" element={<AdminSignup />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/patient-medical-records" element={<PatientMedicalRecords />} />
            <Route path="/diagnosis-details/:id" element={<DiagnosisDetails />} />
            {/* <Route path="*" element={<ErrorPage />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
