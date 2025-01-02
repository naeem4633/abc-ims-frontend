import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = ({ onImageUpload }) => {
    const [patients, setPatients] = useState([]);
    const [diagnoses, setDiagnoses] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [newImage, setNewImage] = useState({
        image: null,
        type: 'MRI',
        classification: '',
        patient: '',
        diagnosis: '',
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewImage((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setNewImage((prev) => ({ ...prev, image: e.target.files[0] }));
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
        setNewImage((prev) => ({ ...prev, patient: patient.id }));
        setSelectedPatient(patient);
        setSearchQuery('');
        setPatients([]);
        fetchPatientDiagnoses(patient.id);
    };

    const fetchPatientDiagnoses = async (patientId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/patients/patient-diagnoses/${patientId}/`);
            setDiagnoses(response.data);
        } catch (err) {
            setError('Error fetching diagnoses');
        }
    };

    const handleCreateImage = async () => {
        try {
            const formData = new FormData();
            Object.entries(newImage).forEach(([key, value]) => formData.append(key, value));
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/image-management/images/`, formData);
            onImageUpload(response.data);
        } catch (err) {
            setError('Error uploading image');
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Upload New Image</h2>
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
                <label className="block font-medium">Type</label>
                <select
                    name="type"
                    value={newImage.type}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded"
                >
                    <option value="MRI">MRI</option>
                    <option value="CT">CT</option>
                    <option value="X-Ray">X-Ray</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block font-medium">Classification</label>
                <input
                    type="text"
                    name="classification"
                    value={newImage.classification}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block font-medium">Image File</label>
                <input type="file" name="image" onChange={handleFileChange} className="w-full border px-3 py-2 rounded" />
            </div>
            <div className="flex justify-end space-x-2">
                <button
                    onClick={handleCreateImage}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Upload
                </button>
            </div>
        </div>
    );
};

export default UploadImage;
