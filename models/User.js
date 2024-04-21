const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Remove leading/trailing whitespace
        minlength: 3, // Minimum length of the username
        maxlength: 20, // Maximum length of the username
    },
},
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
