import React, { useState } from 'react';
import UploadImage from '../components/UploadImage'; // New UploadImage component
import UploadDiagnosis from '../components/UploadDiagnosis'; // New UploadDiagnosis component

const UploadNewImageDiagnosis = () => {
    const [activeTab, setActiveTab] = useState('Image'); // Tab toggle: 'Image' or 'Diagnosis'
    const [error, setError] = useState('');

    const handleImageUpload = (uploadedImage) => {
        console.log('Image uploaded:', uploadedImage);
        // Handle additional logic if needed
    };

    const handleDiagnosisUpload = (uploadedDiagnosis) => {
        console.log('Diagnosis uploaded:', uploadedDiagnosis);
        // Handle additional logic if needed
    };

    return (
        <div className="p-6 space-y-6">
            {error && <p className="text-red-500">{error}</p>}

            {/* Tabs */}
            <div className="border-b mb-4">
                <button
                    className={`px-4 py-2 ${activeTab === 'Image' ? 'border-b-4 border-blue-500 font-bold' : ''}`}
                    onClick={() => setActiveTab('Image')}
                >
                    Upload Image
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 'Diagnosis' ? 'border-b-4 border-blue-500 font-bold' : ''}`}
                    onClick={() => setActiveTab('Diagnosis')}
                >
                    Create Diagnosis
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'Image' && (
                <UploadImage onImageUpload={handleImageUpload} />
            )}

            {activeTab === 'Diagnosis' && (
                <UploadDiagnosis onDiagnosisUpload={handleDiagnosisUpload} />
            )}
        </div>
    );
};

export default UploadNewImageDiagnosis;
