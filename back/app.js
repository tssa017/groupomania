// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Configure Express app
const app = express();
app.use(express.json());

// Configure middleware to parse request body of incoming HTTP requests
app.use(bodyParser.json()); // Allows me to access request body in req.body

// Sets access control headers to allow cross-origin sharing
app.use(
    cors({
        origin: ['http://localhost:3001', 'http://127.0.0.1:3000'],
        credentials: true,
    })
);

app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// Configure routes
const userRoutes = require('./routes/user'); // Imports user routes
const postRoutes = require('./routes/post'); // Imports post routes
const commentRoutes = require('./routes/comment'); // Imports comment route

// Register routes
app.use('/api', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/images', express.static(path.join(__dirname, 'images'))); // Sets images folder where the file will be uploaded as static

module.exports = app;
