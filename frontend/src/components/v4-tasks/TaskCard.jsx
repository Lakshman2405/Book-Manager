import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

function TaskCard({ task, onUpdate, onDelete }) {
    const getStatusBadge = (status) => {
        const variants = {
            pending: 'warning',
            'in-progress': 'info',
            completed: 'success'
        };
        return <Badge bg={variants[status]}>{status}</Badge>;
    };

    const getPriorityBadge = (priority) => {
        const variants = {
            low: 'secondary',
            medium: 'primary',
            high: 'danger'
        };
        return <Badge bg={variants[priority]}>{priority}</Badge>;
    };

    return (
        <Card className="mb-3 shadow-sm">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                    <div>
                        <Card.Title>{task.title}</Card.Title>
                        {task.description && (
                            <Card.Text className="text-muted">{task.description}</Card.Text>
                        )}
                        <div className="mt-2">
                            {getStatusBadge(task.status)} {getPriorityBadge(task.priority)}
                            {task.dueDate && (
                                <small className="text-muted ms-2">
                                    Due: {new Date(task.dueDate).toLocaleDateString()}
                                </small>
                            )}
                        </div>
                    </div>
                    <div>
                        <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="me-2"
                            onClick={() => onUpdate(task)}
                        >
                            Edit
                        </Button>
                        <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => onDelete(task._id)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default TaskCard;