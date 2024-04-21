// app.js

const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

// Function to get the socket ID of the receiver
const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    // when user connect than it store {userId: socketId} in userSocketMap 
    if (userId != "undefined") userSocketMap[userId] = socket.id;
    // Listen for disconnection
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        // after disconnect
        delete userSocketMap[userId];
    });
});

module.exports = { app, io, server, getReceiverSocketId };
