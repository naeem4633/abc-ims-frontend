import React from 'react';
import { Link } from 'react-router-dom';

const PatientLandingPage = () => {
  return (
    <div className="flex flex-col items-center space-y-8 p-8">
      <h1 className="text-2xl font-bold">Welcome to the Patient Portal</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link
          to="/user-profile"
          className="bg-blue-500 text-white px-4 py-6 rounded-lg shadow-md hover:bg-blue-600"
        >
          View Profile
        </Link>
        <Link
          to="/patient-billing"
          className="bg-green-500 text-white px-4 py-6 rounded-lg shadow-md hover:bg-green-600"
        >
          Billing
        </Link>
        <Link
          to="/patient-medical-records"
          className="bg-purple-500 text-white px-4 py-6 rounded-lg shadow-md hover:bg-purple-600"
        >
          Medical Records
        </Link>
      </div>
    </div>
  );
};

export default PatientLandingPage;
