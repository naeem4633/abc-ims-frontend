import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

// Utility function to create endpoints
const createEndpoint = (entity) => `${BASE_URL}/users/${entity}/`;

// User CRUD Operations
export const getUsers = async () => {
    const response = await axios.get(createEndpoint('users'));
    return response.data;
};

export const getUserById = async (id) => {
    const response = await axios.get(`${createEndpoint('users')}${id}/`);
    return response.data;
};

export const createUser = async (userData) => {
    const response = await axios.post(createEndpoint('users'), userData, {
        headers: { 'Content-Type': 'application/json' },
    });
    console.log('User created:', response.data);
    return response.data;
};

export const updateUser = async (id, userData) => {
    const response = await axios.patch(`${createEndpoint('users')}${id}/`, userData, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await axios.delete(`${createEndpoint('users')}${id}/`);
    return response.data;
};

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
    console.log('Patient created:', response.data);
    return response.data;
};

export const updatePatient = async (id, patientData) => {
    const response = await axios.patch(`${createEndpoint('patients')}${id}/`, patientData);
    return response.data;
};

export const deletePatient = async (id) => {
    const response = await axios.delete(`${createEndpoint('patients')}${id}/`);
    return response.data;
};

// Staff CRUD Operations
export const getStaffs = async () => {
    const response = await axios.get(createEndpoint('staffs'));
    return response.data;
};

export const getStaffById = async (id) => {
    const response = await axios.get(`${createEndpoint('staffs')}${id}/`);
    return response.data;
};

export const createStaff = async (staffData) => {
    const response = await axios.post(createEndpoint('staffs'), staffData);
    console.log('Staff created:', response.data);
    return response.data;
};

export const updateStaff = async (id, staffData) => {
    const response = await axios.patch(`${createEndpoint('staffs')}${id}/`, staffData);
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
    console.log('Admin created:', response.data);
    return response.data;
};

export const updateAdmin = async (id, adminData) => {
    const response = await axios.patch(`${createEndpoint('admins')}${id}/`, adminData);
    return response.data;
};

export const deleteAdmin = async (id) => {
    const response = await axios.delete(`${createEndpoint('admins')}${id}/`);
    return response.data;
};
