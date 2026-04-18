import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/books';

function SearchBook({ onBookFound, showAlert }) {
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchId.trim()) {
      setError('Please enter a Book ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`${API_URL}/${searchId.trim()}`);
      onBookFound(response.data.data);

      // ✅ Global alert (success)
      if (showAlert) {
        showAlert('Book found successfully', 'success');
      }

      setSearchId('');
    } catch (err) {
      const msg = err.response?.data?.message || 'Book not found with this ID';
      setError(msg);

      // ✅ Global alert (error)
      if (showAlert) {
        showAlert(msg, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-book">
      <h2>🔍 Search Book by ID</h2>
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>
        Copy the <strong>ID</strong> from any book card and paste here
      </p>
      
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter Book ID (e.g. 67e8f3a2c9d8e4f5a6b7c8d9)"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search Book'}
        </button>
      </form>
      
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default SearchBook;