import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import PatientLandingPage from './pages/PatientLandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="app-body">
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/patient-landing-page" element={<PatientLandingPage/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/admin-panel" element={<AdminPanel/>} />
            <Route path="/user-profile" element={<UserProfile/>} />
            {/* <Route path="*" element={<ErrorPage/>} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;