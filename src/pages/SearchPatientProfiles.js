import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserManagement from '../components/UserManagement';

const SearchPatientProfiles = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/patients/`);
        setPatients(response.data);
      } catch (err) {
        setError('Error fetching patient data.');
      }
    };

    fetchPatients();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/patient-medical-records/${id}`); // Navigate to PatientMedicalRecords with the patient ID
  };

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!patients.length) {
    return <div className="p-6">Loading patients...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Patient Profiles</h1>
      <UserManagement users={patients} type="Patient" onRowClick={handleRowClick} />
    </div>
  );
};

export default SearchPatientProfiles;
