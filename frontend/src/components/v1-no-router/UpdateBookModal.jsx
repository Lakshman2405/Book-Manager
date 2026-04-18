import React, { useState, useEffect } from 'react';

function UpdateBookModal({ book, onUpdate, onClose }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [genre, setGenre] = useState('');
    const [available, setAvailable] = useState(1);

    useEffect(() => {
        if (book) {
            setTitle(book.title || '');
            setAuthor(book.author || '');
            setIsbn(book.isbn || '');
            setPublishedYear(book.publishedYear || '');
            setGenre(book.genre || '');
            setAvailable(book.available ?? 1);
        }
    }, [book]);

    const handleSubmit = (e) => {
        e.preventDefault();

        onUpdate({
            _id: book._id,
            title,
            author,
            isbn,
            publishedYear,
            genre,
            available: Number(available)
        });
    };

    if (!book) return null;

    return (
        <div className="update-modal-overlay" onClick={onClose}>
            <div className="update-modal" onClick={(e) => e.stopPropagation()}>
                <h2>Update Book</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="ISBN"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        required
                    />

                    <input
                        type="number"
                        placeholder="Published Year"
                        value={publishedYear}
                        onChange={(e) => setPublishedYear(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Available Copies"
                        value={available}
                        onChange={(e) => setAvailable(e.target.value)}
                        min="0"
                    />

                    <div className="update-modal-buttons">
                        <button
                            type="button"
                            onClick={onClose}
                            className="update-modal-cancel"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="update-modal-save"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateBookModal;