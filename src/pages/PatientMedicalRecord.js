import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PatientMedicalRecords = () => {
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [diagnoses, setDiagnoses] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const patientId = 1; // Replace with dynamic patient ID if available
        const medicalHistoryResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/patients/medical-histories/?patient=${patientId}`
        );
        const diagnosesResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/patients/diagnoses/?patient=${patientId}`
        );

        setMedicalHistory(medicalHistoryResponse.data[0]); // Assuming one medical history per patient
        setDiagnoses(diagnosesResponse.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      } catch (err) {
        setError('Error fetching medical records');
      }
    };

    fetchMedicalRecords();
  }, []);

  const handleViewDetails = (diagnosisId) => {
    navigate(`/diagnosis-details/${diagnosisId}`);
  };

  return (
    <div className="p-6">
      {error && <p className="text-red-500">{error}</p>}
      <h1 className="text-2xl font-bold mb-4">Patient Medical Records</h1>

      {/* Medical History Section */}
      {medicalHistory ? (
        <div className="mb-8 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-bold mb-2">Medical History</h2>
          <p><strong>Condition:</strong> {medicalHistory.condition}</p>
          <p><strong>Details:</strong> {medicalHistory.details}</p>
        </div>
      ) : (
        <p>Loading medical history...</p>
      )}

      {/* Diagnoses Section */}
      <div>
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
    </div>
  );
};

export default PatientMedicalRecords;
