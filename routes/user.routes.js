const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register a new user
router.post('/register', userController.register);
//Get user with name 
router.post('/getUser', userController.getUserByUsername);
//Get all the users 
router.post('/getAllUser', userController.getAllUsers);
module.exports = router;
