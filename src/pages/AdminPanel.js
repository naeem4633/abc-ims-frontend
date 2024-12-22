import React, { useState, useEffect } from 'react';
import {
    getPatients, createPatient, updatePatient, deletePatient,
    getStaffs, createStaff, updateStaff, deleteStaff,
    getAdmins, createAdmin, updateAdmin, deleteAdmin
} from '../services/userService';

const AdminPanel = () => {
    const [patients, setPatients] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [error, setError] = useState('');

    // Fetch data
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

    // Handlers for CRUD operations
    const handleCreate = async (type, data) => {
        try {
            if (type === 'patient') {
                await createPatient(data);
                setPatients(await getPatients());
            } else if (type === 'staff') {
                await createStaff(data);
                setStaffs(await getStaffs());
            } else if (type === 'admin') {
                await createAdmin(data);
                setAdmins(await getAdmins());
            }
        } catch (err) {
            setError('Error creating entry');
        }
    };

    const handleUpdate = async (type, id, data) => {
        try {
            if (type === 'patient') {
                await updatePatient(id, data);
                setPatients(await getPatients());
            } else if (type === 'staff') {
                await updateStaff(id, data);
                setStaffs(await getStaffs());
            } else if (type === 'admin') {
                await updateAdmin(id, data);
                setAdmins(await getAdmins());
            }
        } catch (err) {
            setError('Error updating entry');
        }
    };

    const handleDelete = async (type, id) => {
        try {
            if (type === 'patient') {
                await deletePatient(id);
                setPatients(await getPatients());
            } else if (type === 'staff') {
                await deleteStaff(id);
                setStaffs(await getStaffs());
            } else if (type === 'admin') {
                await deleteAdmin(id);
                setAdmins(await getAdmins());
            }
        } catch (err) {
            setError('Error deleting entry');
        }
    };

    return (
        <div className="w-full p-6 space-y-6">
            {error && <p className="text-red-500">{error}</p>}

            {/* Patients Section */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">Patients</h2>
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => handleCreate('patient', { /* Add patient data */ })}
                >
                    Add Patient
                </button>
                <ul className="space-y-2">
                    {patients.map((patient) => (
                        <li key={patient.id} className="flex justify-between items-center bg-gray-100 p-4 rounded">
                            <div>
                                <p>Name: {patient.user.username}</p>
                                <p>Email: {patient.user.email}</p>
                                <p>Phone: {patient.phone}</p>
                            </div>
                            <div className="space-x-2">
                                <button 
                                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                    onClick={() => handleUpdate('patient', patient.id, { /* Add updated data */ })}
                                >
                                    Update
                                </button>
                                <button 
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    onClick={() => handleDelete('patient', patient.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Staff Section */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">Staff</h2>
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => handleCreate('staff', { /* Add staff data */ })}
                >
                    Add Staff
                </button>
                <ul className="space-y-2">
                    {staffs.map((staff) => (
                        <li key={staff.id} className="flex justify-between items-center bg-gray-100 p-4 rounded">
                            <div>
                                <p>Name: {staff.user.username}</p>
                                <p>Email: {staff.user.email}</p>
                                <p>Specialization: {staff.specialization}</p>
                            </div>
                            <div className="space-x-2">
                                <button 
                                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                    onClick={() => handleUpdate('staff', staff.id, { /* Add updated data */ })}
                                >
                                    Update
                                </button>
                                <button 
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    onClick={() => handleDelete('staff', staff.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Admin Section */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">Admins</h2>
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => handleCreate('admin', { /* Add admin data */ })}
                >
                    Add Admin
                </button>
                <ul className="space-y-2">
                    {admins.map((admin) => (
                        <li key={admin.id} className="flex justify-between items-center bg-gray-100 p-4 rounded">
                            <div>
                                <p>Name: {admin.user.username}</p>
                                <p>Email: {admin.user.email}</p>
                                <p>Level: {admin.admin_level}</p>
                            </div>
                            <div className="space-x-2">
                                <button 
                                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                    onClick={() => handleUpdate('admin', admin.id, { /* Add updated data */ })}
                                >
                                    Update
                                </button>
                                <button 
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    onClick={() => handleDelete('admin', admin.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default AdminPanel;
