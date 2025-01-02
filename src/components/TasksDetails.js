import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTaskDetails } from '../services/taskService';

const TaskDetails = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const data = await getTaskDetails(id);
                setTask(data);
            } catch (err) {
                setError('Error fetching task details');
            }
        };

        fetchTaskDetails();
    }, [id]);

    if (error) return <p className="text-red-500">{error}</p>;

    if (!task) return <p>Loading task details...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Task Details</h1>
            <p><strong>Task Name:</strong> {task.task_cost.name}</p>
            <p><strong>Cost:</strong> ${task.task_cost.cost}</p>
            <p><strong>Performed By:</strong> {task.performed_by.name}</p>
            <p><strong>Patient:</strong> {task.patient.name}</p>
            {task.linked_image && (
                <div className="mt-4">
                    <p><strong>Linked Image:</strong></p>
                    <img
                        src={task.linked_image.image_url}
                        alt="Linked Task"
                        className="w-64 h-64 object-cover rounded shadow"
                    />
                </div>
            )}
            {task.linked_diagnosis && (
                <p><strong>Linked Diagnosis:</strong> {task.linked_diagnosis.name}</p>
            )}
            <p><strong>Timestamp:</strong> {new Date(task.timestamp).toLocaleString()}</p>
        </div>
    );
};

export default TaskDetails;
