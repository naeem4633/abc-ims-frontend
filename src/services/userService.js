import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

// Utility function to create endpoints
const createEndpoint = (entity) => `${BASE_URL}/users/${entity}/`;

// Patient CRUD Operations
export const getPatients = async () => {
    const response = await axios.get(createEndpoint('patients'));
    return response.data;
};

export const getPatientById = async (id) => {
    const response = await axios.get(`${createEndpoint('patients')}${id}/`);
    return response.data;
};

export const createPatient = async (patientData) => {
    const response = await axios.post(createEndpoint('patients'), patientData);
    return response.data;
};

export const updatePatient = async (id, patientData) => {
    const response = await axios.put(`${createEndpoint('patients')}${id}/`, patientData);
    return response.data;
};

export const deletePatient = async (id) => {
    const response = await axios.delete(`${createEndpoint('patients')}${id}/`);
    return response.data;
};

// Staff CRUD Operations
export const getStaffs = async () => {
    const response = await axios.get(createEndpoint('staffs'));
    console.log(response.data)
    return response.data;
};

export const getStaffById = async (id) => {
    const response = await axios.get(`${createEndpoint('staffs')}${id}/`);
    return response.data;
};

export const createStaff = async (staffData) => {
    const response = await axios.post(createEndpoint('staffs'), staffData);
    return response.data;
};

export const updateStaff = async (id, staffData) => {
    const response = await axios.put(`${createEndpoint('staffs')}${id}/`, staffData);
    return response.data;
};

export const deleteStaff = async (id) => {
    const response = await axios.delete(`${createEndpoint('staffs')}${id}/`);
    return response.data;
};

// Admin CRUD Operations
export const getAdmins = async () => {
    const response = await axios.get(createEndpoint('admins'));
    return response.data;
};

export const getAdminById = async (id) => {
    const response = await axios.get(`${createEndpoint('admins')}${id}/`);
    return response.data;
};

export const createAdmin = async (adminData) => {
    const response = await axios.post(createEndpoint('admins'), adminData);
    return response.data;
};

export const updateAdmin = async (id, adminData) => {
    const response = await axios.put(`${createEndpoint('admins')}${id}/`, adminData);
    return response.data;
};

export const deleteAdmin = async (id) => {
    const response = await axios.delete(`${createEndpoint('admins')}${id}/`);
    return response.data;
};
