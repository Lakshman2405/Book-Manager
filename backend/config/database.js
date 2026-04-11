const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // ✅ Make sure MONGODB_URI is available
        const mongoURI = process.env.MONGODB_URI;
        
        if (!mongoURI) {
            console.error('❌ MONGODB_URI is not defined in .env file');
            process.exit(1);
        }
        
        console.log('Connecting to MongoDB...');
        const conn = await mongoose.connect(mongoURI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;