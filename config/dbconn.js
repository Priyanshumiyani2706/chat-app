const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.log('Error connecting to MongoDB:', err.message);
    }
};

module.exports = connectDB;
