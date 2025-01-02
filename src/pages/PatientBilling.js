import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientBilling = () => {
    const [billingDetails, setBillingDetails] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBillingDetails = async () => {
            const loggedInUser = JSON.parse(localStorage.getItem('user'));
            if (!loggedInUser || loggedInUser.user_detail.role !== 'Patient') {
                setError('Unauthorized access. Only patients can view billing details.');
                return;
            }

            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks-and-billing/billing-details/${loggedInUser.id}/`);
                setBillingDetails(response.data);
                console.log("response", response.data);
            } catch (err) {
                setError('Error fetching billing details. Please try again later.');
            }
        };

        fetchBillingDetails();
    }, []);

    if (error) {
        return <div className="p-6 text-red-500">{error}</div>;
    }

    if (!billingDetails) {
        return <div className="p-6">Loading billing details...</div>;
    }

    const { tasks = [], total_cost = 0 } = billingDetails;

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold mb-4">Billing Summary</h1>

            {/* Total Cost */}
            <div className="bg-gray-100 p-4 rounded shadow">
                <p className="text-lg font-semibold">
                    Total Cost: <span className="text-blue-500">${total_cost.toFixed(2)}</span>
                </p>
            </div>

            {/* Task List */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold">Services/Procedures</h2>
                {tasks.length === 0 ? (
                    <p className="text-gray-500">No services found.</p>
                ) : (
                    <ul className="space-y-4">
                        {tasks.map((task) => {
                            // Extract the first word of the service/procedure name
                            const serviceName = task.task_cost?.name?.split(' ')[0] || 'N/A';
                            return (
                                <li key={task.id} className="bg-white shadow p-4 rounded">
                                    <p>
                                        <strong>Service/Procedure:</strong> {serviceName}
                                    </p>
                                    <p>
                                        <strong>Service Cost:</strong> ${task.task_cost?.cost?.toFixed(2) || '0.00'}
                                    </p>
                                    <p>
                                        <strong>Performed By:</strong> {task.performed_by?.name || 'N/A'}
                                    </p>
                                    <p>
                                        <strong>Date and Time:</strong> {new Date(task.timestamp).toLocaleString()}
                                    </p>
                                    {task.linked_image && (
                                        <p>
                                            <strong>Associated Image:</strong>{' '}
                                            <a
                                                href={task.linked_image.image_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline"
                                            >
                                                View Image
                                            </a>
                                        </p>
                                    )}
                                    {task.linked_diagnosis && (
                                        <p>
                                            <strong>Related Diagnosis:</strong> {task.linked_diagnosis?.name || 'N/A'}
                                        </p>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default PatientBilling;
