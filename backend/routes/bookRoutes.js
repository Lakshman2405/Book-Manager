const express = require('express');
const router = express.Router();

const {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
} = require('../controllers/bookController');

// GET all books
router.get('/', getBooks);

// POST a new book
router.post('/', createBook);

// GET single book
router.get('/:id', getBook);

// PUT (update) a book
router.put('/:id', updateBook);

// DELETE a book
router.delete('/:id', deleteBook);

module.exports = router;