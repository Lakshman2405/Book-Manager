import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/books';

function AddBook({ onBookUpdated }) {     // Changed prop name for clarity
  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
    publishedYear: '',
    genre: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!book.isbn.trim()) return;

    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(API_URL, book);
      
      setMessage(response.data.message);
      
      // Refresh the book list with updated data
      onBookUpdated(response.data.data);

    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-book">
      <h2>Add Book / Increase Stock</h2>
      
      {message && <div className="success">{message}</div>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Book Title *" value={book.title} onChange={handleChange} required />
        <input type="text" name="author" placeholder="Author *" value={book.author} onChange={handleChange} required />
        <input type="text" name="isbn" placeholder="ISBN *" value={book.isbn} onChange={handleChange} required />
        <input type="number" name="publishedYear" placeholder="Published Year" value={book.publishedYear} onChange={handleChange} />
        <input type="text" name="genre" placeholder="Genre" value={book.genre} onChange={handleChange} />

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Add / Increase Stock'}
        </button>
      </form>
    </div>
  );
}

export default AddBook;