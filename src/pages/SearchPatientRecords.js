import React, { useState, useEffect } from 'react';
import DiagnosisManagement from '../components/DiagnosisManagement';
import ImageManagement from '../components/ImageManagement';
import axios from 'axios';

const SearchPatientRecords = () => {
    const [activeTab, setActiveTab] = useState('Diagnoses');
    const [diagnoses, setDiagnoses] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (activeTab === 'Diagnoses') {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/patients/diagnoses/`);
                    setDiagnoses(response.data);
                } else if (activeTab === 'Images') {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/image-management/images/`);
                    setImages(response.data);
                }
            } catch (err) {
                setError('Error fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [activeTab]);

    if (loading) {
        return <div className="p-6 text-center">Loading...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-500">{error}</div>;
    }

    return (
        <div className="w-full p-6 space-y-6">
            <h1 className="text-2xl font-bold mb-4">Search Patient Records</h1>

            {/* Tabs */}
            <div className="border-b mb-4">
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
            <div>
                {activeTab === 'Diagnoses' && (
                    <DiagnosisManagement initialDiagnoses={diagnoses} />
                )}
                {activeTab === 'Images' && (
                    <ImageManagement initialImages={images} />
                )}
            </div>
        </div>
    );
};

export default SearchPatientRecords;
