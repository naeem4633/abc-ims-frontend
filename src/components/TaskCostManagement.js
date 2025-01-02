import React, { useState, useEffect } from 'react';
import {
    getTaskCosts,
    createTaskCost,
    updateTaskCost,
    deleteTaskCost,
} from '../services/taskService';

const TaskCostManagement = () => {
    const [taskCosts, setTaskCosts] = useState([]);
    const [showTaskCostModal, setShowTaskCostModal] = useState(false);
    const [taskCostForm, setTaskCostForm] = useState({ id: null, name: '', cost: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTaskCosts = async () => {
            try {
                setTaskCosts(await getTaskCosts());
            } catch (err) {
                setError('Error fetching task costs');
            }
        };

        fetchTaskCosts();
    }, []);

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

    return (
        <div className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => setShowTaskCostModal(true)}
            >
                Add Task Cost
            </button>
            <ul className="space-y-4">
                {taskCosts.map((taskCost) => (
                    <li
                        key={taskCost.id}
                        className="flex justify-between items-center bg-gray-100 p-4 rounded"
                    >
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
            {showTaskCostModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">
                            {taskCostForm.id ? 'Edit Task Cost' : 'Add Task Cost'}
                        </h2>
                        <div className="mb-4">
                            <label className="block font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={taskCostForm.name}
                                onChange={handleTaskCostChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium">Cost</label>
                            <input
                                type="number"
                                name="cost"
                                value={taskCostForm.cost}
                                onChange={handleTaskCostChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowTaskCostModal(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveTaskCost}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskCostManagement;