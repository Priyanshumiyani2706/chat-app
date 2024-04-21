const express = require('express');
const connectDB = require('./config/dbconn');
const userRoute = require('./routes/user.routes');
const messageRoutes = require("./routes/message.routes.js");
require('dotenv').config()
var cors = require('cors');
const { app, server } = require('./socket/socket');
const path = require('path');

// Connect to Database
connectDB();


app.use(cors())
app.use(express.json());

// Define routes
app.use('/user', userRoute);
app.use("/messages", messageRoutes);

app.use(express.static(path.join(__dirname, './Frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Frontend/build', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
