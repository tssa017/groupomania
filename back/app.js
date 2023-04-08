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

// Parse the request body of incoming HTTP requests
app.use(bodyParser.json()); // TODO: Check

// Parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Sets access control headers to allow cross-origin sharing
app.use(
    cors({
        origin: ['http://localhost:3001', 'http://127.0.0.1:3000'], // TODO: Change?
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
app.use('/api', postRoutes);
app.use('/api', commentRoutes);
app.use('/images', express.static(path.join(__dirname, 'images'))); // Sets images folder where the file will be uploaded as static

module.exports = app;
