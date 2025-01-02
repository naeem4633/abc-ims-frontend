import React, { useState, useEffect } from 'react';
import { createImage, deleteImage } from '../services/imageService';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ImageManagement = ({ initialImages = [] }) => {
    const [images, setImages] = useState(initialImages); // Images passed as props
    const [patients, setPatients] = useState([]);
    const [diagnoses, setDiagnoses] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newImage, setNewImage] = useState({
        image: null,
        type: 'MRI',
        classification: '',
        patient: '',
        diagnosis: '',
    });
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const loggedInUser = JSON.parse(localStorage.getItem('user'));

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
        setSearchQuery(''); // Clear the search query when a patient is selected
        setPatients([]); // Clear the search results
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
            const payload = { ...newImage, uploaded_by: loggedInUser.id };
            await createImage(payload);
            setImages([...images, payload]); // Update the local state
            setShowModal(false);
            setNewImage({ image: null, type: '', classification: '', patient: '', diagnosis: '' });
        } catch (err) {
            setError('Error uploading image');
        }
    };

    const handleDeleteImage = async (id) => {
        try {
            await deleteImage(id);
            setImages(images.filter((image) => image.id !== id)); // Update local state
        } catch (err) {
            setError('Error deleting image');
        }
    };

    return (
        <div className="w-full p-6 space-y-6">
            {error && <p className="text-red-500">{error}</p>}
            <h1 className="text-2xl font-bold mb-4">Image Management</h1>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => setShowModal(true)}
            >
                Upload Image
            </button>
            <ul className="space-y-4 mt-4">
                {images.map((image) => (
                    <li key={image.id} className="flex justify-between bg-gray-100 p-4 rounded shadow">
                        <div>
                            <p><strong>Type:</strong> {image.type}</p>
                            <p><strong>Classification:</strong> {image.classification}</p>
                            <img src={image.image_url} alt="Uploaded" className="w-32 h-32 object-cover mt-2" />
                            <Link to={`/image-details/${image.id}`} className="text-blue-500 hover:underline">
                                View Details
                            </Link>
                        </div>
                        <button
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            onClick={() => handleDeleteImage(image.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Upload New Image</h2>
                        <div className="mb-4">
                            <label className="block font-medium">Patient</label>
                            <input
                                type="text"
                                placeholder="Search by name or ABC number"
                                className="w-full border px-3 py-2 rounded"
                                value={selectedPatient ? `${selectedPatient.user_detail.first_name} ${selectedPatient.user_detail.last_name}` : searchQuery}
                                onChange={(e) => handlePatientSearch(e.target.value)}
                                disabled={!!selectedPatient} // Disable input when a patient is selected
                            />
                            <ul className="max-h-40 overflow-y-auto border border-gray-300 rounded mt-2 space-y-2">
                                {patients.map((patient) => (
                                    <li
                                        key={patient.id}
                                        className="cursor-pointer hover:bg-gray-200 p-2"
                                        onClick={() => handlePatientSelect(patient)}
                                    >
                                        {patient.user_detail?.first_name ? (
                                            `${patient.user_detail.first_name} ${patient.user_detail.last_name || ''} - ${patient.user_detail.abc_number || ''}`
                                        ) : (
                                            'Unknown Patient'
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium">Diagnosis</label>
                            <select
                                name="diagnosis"
                                value={newImage.diagnosis}
                                onChange={handleInputChange}
                                className="w-full border px-3 py-2 rounded"
                                disabled={!selectedPatient}
                            >
                                <option value="">Select Diagnosis</option>
                                {diagnoses.map((diagnosis) => (
                                    <option key={diagnosis.id} value={diagnosis.id}>
                                        {diagnosis.name}
                                    </option>
                                ))}
                            </select>
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
                            <input
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateImage}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageManagement;