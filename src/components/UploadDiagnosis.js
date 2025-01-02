import React, { useState } from 'react';
import axios from 'axios';

const UploadDiagnosis = ({ onDiagnosisUpload }) => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [newDiagnosis, setNewDiagnosis] = useState({
        patient: '',
        diagnosed_by: JSON.parse(localStorage.getItem('user')).id, // Logged-in user's ID as `diagnosed_by`
        name: '',
        diagnosis_details: '',
        confirmed: false,
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDiagnosis((prev) => ({ ...prev, [name]: value }));
    };

    const handlePatientSearch = async (query) => {
        setSearchQuery(query); // Update the query as the user types
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/search-patients/?query=${query}`);
            setPatients(response.data);
        } catch (err) {
            setError('Error fetching patients');
        }
    };

    const handlePatientSelect = (patient) => {
        setNewDiagnosis((prev) => ({ ...prev, patient: patient.id }));
        setSelectedPatient(patient);
        setSearchQuery('');
        setPatients([]);
    };

    const handleCreateDiagnosis = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/patients/diagnoses/`, newDiagnosis);
            onDiagnosisUpload(response.data); // Pass the new diagnosis back to the parent
        } catch (err) {
            setError('Error creating diagnosis');
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Upload New Diagnosis</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
                <label className="block font-medium">Patient</label>
                <input
                    type="text"
                    placeholder="Search by name or ABC number"
                    className="w-full border px-3 py-2 rounded"
                    value={selectedPatient ? `${selectedPatient.user_detail.first_name} ${selectedPatient.user_detail.last_name}` : searchQuery}
                    onChange={(e) => handlePatientSearch(e.target.value)}
                    disabled={!!selectedPatient}
                />
                <ul className="max-h-40 overflow-y-auto border border-gray-300 rounded mt-2 space-y-2">
                    {patients.map((patient) => (
                        <li
                            key={patient.id}
                            className="cursor-pointer hover:bg-gray-200 p-2"
                            onClick={() => handlePatientSelect(patient)}
                        >
                            {patient.user_detail?.first_name} {patient.user_detail?.last_name} - {patient.user_detail?.abc_number || ''}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mb-4">
                <label className="block font-medium">Diagnosis Name</label>
                <input
                    type="text"
                    name="name"
                    value={newDiagnosis.name}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block font-medium">Diagnosis Details</label>
                <textarea
                    name="diagnosis_details"
                    value={newDiagnosis.diagnosis_details}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block font-medium">Confirmed</label>
                <select
                    name="confirmed"
                    value={newDiagnosis.confirmed}
                    onChange={(e) => setNewDiagnosis((prev) => ({ ...prev, confirmed: e.target.value === 'true' }))}
                    className="w-full border px-3 py-2 rounded"
                >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </select>
            </div>
            <div className="flex justify-end space-x-2">
                <button
                    onClick={handleCreateDiagnosis}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Upload
                </button>
            </div>
        </div>
    );
};

export default UploadDiagnosis;
