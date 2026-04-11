const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middleware/errorhandler');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors()); // Enable CORS for React
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/books', bookRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});