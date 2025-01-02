import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StaffLandingPage = () => {
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
      <h1 className="text-2xl font-bold">Welcome to the Staff Portal</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Link
          to={`/user-profile/${userId}`}
          className="bg-blue-500 text-white px-4 py-6 rounded-lg shadow-md hover:bg-blue-600"
        >
          View Profile
        </Link>
        <Link
          to="/search-patient-profiles"
          className="bg-green-500 text-white px-4 py-6 rounded-lg shadow-md hover:bg-green-600"
        >
          Search Patient Profiles
        </Link>
        <Link
          to="/search-patient-records"
          className="bg-yellow-500 text-white px-4 py-6 rounded-lg shadow-md hover:bg-yellow-600"
        >
          Search Patient Diagnoses/Images
        </Link>
        <Link
          to="/new-image-diagnosis"
          className="bg-red-500 text-white px-4 py-6 rounded-lg shadow-md hover:bg-red-600"
        >
          New Image/Diagnosis
        </Link>
      </div>
    </div>
  );
};

export default StaffLandingPage;
