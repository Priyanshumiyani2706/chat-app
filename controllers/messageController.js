const Conversation = require('../models/Conversation')
const Message = require('../models/Message');
const User = require('../models/User');
const { io, getReceiverSocketId } = require('../socket/socket');

exports.sendMessage = async (req, res) => {
    try {
        //desstructrize the req.body 
        const { message, receiverId, senderId, name } = req.body;
        // if user send message in group than user in receiverId    
        let users = [...receiverId]
        //check if user is in recieverId array
        if (!users.includes(senderId)) {
            //if user is send message one to one than it will push user id in users variable
            users.push(senderId);
        }
        let conversation
        if (name) {
            // if user is send message in group than it will get by group name
            conversation = await Conversation.findOne({
                name: { $eq: name },
            });
        } else {
            // if user is send message to one person than it check participants
            conversation = await Conversation.findOne({
                participants: { $eq: users },
            });
        }
        // if conversion doesn' exist then it will be created
        if (!conversation) {
            conversation = await Conversation.create({
                participants: users
            });
        }
        // store message 
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });
        // add message if in conversation
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        // to update the conversation in receiver side
        for (const id of receiverId) {
            //check if receiver is connected 
            const receiverSocketId = getReceiverSocketId(id);
            if (receiverSocketId) {
                // if connected than it will send the message 
                io.to(receiverSocketId).emit("newMessage", newMessage)
            }
        }
        await Promise.all([conversation.save(), newMessage.save()]);
        // in response if message is in group than it will send name to get conversation with group name other wise it will pass the participants
        res.status(201).json({ [conversation.name ? "name" : "users"]: conversation.name ?? users });
    } catch (error) {
        console.log("Error:---> ", error.message);
        res.status(400).json({ error: error.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { users, name } = req.body;
        // users for get one to one conversation and name for get group conversation 
        let conversation;
        //get all messages in conversations using populate
        if (name) {
            conversation = await Conversation.findOne({ name: { $eq: name } }).populate("messages");
        } else {
            conversation = await Conversation.findOne({
                participants: { $all: users },
                $where: 'this.participants.length === ' + users.length
            }).populate("messages");
        }

        if (!conversation) return res.status(200).json([]);
        //only sending a messages
        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error :---> ", error.message);
        res.status(400).json({ error: "Internal server error" });
    }
};

exports.getGroupConversation = async (req, res) => {
    try {
        const { userId } = req.body;
        // getting all the conversations in which user connected
        const conversation = await Conversation.find({
            participants: { $elemMatch: { $eq: userId } },
        }).select("_id name participants");

        if (!conversation) return res.status(200).json([]);
        // to separate the connected people list and other user list
        let connectedPeople = [];
        for (const convo of conversation) {
            if (!convo.name && convo.participants.length === 2) {
                // if conversation is between 2 participants than it will get the receiver user
                const oppId = convo.participants.find((participant) => participant != userId);
                connectedPeople.push(oppId);
            }
        }

        res.status(200).json({ conversation, connectedPeople });
    } catch (error) {
        console.log("Error :---> ", error.message);
        res.status(400).json({ error: "Internal server error" });
    }
}

exports.createGroupConversation = async (req, res) => {
    try {
        const { users, name } = req.body;
        //create a new group conversation with name and participants
        const conversation = await Conversation.create({
            participants: users,
            name
        });
        //updateing all participants chat with new group conversation
        for (const id of users) {
            const receiverSocketId = getReceiverSocketId(id);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newChat")
            }
        }
        await conversation.save();
        res.status(200).json(conversation);
    } catch (error) {
        console.log("Error :---> ", error.message);
        res.status(400).json({ error: "Internal server error" });
    }
}