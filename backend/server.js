const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middleware/errorhandler');

// ✅ IMPORTANT: Load .env FIRST
dotenv.config();

// ✅ Check if .env loaded correctly
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/books', bookRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📚 API: http://localhost:${PORT}/api/books`);
});