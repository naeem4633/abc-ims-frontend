import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
// import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="app-body">
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/signup" element={<Signup/>} />
            {/* <Route path="/login" element={<Login/>} /> */}
            {/* <Route path="*" element={<ErrorPage/>} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
