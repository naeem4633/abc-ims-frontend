import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getPatients, getStaffs, getAdmins,
    createUser, createPatient, createStaff, createAdmin
} from '../services/userService';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('Patients');
    const [patients, setPatients] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [admins, setAdmins] = useState([]);
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
        fetchData();
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
            // Step 1: Create the general user
            const userData = {
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                abc_number: newUser.abc_number,
                role: activeTab.slice(0, -1), // 'Patients' -> 'Patient'
                date_of_birth: newUser.date_of_birth,
            };
            const createdUser = await createUser(userData);

            // Step 2: Create the role-specific entry
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
                        <p>
                            {type === 'Staff'
                                ? `Specialization: ${user.specialization || 'N/A'}`
                                : type === 'Patient'
                                ? `Phone: ${user.phone || 'N/A'}`
                                : `Level: ${user.admin_level || 'N/A'}`}
                        </p>
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
                {['Patients', 'Staff', 'Admins'].map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 ${activeTab === tab ? 'border-b-4 border-blue-500 font-bold' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
                <button
                    className="ml-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setShowModal(true)}
                >
                    Create {activeTab.slice(0, -1)}
                </button>
            </div>

            {/* Lists */}
            <div className="mt-4">
                {activeTab === 'Patients' && renderList(patients, 'Patient')}
                {activeTab === 'Staff' && renderList(staffs, 'Staff')}
                {activeTab === 'Admins' && renderList(admins, 'Admin')}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Create {activeTab.slice(0, -1)}</h2>
                        <div className="mb-4">
                            <label className="block font-medium">First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                value={newUser.first_name}
                                onChange={handleNewUserChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium">Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                value={newUser.last_name}
                                onChange={handleNewUserChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={newUser.email}
                                onChange={handleNewUserChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium">ABC Number</label>
                            <input
                                type="text"
                                name="abc_number"
                                value={newUser.abc_number}
                                onChange={handleNewUserChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium">Date of Birth</label>
                            <input
                                type="date"
                                name="date_of_birth"
                                value={newUser.date_of_birth}
                                onChange={handleNewUserChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                        {activeTab === 'Patients' && (
                            <>
                                <div className="mb-4">
                                    <label className="block font-medium">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={newUser.address}
                                        onChange={handleNewUserChange}
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block font-medium">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={newUser.phone}
                                        onChange={handleNewUserChange}
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                </div>
                            </>
                        )}
                        {activeTab === 'Staff' && (
                            <div className="mb-4">
                                <label className="block font-medium">Specialization</label>
                                <input
                                    type="text"
                                    name="specialization"
                                    value={newUser.specialization}
                                    onChange={handleNewUserChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>
                        )}
                        {activeTab === 'Admins' && (
                            <div className="mb-4">
                                <label className="block font-medium">Admin Level</label>
                                <input
                                    type="text"
                                    name="admin_level"
                                    value={newUser.admin_level}
                                    onChange={handleNewUserChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>
                        )}
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateUser}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
