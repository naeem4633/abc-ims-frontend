import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DiagnosisDetails = () => {
  const { id } = useParams();
  const [diagnosis, setDiagnosis] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiagnosisDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/patients/diagnosis-details/${id}/`);
        setDiagnosis(response.data.diagnosis);
        setImages(response.data.images);
      } catch (err) {
        setError('Error fetching diagnosis details');
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnosisDetails();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading diagnosis details...</p>;

  return (
    <div className="p-6">
      {error ? (
        <div className="text-red-500">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">Diagnosis Details</h1>
          <p><strong>Name:</strong> {diagnosis.name || 'Unnamed Diagnosis'}</p>
          <p><strong>Details:</strong> {diagnosis.diagnosis_details}</p>
          <p><strong>Confirmed:</strong> {diagnosis.confirmed ? 'Yes' : 'No'}</p>
          <p><strong>Diagnosed By:</strong> {diagnosis.diagnosed_by?.first_name} {diagnosis.diagnosed_by?.last_name}</p>
          <p><strong>Timestamp:</strong> {new Date(diagnosis.timestamp).toLocaleString()}</p>

          <h2 className="text-xl font-bold mt-6 mb-2">
            Linked Images ({images.length})
          </h2>
          {images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {images.map((image) => (
                <div key={image.id} className="bg-gray-100 p-4 rounded shadow">
                  <img
                    src={image.image_url}
                    alt={`Image ${image.id}`}
                    className="w-full h-40 object-cover mb-2 rounded"
                  />
                  <p><strong>Type:</strong> {image.type}</p>
                  <p><strong>Classification:</strong> {image.classification}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No images linked to this diagnosis.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DiagnosisDetails;
