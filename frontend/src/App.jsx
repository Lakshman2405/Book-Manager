import React, { useState } from 'react';
import axios from 'axios';
import AddBook from './components/AddBook';
import SearchBook from './components/SearchBook';
import BookCard from './components/BookCard';
import SearchedBook from './components/SearchedBook';
import UpdateBookModal from './components/UpdateBookModal';
import './App.css';

const API_URL = 'http://localhost:5000/api/books';

function App() {
  const [books, setBooks] = useState([]);
  const [showBooks, setShowBooks] = useState(false);
  const [searchedBook, setSearchedBook] = useState(null);
  const [selectedBookForUpdate, setSelectedBookForUpdate] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Show All Books
  const handleShowAllBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(API_URL);
      setBooks(res.data.data || []);
      setShowBooks(true);
    } catch (err) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  // Search Book
  const handleBookFound = (foundBook) => {
    setSearchedBook(foundBook);
  };

  // Open Update Modal
  const handleUpdateClick = (book) => {
    setSelectedBookForUpdate(book);
    setShowUpdateModal(true);
  };

// Perform Update from Modal
const handleUpdate = async (updatedData) => {
  try {
    // Make sure we have the correct _id
    const bookId = updatedData._id || selectedBookForUpdate._id;

    if (!bookId) {
      alert("Error: Book ID is missing!");
      return;
    }

    const res = await axios.put(`${API_URL}/${bookId}`, updatedData);
    const updatedBook = res.data.data;

    alert('✅ Book updated successfully!');

    // Update searched book if visible
    if (searchedBook && searchedBook._id === bookId) {
      setSearchedBook(updatedBook);
    }

    // Update all books list
    setBooks(prev => prev.map(b => b._id === bookId ? updatedBook : b));

    setShowUpdateModal(false);
    setSelectedBookForUpdate(null);
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || 'Failed to update book');
  }
};

  // Delete One Copy
  const handleDeleteCopy = async (id) => {
    if (!window.confirm('Delete 1 copy of this book?')) return;

    try {
      const currentBook = searchedBook && searchedBook._id === id 
        ? searchedBook 
        : books.find(b => b._id === id);

      const res = await axios.put(`${API_URL}/${id}`, { 
        available: currentBook.available - 1 
      });

      const updatedBook = res.data.data;

      if (searchedBook && searchedBook._id === id) setSearchedBook(updatedBook);
      setBooks(prev => prev.map(b => b._id === id ? updatedBook : b));

      alert('✅ One copy deleted successfully');
    } catch (err) {
      alert('Failed to delete copy');
    }
  };

  // Delete Entire Book
  const handleDeleteBook = async (id) => {
    if (!window.confirm('Delete the entire book permanently?')) return;

    try {
      await axios.delete(`${API_URL}/${id}`);

      if (searchedBook && searchedBook._id === id) setSearchedBook(null);
      setBooks(prev => prev.filter(b => b._id !== id));

      alert('✅ Entire book deleted successfully');
    } catch (err) {
      alert('Failed to delete book');
    }
  };

  // Handle stock increase from AddBook
  const handleBookUpdated = (updatedBook) => {
    setBooks(prev => {
      const index = prev.findIndex(b => b._id === updatedBook._id);
      if (index !== -1) {
        const newList = [...prev];
        newList[index] = updatedBook;
        return newList;
      }
      return [updatedBook, ...prev];
    });
    if (!showBooks) setShowBooks(true);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>📚 Book Collection Manager</h1>

        <div className="action-buttons">
          <button onClick={handleShowAllBooks} className="btn-primary">
            Show All Books
          </button>
          <button onClick={() => setShowBooks(false)} className="btn-secondary">
            Hide All Books
          </button>
        </div>

        <div className="main-grid">
          <div className="sidebar">
            <AddBook onBookUpdated={handleBookUpdated} />
            <SearchBook onBookFound={handleBookFound} />
          </div>

          <div className="book-list-section">
            {/* Searched Book */}
            {searchedBook && (
              <SearchedBook 
                book={searchedBook}
                onUpdateClick={handleUpdateClick}
                onDeleteCopy={handleDeleteCopy}
                onDeleteBook={handleDeleteBook}
                onClose={() => setSearchedBook(null)}
              />
            )}

            {/* All Books */}
            {showBooks && (
              <>
                <h2>All Books ({books.length})</h2>
                {error && <div className="error">{error}</div>}

                {loading ? (
                  <div className="loading">Loading books...</div>
                ) : (
                  <div className="books-grid">
                    {books.length === 0 ? (
                      <p>No books found.</p>
                    ) : (
                      books.map((book) => (
                        <BookCard
                          key={book._id}
                          book={book}
                          onUpdateClick={handleUpdateClick}
                          onDeleteCopy={handleDeleteCopy}
                          onDeleteBook={handleDeleteBook}
                        />
                      ))
                    )}
                  </div>
                )}
              </>
            )}

            {!showBooks && !searchedBook && (
              <div className="empty-state">
                <p>Click "Show All Books" or search a book by ID</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Update Modal */}
      {showUpdateModal && selectedBookForUpdate && (
        <UpdateBookModal
          book={selectedBookForUpdate}
          onUpdate={handleUpdate}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </div>
  );
}

export default App;