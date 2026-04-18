import React, { useState } from 'react';
import SearchBook from '../v1-no-router/SearchBook';
import SearchedBook from '../v1-no-router/SearchedBook';
import UpdateBookModal from '../v1-no-router/UpdateBookModal';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/books';

function SearchBookPage({ showAlert }) {
    const [searchedBook, setSearchedBook] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);

    const handleBookFound = (book) => {
        setSearchedBook(book);
        showAlert('Book found successfully', 'success');
    };

    const handleDeleteCopy = async (id) => {
        const confirmDelete = window.confirm("Delete one copy?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`${API_URL}/${id}/copy`);
            setSearchedBook(response.data.data);
            showAlert('One copy deleted successfully', 'success');
        } catch (err) {
            showAlert(err.response?.data?.message || 'Error deleting copy', 'error');
        }
    };

    const handleDeleteBook = async (id) => {
        if (window.confirm('Are you sure you want to delete this entire book?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setSearchedBook(null);
                showAlert('Book deleted successfully', 'success');
            } catch (err) {
                showAlert(err.response?.data?.message || 'Error deleting book', 'error');
            }
        }
    };

    const handleUpdate = async (updatedBook) => {
        try {
            const response = await axios.put(`${API_URL}/${updatedBook._id}`, updatedBook);
            setSearchedBook(response.data.data);
            setSelectedBook(null);
            showAlert('Book updated successfully', 'success');
        } catch (err) {
            showAlert(err.response?.data?.message || 'Error updating book', 'error');
        }
    };

    return (
        <div className="search-book-page">
            <SearchBook 
                onBookFound={handleBookFound} 
                showAlert={showAlert} 
            />
            
            {searchedBook && (
                <SearchedBook
                    book={searchedBook}
                    onUpdateClick={setSelectedBook}
                    onDeleteCopy={handleDeleteCopy}
                    onDeleteBook={handleDeleteBook}
                    onClose={() => setSearchedBook(null)}
                    onCopy={(msg) => showAlert(msg, 'success')}
                />
            )}
            
            {selectedBook && (
                <UpdateBookModal
                    book={selectedBook}
                    onUpdate={handleUpdate}
                    onClose={() => setSelectedBook(null)}
                />
            )}
        </div>
    );
}

export default SearchBookPage;