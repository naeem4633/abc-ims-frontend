import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getPatients, getStaffs, getAdmins,
    createUser, createPatient, createStaff, createAdmin
} from '../services/userService';
import {
    getTaskCosts, createTaskCost, updateTaskCost, deleteTaskCost
} from '../services/taskService';
import ImageManagement from '../components/ImageManagement';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('Patients');
    const [patients, setPatients] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [taskCosts, setTaskCosts] = useState([]);
    const [showTaskCostModal, setShowTaskCostModal] = useState(false);
    const [taskCostForm, setTaskCostForm] = useState({ id: null, name: '', cost: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setPatients(await getPatients());
                setStaffs(await getStaffs());
                setAdmins(await getAdmins());
                setTaskCosts(await getTaskCosts());
            } catch (err) {
                setError('Error fetching data');
            }
        };
        fetchData();
    }, []);

    const handleRowClick = (id, role) => {
        navigate(`/user-profile/${id}`, { state: { role } });
    };

    const handleTaskCostChange = (e) => {
        const { name, value } = e.target;
        setTaskCostForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveTaskCost = async () => {
        try {
            if (taskCostForm.id) {
                await updateTaskCost(taskCostForm.id, taskCostForm);
            } else {
                await createTaskCost(taskCostForm);
            }
            setTaskCosts(await getTaskCosts());
            setShowTaskCostModal(false);
            setTaskCostForm({ id: null, name: '', cost: '' });
        } catch (err) {
            setError('Failed to save task cost. Please try again.');
        }
    };

    const handleDeleteTaskCost = async (id) => {
        try {
            await deleteTaskCost(id);
            setTaskCosts(await getTaskCosts());
        } catch (err) {
            setError('Failed to delete task cost. Please try again.');
        }
    };

    const renderList = (users, type) => (
        <div className="space-y-2">
            {users.map((user) => (
                <div
                    key={user.id}
                    className="flex justify-between items-center bg-gray-100 p-4 rounded cursor-pointer hover:bg-gray-200"
                    onClick={() => handleRowClick(user.id, type.toLowerCase())}
                >
                    <div>
                        <p className="font-bold">
                            {user.user_detail?.first_name || 'N/A'} {user.user_detail?.last_name || ''}
                        </p>
                        <p>Email: {user.user_detail?.email || 'N/A'}</p>
                        <p>ABC Number: {user.user_detail?.abc_number || 'N/A'}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="w-full p-6 space-y-6">
            {error && <p className="text-red-500">{error}</p>}

            {/* Tabs */}
            <div className="flex space-x-4 border-b-2 pb-2">
                {['Patients', 'Staff', 'Admins', 'Task Costs', 'Image Management'].map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 ${activeTab === tab ? 'border-b-4 border-blue-500 font-bold' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Panels */}
            <div className="mt-4">
                {activeTab === 'Patients' && renderList(patients, 'Patient')}
                {activeTab === 'Staff' && renderList(staffs, 'Staff')}
                {activeTab === 'Admins' && renderList(admins, 'Admin')}
                {activeTab === 'Task Costs' && (
                    <div className="space-y-4">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={() => setShowTaskCostModal(true)}
                        >
                            Add Task Cost
                        </button>
                        <ul className="space-y-4">
                            {taskCosts.map((taskCost) => (
                                <li key={taskCost.id} className="flex justify-between items-center bg-gray-100 p-4 rounded">
                                    <div>
                                        <p><strong>Name:</strong> {taskCost.name}</p>
                                        <p><strong>Cost:</strong> ${taskCost.cost}</p>
                                    </div>
                                    <div className="space-x-2">
                                        <button
                                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                            onClick={() => {
                                                setTaskCostForm(taskCost);
                                                setShowTaskCostModal(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleDeleteTaskCost(taskCost.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {activeTab === 'Image Management' && <ImageManagement />}
            </div>
        </div>
    );
};

export default AdminPanel;
