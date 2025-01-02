import React, { useState } from 'react';

const UserManagement = ({ users, type, onRowClick }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter users based on the search query
    const filteredUsers = users.filter((user) => {
        const fullName = `${user.user_detail?.first_name || ''} ${user.user_detail?.last_name || ''}`.toLowerCase();
        const email = user.user_detail?.email?.toLowerCase() || '';
        const abcNumber = user.user_detail?.abc_number?.toLowerCase() || '';
        return (
            fullName.includes(searchQuery.toLowerCase()) ||
            email.includes(searchQuery.toLowerCase()) ||
            abcNumber.includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder={`Search ${type}s...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            {/* User List */}
            {filteredUsers.length > 0 ? (
                <div className="space-y-2">
                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            className="flex justify-between items-center bg-gray-100 p-4 rounded cursor-pointer hover:bg-gray-200"
                            onClick={() => onRowClick(user.id, type.toLowerCase())}
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
            ) : (
                <p className="text-gray-500">No {type.toLowerCase()}s found.</p>
            )}
        </div>
    );
};

export default UserManagement;
