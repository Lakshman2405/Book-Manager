const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        unique: true,
        trim: true
    },
    publishedYear: {
        type: Number,
        min: [1000, 'Published year must be valid']
    },
    genre: {
        type: String,
        trim: true
    },
    available: {           // This is now the quantity/stock count
        type: Number,
        default: 1,
        min: [0, 'Available count cannot be negative']
    }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;