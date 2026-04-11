import React, { useState, useEffect } from 'react';

function UpdateBookModal({ book, onUpdate, onClose }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (book) {
      setFormData({ ...book });   // Spread the entire book object (including _id)
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData._id) {
      alert("Book ID is missing!");
      return;
    }
    onUpdate(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Update Book</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Book Title *"
            value={formData.title || ''}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author *"
            value={formData.author || ''}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="isbn"
            placeholder="ISBN *"
            value={formData.isbn || ''}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="publishedYear"
            placeholder="Published Year"
            value={formData.publishedYear || ''}
            onChange={handleChange}
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={formData.genre || ''}
            onChange={handleChange}
          />
          <input
            type="number"
            name="available"
            placeholder="Available Copies"
            value={formData.available || 1}
            onChange={handleChange}
            min="0"
          />

          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateBookModal;