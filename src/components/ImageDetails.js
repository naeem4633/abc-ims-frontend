import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ImageDetails = () => {
    const { id } = useParams();
    const [imageDetails, setImageDetails] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchImageDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/image-management/image-details/${id}/`);
                console.log("image details:", response.data)
                setImageDetails(response.data);
            } catch (err) {
                setError('Error fetching image details');
            }
        };

        fetchImageDetails();
    }, [id]);

    if (error) return <p className="text-red-500">{error}</p>;

    if (!imageDetails) return <p>Loading image details...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Image Details</h1>
            <p><strong>Type:</strong> {imageDetails.type}</p>
            <p><strong>Classification:</strong> {imageDetails.classification}</p>
            <div className="my-4">
                <strong>Image:</strong>
                <div className="mt-2">
                    <img 
                        src={imageDetails.image_url} 
                        alt="Uploaded" 
                        className="w-64 h-64 object-cover rounded" 
                    />
                </div>
            </div>
            <p><strong>Uploaded at:</strong> {new Date(imageDetails.timestamp).toLocaleString()}</p>
            <h2 className="text-xl font-bold mt-6">Associated Data</h2>
            <p><strong>Patient:</strong> {imageDetails.patient.name}</p>
            <p><strong>Uploaded By:</strong> {imageDetails.uploaded_by.name}</p>
            {imageDetails.diagnosis && (
                <p><strong>Diagnosis:</strong> {imageDetails.diagnosis.name}</p>
            )}
        </div>
    );
};

export default ImageDetails;
