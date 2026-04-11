import React from 'react';

function BookCard({ book, onUpdateClick, onDeleteCopy, onDeleteBook }) {

  const copyToClipboard = () => {
    navigator.clipboard.writeText(book._id);
    alert(`✅ Copied ID: ${book._id}`);
  };

  return (
    <div className="book-card">
      <div className="book-info">
        <div className="id-row">
          <p className="book-id"><strong>ID:</strong> {book._id}</p>
          <button className="copy-btn" onClick={copyToClipboard}>📋 Copy</button>
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
        <button className="update-btn" onClick={() => onUpdateClick(book)}>
          Update
        </button>
        
        {/* Two Delete Buttons */}
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