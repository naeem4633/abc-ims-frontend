import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [editableData, setEditableData] = useState({
        first_name: '',
        last_name: '',
        address: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Fetch the user object from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        setUserData(user);

        // Set editable fields
        setEditableData({
            first_name: user?.user_detail.first_name || '',
            last_name: user?.user_detail.last_name || '',
            address: user?.address || '',
            phone: user?.phone || '',
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        if (!userData) return;

        setLoading(true);
        setError('');
        setSuccess('');

        // Determine the endpoint based on the user's role
        const role = userData.user_detail.role.toLowerCase();
        const updateUrl = `${process.env.REACT_APP_BACKEND_URL}/users/${role}s/${userData.id}/`;

        try {
            const response = await axios.patch(updateUrl, editableData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Update local storage with the new data
            const updatedUser = {
                ...userData,
                ...response.data,
                user_detail: { ...userData.user_detail, ...response.data.user_detail },
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            // Update the state
            setUserData(updatedUser);
            setSuccess('Profile updated successfully.');
            console.log('Updated User Profile:', updatedUser);
        } catch (err) {
            setError('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!userData) return <div>Loading...</div>;

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">User Profile</h1>
            <div className="mb-4">
                <label className="block font-medium">Email (Static):</label>
                <p className="text-gray-600">{userData.user_detail.email}</p>
            </div>
            <div className="mb-4">
                <label className="block font-medium">ABC Number (Static):</label>
                <p className="text-gray-600">{userData.user_detail.abc_number}</p>
            </div>
            <div className="mb-4">
                <label className="block font-medium">Date of Birth (Static):</label>
                <p className="text-gray-600">{userData.user_detail.date_of_birth || 'Not Provided'}</p>
            </div>
            <div className="mb-4">
                <label className="block font-medium">First Name:</label>
                <input
                    type="text"
                    name="first_name"
                    value={editableData.first_name}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block font-medium">Last Name:</label>
                <input
                    type="text"
                    name="last_name"
                    value={editableData.last_name}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block font-medium">Address:</label>
                <input
                    type="text"
                    name="address"
                    value={editableData.address}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block font-medium">Phone:</label>
                <input
                    type="text"
                    name="phone"
                    value={editableData.phone}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <button
                onClick={handleUpdate}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                {loading ? 'Updating...' : 'Update Profile'}
            </button>
        </div>
    );
};

export default UserProfile;
