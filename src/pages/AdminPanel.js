import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getPatients, getStaffs, getAdmins,
    createUser, createPatient, createStaff, createAdmin
} from '../services/userService';
import { getImages } from '../services/imageService';
import ImageManagement from '../components/ImageManagement';
import UserManagement from '../components/UserManagement';
import TaskCostManagement from '../components/TaskCostManagement';
import TaskLog from '../components/TaskLog';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('Patients');
    const [patients, setPatients] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading
            try {
                if (activeTab === 'Patients') {
                    setPatients(await getPatients());
                } else if (activeTab === 'Staff') {
                    setStaffs(await getStaffs());
                } else if (activeTab === 'Admins') {
                    setAdmins(await getAdmins());
                } else if (activeTab === 'Image Management') {
                    setImages(await getImages());
                }
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchData();
    }, [activeTab]);

    const handleRowClick = (id, role) => {
        navigate(`/user-profile/${id}`, { state: { role } });
    };

    const handleCreateUser = async () => {
        // Implement user creation logic here...
    };

    if (loading) {
        return <div className="p-6 text-center">Loading...</div>;
    }

    return (
        <div className="w-full p-6 space-y-6">
            {error && <p className="text-red-500">{error}</p>}

            {/* Tabs */}
            <div className="flex space-x-4 border-b-2 pb-2">
                {['Patients', 'Staff', 'Admins', 'Task Costs', 'Task Log', 'Image Management'].map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 ${activeTab === tab ? 'border-b-4 border-blue-500 font-bold' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
                {['Patients', 'Staff', 'Admins'].includes(activeTab) && (
                    <button
                        className="ml-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => setShowModal(true)}
                    >
                        Create {activeTab.slice(0, -1)}
                    </button>
                )}
            </div>

            {/* Panels */}
            <div className="mt-4">
                {activeTab === 'Patients' && <UserManagement users={patients} type="Patient" onRowClick={handleRowClick} />}
                {activeTab === 'Staff' && <UserManagement users={staffs} type="Staff" onRowClick={handleRowClick} />}
                {activeTab === 'Admins' && <UserManagement users={admins} type="Admin" onRowClick={handleRowClick} />}
                {activeTab === 'Task Costs' && <TaskCostManagement />}
                {activeTab === 'Task Log' && <TaskLog />}
                {activeTab === 'Image Management' && <ImageManagement initialImages={images} />}
            </div>
        </div>
    );
};

export default AdminPanel;
