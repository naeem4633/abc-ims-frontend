import React, { useState, useEffect } from 'react';
import { getImages, createImage, deleteImage } from '../services/imageService';

const ImageManagement = () => {
    const [images, setImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newImage, setNewImage] = useState({
        image_file: null,
        type: 'MRI',
        classification: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setImages(await getImages());
            } catch (err) {
                setError('Error fetching images');
            }
        };
        fetchImages();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewImage((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setNewImage((prev) => ({ ...prev, image_file: e.target.files[0] }));
    };

    const handleCreateImage = async () => {
        try {
            await createImage(newImage);
            setImages(await getImages());
            setShowModal(false);
            setNewImage({ image_file: null, type: 'MRI', classification: '' });
        } catch (err) {
            setError('Error uploading image');
        }
    };

    const handleDeleteImage = async (id) => {
        try {
            await deleteImage(id);
            setImages(await getImages());
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
                                name="image_file"
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
