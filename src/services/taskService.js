import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

// Task Cost CRUD Operations
export const getTaskCosts = async () => {
    const response = await axios.get(`${BASE_URL}/tasks-and-billing/task-costs/`);
    return response.data;
};

export const getTaskCostById = async (id) => {
    const response = await axios.get(`${BASE_URL}/tasks-and-billing/task-costs/${id}/`);
    return response.data;
};

export const createTaskCost = async (taskCostData) => {
    const response = await axios.post(`${BASE_URL}/tasks-and-billing/task-costs/`, taskCostData, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
};

export const updateTaskCost = async (id, taskCostData) => {
    const response = await axios.patch(`${BASE_URL}/tasks-and-billing/task-costs/${id}/`, taskCostData, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
};

export const deleteTaskCost = async (id) => {
    const response = await axios.delete(`${BASE_URL}/tasks-and-billing/task-costs/${id}/`);
    return response.data;
};
