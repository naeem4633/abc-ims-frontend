import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getPatients, getStaffs, getAdmins,
    createUser, createPatient, createStaff, createAdmin
} from '../services/userService';
import { getImages } from '../services/imageService';
import ImageManagement from '../components/ImageManagement';
import TaskCostManagement from '../components/TaskCostManagement';
import TaskLog from '../components/TaskLog';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('Patients');
    const [patients, setPatients] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [images, setImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        abc_number: '',
        role: '',
        date_of_birth: '',
        address: '', // For patients
        phone: '', // For patients
        specialization: '', // For staff
        admin_level: 'Super Admin', // For admins
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setPatients(await getPatients());
                setStaffs(await getStaffs());
                setAdmins(await getAdmins());
            } catch (err) {
                setError('Error fetching data');
            }
        };

        const fetchImages = async () => {
            try {
                const fetchedImages = await getImages();
                setImages(fetchedImages);
            } catch (err) {
                setError('Error fetching images');
            }
        };

        fetchData();
        fetchImages();
    }, []);

    const handleRowClick = (id, role) => {
        navigate(`/user-profile/${id}`, { state: { role } });
    };

    const handleNewUserChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateUser = async () => {
        try {
            const userData = {
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                abc_number: newUser.abc_number,
                role: activeTab.slice(0, -1), // 'Patients' -> 'Patient'
                date_of_birth: newUser.date_of_birth,
            };

            const createdUser = await createUser(userData);

            if (activeTab === 'Patients') {
                await createPatient({
                    user: createdUser.id,
                    address: newUser.address,
                    phone: newUser.phone,
                });
                setPatients(await getPatients());
            } else if (activeTab === 'Staff') {
                await createStaff({
                    user: createdUser.id,
                    specialization: newUser.specialization,
                });
                setStaffs(await getStaffs());
            } else if (activeTab === 'Admins') {
                await createAdmin({
                    user: createdUser.id,
                    admin_level: newUser.admin_level,
                });
                setAdmins(await getAdmins());
            }

            setShowModal(false);
            setNewUser({
                first_name: '',
                last_name: '',
                email: '',
                abc_number: '',
                role: '',
                date_of_birth: '',
                address: '',
                phone: '',
                specialization: '',
                admin_level: 'Super Admin',
            });
        } catch (err) {
            setError('Failed to create user. Please try again.');
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
                {activeTab === 'Patients' && renderList(patients, 'Patient')}
                {activeTab === 'Staff' && renderList(staffs, 'Staff')}
                {activeTab === 'Admins' && renderList(admins, 'Admin')}
                {activeTab === 'Task Costs' && <TaskCostManagement />}
                {activeTab === 'Task Log' && <TaskLog />}
                {activeTab === 'Image Management' && <ImageManagement initialImages={images} />}
            </div>
        </div>
    );
};

export default AdminPanel;
