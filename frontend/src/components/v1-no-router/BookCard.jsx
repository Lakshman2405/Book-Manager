import React from 'react';

function BookCard({ book, onUpdateClick, onDeleteCopy, onDeleteBook, onCopy }) {
    const [copied, setCopied] = React.useState(false);
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText(book._id);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);

        if (onCopy) {
            onCopy('ID copied to clipboard!');
        }
    };

    return (
        <div className="book-card">
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
                <p><strong>Year:</strong> {book.publishedYear || 'N/A'}</p>
                <p><strong>Genre:</strong> {book.genre || 'N/A'}</p>
                
                <p className="stock">
                    <strong>Available Copies:</strong> 
                    <span className="stock-count"> {book.available}</span>
                </p>
            </div>

            <div className="book-actions">
                <button 
                    className="update-btn" 
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onUpdateClick(book);
                    }}
                >
                    Update
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
    );
}

export default BookCard;