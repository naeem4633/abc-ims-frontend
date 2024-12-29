import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const getImages = async () => {
    const response = await axios.get(`${BASE_URL}/image-management/`);
    return response.data;
};

export const getImageById = async (id) => {
    const response = await axios.get(`${BASE_URL}/image-management/${id}/`);
    return response.data;
};

export const createImage = async (imageData) => {
    const formData = new FormData();
    Object.keys(imageData).forEach((key) => formData.append(key, imageData[key]));
    const response = await axios.post(`${BASE_URL}/image-management/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const updateImage = async (id, imageData) => {
    const formData = new FormData();
    Object.keys(imageData).forEach((key) => formData.append(key, imageData[key]));
    const response = await axios.patch(`${BASE_URL}/image-management/${id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const deleteImage = async (id) => {
    const response = await axios.delete(`${BASE_URL}/image-management/${id}/`);
    return response.data;
};
