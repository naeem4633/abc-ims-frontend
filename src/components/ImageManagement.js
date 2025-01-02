import React, { useState } from 'react';
import { deleteImage } from '../services/imageService';
import UploadImage from './UploadImage';
import { Link } from 'react-router-dom';

const ImageManagement = ({ initialImages = [] }) => {
    const [images, setImages] = useState(initialImages);
    const [showModal, setShowModal] = useState(false);

    const handleDeleteImage = async (id) => {
        try {
            await deleteImage(id);
            setImages(images.filter((image) => image.id !== id));
        } catch (err) {
            console.error('Error deleting image');
        }
    };

    const handleImageUpload = (newImage) => {
        setImages([...images, newImage]);
        setShowModal(false);
    };

    const handleModalClose = (e) => {
        if (e.target.id === 'modal-overlay') {
            setShowModal(false);
        }
    };

    return (
        <div className="w-full p-6 space-y-6">
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
                <div
                    id="modal-overlay"
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={handleModalClose}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <UploadImage onImageUpload={handleImageUpload} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageManagement;
