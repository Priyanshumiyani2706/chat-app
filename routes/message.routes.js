const express = require("express");
const messageController = require("../controllers/messageController.js");

const router = express.Router();
//To get messages
router.post("/", messageController.getMessages);
//To store user messages
router.post("/send", messageController.sendMessage);
//To get user conversation
router.post("/getConvo", messageController.getGroupConversation);
//Create group conversation
router.post("/createConvo", messageController.createGroupConversation);
module.exports = router;
