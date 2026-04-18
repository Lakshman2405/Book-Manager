import React, { useState, useEffect } from 'react';
import { Container, Alert, Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import TaskCard from './TaskCard';
import AddTask from './AddTask';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:5000/api/tasks';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [alert, setAlert] = useState(null);

    const showAlert = (message, variant) => {
        setAlert({ message, variant });
        setTimeout(() => setAlert(null), 3000);
    };

    const fetchTasks = async () => {
        try {
            const response = await axios.get(API_URL);
            setTasks(response.data.data);
        } catch (err) {
            setError('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleTaskAdded = (newTask) => {
        setTasks([newTask, ...tasks]);
        showAlert('Task added successfully!', 'success');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setTasks(tasks.filter(task => task._id !== id));
                showAlert('Task deleted successfully!', 'success');
            } catch (err) {
                showAlert('Error deleting task', 'danger');
            }
        }
    };

    const handleUpdateClick = (task) => {
        setSelectedTask(task);
        setShowUpdateModal(true);
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`${API_URL}/${selectedTask._id}`, selectedTask);
            setTasks(tasks.map(task => task._id === selectedTask._id ? response.data.data : task));
            setShowUpdateModal(false);
            showAlert('Task updated successfully!', 'success');
        } catch (err) {
            showAlert('Error updating task', 'danger');
        }
    };

    if (loading) return <div className="text-center py-5">Loading tasks...</div>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container className="py-4">
            {alert && <Alert variant={alert.variant} dismissible onClose={() => setAlert(null)}>{alert.message}</Alert>}
            
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>📋 Task Manager</h1>
                <AddTask onTaskAdded={handleTaskAdded} />
            </div>

            {tasks.length === 0 ? (
                <Alert variant="info">No tasks yet. Click "Add New Task" to create one!</Alert>
            ) : (
                tasks.map(task => (
                    <TaskCard 
                        key={task._id} 
                        task={task} 
                        onUpdate={handleUpdateClick} 
                        onDelete={handleDelete} 
                    />
                ))
            )}

            {/* Update Modal */}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedTask && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedTask.title}
                                    onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={selectedTask.description || ''}
                                    onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    value={selectedTask.status}
                                    onChange={(e) => setSelectedTask({ ...selectedTask, status: e.target.value })}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Priority</Form.Label>
                                <Form.Select
                                    value={selectedTask.priority}
                                    onChange={(e) => setSelectedTask({ ...selectedTask, priority: e.target.value })}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Due Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={selectedTask.dueDate ? selectedTask.dueDate.split('T')[0] : ''}
                                    onChange={(e) => setSelectedTask({ ...selectedTask, dueDate: e.target.value })}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default TaskList;