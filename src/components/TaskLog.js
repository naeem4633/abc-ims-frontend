import React, { useState, useEffect } from 'react';
import { getTasks, deleteTask } from '../services/taskService'
import { useNavigate } from 'react-router-dom';

const TaskLog = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks();
                setTasks(data);
            } catch (err) {
                setError('Error fetching tasks');
            }
        };

        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setTasks((prev) => prev.filter((task) => task.id !== id));
        } catch (err) {
            setError('Error deleting task');
        }
    };

    const handleViewDetails = (id) => {
        navigate(`/task-details/${id}`);
    };

    return (
        <div className="w-full p-6 space-y-6">
            {error && <p className="text-red-500">{error}</p>}
            <h1 className="text-2xl font-bold mb-4">Task Log</h1>
            <ul className="space-y-4">
                {tasks.map((task) => (
                    <li key={task.id} className="flex justify-between items-center bg-gray-100 p-4 rounded shadow">
                        <div>
                            <p><strong>Task ID:</strong> {task.id || 'Unknown'}</p>
                            <p><strong>Performed By ID:</strong> {task.performed_by || 'Unknown'}</p>
                            <p><strong>Timestamp:</strong> {new Date(task.timestamp).toLocaleString()}</p>
                        </div>
                        <div className="space-x-2">
                            <button
                                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                onClick={() => handleViewDetails(task.id)}
                            >
                                View Details
                            </button>
                            <button
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                onClick={() => handleDelete(task.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskLog;
