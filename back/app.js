// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Configure Express app
const app = express();

// Parse the request body of incoming HTTP requests
app.use(bodyParser.json());

// Sets access control headers to allow cross-origin sharing
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// Configure routes
const userRoutes = require('./routes/user'); // Imports user routes
const postRoutes = require('./routes/post'); // Imports post routes
const commentRoutes = require('./routes/comment'); // Imports comment route

// Register routes
app.use('/api/user', userRoutes);
app.use('/api/feed', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/images', express.static(path.join(__dirname, 'images'))); // Sets images folder where the file will be uploaded as static

module.exports = app;
