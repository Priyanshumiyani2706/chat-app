const User = require('../models/User');

// Register a new user
exports.register = async (req, res) => {
    const { username } = req.body;

    try {
        //find the user with username
        let user = await User.findOne({ username });
        // if user doesn't exists than it will be created 
        if (!user) {
            user = await User.create({ username });
        }
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    const { userId } = req.body;
    try {   
        // get all users without logged in user
        const users = await User.find({ _id: { $ne: userId } });
        if (!users) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(users);
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getUserByUsername = async (req, res) => {
    const { name } = req.body;
    try {
        // find the user with user name 
        const user = await User.findOne({ username: name });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
