import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DiagnosisManagement = ({ initialDiagnoses = [], patientId }) => {
  const [diagnoses, setDiagnoses] = useState(initialDiagnoses);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!patientId) return;

    const fetchDiagnoses = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/patients/patient-diagnoses/${patientId}/`
        );
        setDiagnoses(response.data);
      } catch (err) {
        setError('Error fetching diagnoses');
      }
    };

    fetchDiagnoses();
  }, [patientId]);

  const handleViewDetails = (diagnosisId) => {
    navigate(`/diagnosis-details/${diagnosisId}`);
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <h2 className="text-xl font-bold mb-2">Diagnoses</h2>
      {diagnoses.length > 0 ? (
        <ul className="space-y-4">
          {diagnoses.map((diagnosis) => (
            <li key={diagnosis.id} className="p-4 bg-gray-100 rounded shadow">
              <h3 className="font-bold">{diagnosis.name || 'Unnamed Diagnosis'}</h3>
              <p><strong>Status:</strong> {diagnosis.confirmed ? 'Confirmed' : 'Unconfirmed'}</p>
              <p><strong>Details:</strong> {diagnosis.diagnosis_details}</p>
              <p><strong>Timestamp:</strong> {new Date(diagnosis.timestamp).toLocaleString()}</p>
              <button
                onClick={() => handleViewDetails(diagnosis.id)}
                className="text-blue-500 underline"
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No diagnoses found.</p>
      )}
    </div>
  );
};

export default DiagnosisManagement;
