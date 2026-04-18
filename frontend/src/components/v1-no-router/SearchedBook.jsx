import React, { useState } from 'react';

function SearchedBook({ book, onUpdateClick, onDeleteCopy, onDeleteBook, onClose, onCopy }) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(book._id);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);

        if (onCopy) {
            onCopy('ID copied to clipboard!');
        }
    };

    if (!book) return null;

    return (
        <div className="searched-book">
            <div className="searched-header">
                <h2>🔍 Searched Book</h2>
                <button className="close-btn" onClick={onClose}>✕ Close</button>
            </div>

            <div className="book-card searched-card">
                <div className="book-info">
                    <div className="id-row">
                        <p className="book-id">
                            <strong>ID:</strong> {book._id}
                            {copied && (
                                <span style={{ color: '#22c55e', marginLeft: '8px' }}>
                                    ✓
                                </span>
                            )}
                        </p>
                        <button className="copy-btn" onClick={copyToClipboard}>
                            📋 Copy
                        </button>
                    </div>

                    <h3>{book.title}</h3>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>ISBN:</strong> {book.isbn}</p>
                    <p><strong>Published Year:</strong> {book.publishedYear || 'N/A'}</p>
                    <p><strong>Genre:</strong> {book.genre || 'N/A'}</p>
                    
                    <p className="stock">
                        <strong>Available Copies:</strong> 
                        <span className="stock-count"> {book.available}</span>
                    </p>
                </div>

                <div className="book-actions">
                    <button className="update-btn" onClick={() => onUpdateClick(book)}>
                        Update Book
                    </button>
                    
                    <button 
                        className="delete-copy-btn"
                        onClick={() => onDeleteCopy(book._id)}
                        disabled={book.available <= 1}
                    >
                        Delete Copy
                    </button>

                    <button 
                        className="delete-book-btn"
                        onClick={() => onDeleteBook(book._id)}
                    >
                        Delete Entire Book
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SearchedBook;