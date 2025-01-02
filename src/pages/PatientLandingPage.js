import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PatientLandingPage = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve the user data from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserId(user.id); // Extract the user ID
    }
  }, []);

  if (!userId) {
    return <div>Loading...</div>; // Handle case where user data isn't loaded yet
  }

  return (
    <div className="flex flex-col items-center space-y-8 p-8">
      <h1 className="text-2xl font-bold">Welcome to the Patient Portal</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link
          to={`/user-profile/${userId}`} // Dynamically append user ID
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
          to={`/patient-medical-records/${userId}`} // Pass the userId dynamically in params
          className="bg-purple-500 text-white px-4 py-6 rounded-lg shadow-md hover:bg-purple-600"
        >
          Medical Records
        </Link>
      </div>
    </div>
  );
};

export default PatientLandingPage;
