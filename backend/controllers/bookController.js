const Book = require('../models/Book');

// @desc    Get all books
const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single book
const getBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, data: book });
    } catch (error) {
        next(error);
    }
};

// @desc    Add book → If ISBN exists, increase available count. Else create new.
const createBook = async (req, res, next) => {
    try {
        const { isbn, ...rest } = req.body;

        // Check if book with same ISBN already exists
        const existingBook = await Book.findOne({ isbn: isbn.trim() });

        if (existingBook) {
            // Increase available count (no new book created)
            existingBook.available += 1;
            const updatedBook = await existingBook.save();

            return res.status(200).json({
                success: true,
                message: `Stock increased. Now ${updatedBook.available} copies available.`,
                data: updatedBook
            });
        }

        // Create new book if ISBN doesn't exist
        const newBook = await Book.create({
            ...rest,
            isbn: isbn.trim(),
            available: 1
        });

        res.status(201).json({
            success: true,
            message: 'New book added successfully',
            data: newBook
        });

    } catch (error) {
        next(error);
    }
};

// @desc    Update book
const updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        res.status(200).json({ success: true, data: book });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete book
const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        res.status(200).json({ success: true, message: 'Book deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
};