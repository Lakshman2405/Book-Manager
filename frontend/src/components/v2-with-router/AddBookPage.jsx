import React from 'react';
import AddBook from '../v1-no-router/AddBook';
import { useNavigate } from 'react-router-dom';

function AddBookPage({ showAlert }) {
    const navigate = useNavigate();

    const handleBookAdded = (success, message) => {
        if (success) {
            showAlert(message, 'success');
            setTimeout(() => navigate('/books'), 1500);
        } else {
            showAlert(message, 'error');
        }
    };

    return (
        <div className="add-book-page">
            <h2>➕ Add New Book</h2>
            <AddBook onBookAdded={handleBookAdded} />
        </div>
    );
}

export default AddBookPage;