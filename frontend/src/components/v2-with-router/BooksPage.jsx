import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../v1-no-router/BookCard';
import UpdateBookModal from '../v1-no-router/UpdateBookModal';

const API_URL = 'http://localhost:5000/api/books';

function BooksPage({ showAlert }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(API_URL);
            setBooks(response.data.data);
        } catch (err) {
            setError('Failed to fetch books');
            showAlert('Failed to fetch books', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDeleteCopy = async (id) => {
        const confirmDelete = window.confirm("Delete one copy?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`${API_URL}/${id}/copy`);
            setBooks(books.map(book => book._id === id ? response.data.data : book));
            showAlert('One copy deleted successfully', 'success');
        } catch (err) {
            showAlert(err.response?.data?.message || 'Error deleting copy', 'error');
        }
    };

    const handleDeleteBook = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this entire book?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${API_URL}/${id}`);
            setBooks(books.filter(book => book._id !== id));
            showAlert('Book deleted successfully', 'success');
        } catch (err) {
            showAlert(err.response?.data?.message || 'Error deleting book', 'error');
        }
    };

    const handleUpdate = async (updatedBook) => {
        try {
            const response = await axios.put(`${API_URL}/${updatedBook._id}`, updatedBook);
            setBooks(books.map(book => book._id === updatedBook._id ? response.data.data : book));
            setSelectedBook(null);
            showAlert('Book updated successfully', 'success');
        } catch (err) {
            showAlert(err.response?.data?.message || 'Error updating book', 'error');
        }
    };

    if (loading) return <div className="loading">Loading books...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <>
            <div className="book-list-section">
                <h2>All Books ({books.length})</h2>

                {books.length === 0 ? (
                    <div className="empty-state">
                        <p>No books found. Add your first book!</p>
                    </div>
                ) : (
                    <div className="books-grid">
                        {books.map(book => (
                            <BookCard
                                key={book._id}
                                book={book}
                                onUpdateClick={setSelectedBook}
                                onDeleteCopy={handleDeleteCopy}
                                onDeleteBook={handleDeleteBook}
                                onCopy={(msg) => showAlert(msg, 'success')}
                            />
                        ))}
                    </div>
                )}
            </div>

            {selectedBook && (
                <UpdateBookModal
                    book={selectedBook}
                    onUpdate={handleUpdate}
                    onClose={() => setSelectedBook(null)}
                />
            )}
        </>
    );
}

export default BooksPage;