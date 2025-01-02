import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DiagnosisManagement from '../components/DiagnosisManagement';
import ImageManagement from '../components/ImageManagement';
import axios from 'axios';

const PatientMedicalRecords = () => {
  const { patientId } = useParams(); // Get patientId from URL params
  const [activeTab, setActiveTab] = useState('Diagnoses');
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [error, setError] = useState('');
  const [patientImages, setPatientImages] = useState([]);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!patientId) {
        setError('Invalid patient ID.');
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/patients/medical-histories/?patient=${patientId}`
        );
        setMedicalHistory(response.data[0]); // Assuming one medical history per patient
      } catch (err) {
        setError('Error fetching medical history');
      }
    };

    fetchPatientData();
  }, [patientId]);

  useEffect(() => {
    const fetchPatientImages = async () => {
      if (!patientId) return;

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/image-management/patient-images/${patientId}/`
        );
        setPatientImages(response.data);
      } catch (err) {
        setError('Error fetching patient images.');
      }
    };

    fetchPatientImages();
  }, [patientId]);

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!patientId) {
    return <div className="p-6">Loading patient data...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Patient Medical Record</h1>

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

      {/* Tabs */}
      <div className="border-b">
        <button
          className={`px-4 py-2 ${activeTab === 'Diagnoses' ? 'border-b-4 border-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab('Diagnoses')}
        >
          Diagnoses
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'Images' ? 'border-b-4 border-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab('Images')}
        >
          Images
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'Diagnoses' && <DiagnosisManagement patientId={patientId} />}
        {activeTab === 'Images' && <ImageManagement initialImages={patientImages} />}
      </div>
    </div>
  );
};

export default PatientMedicalRecords;
