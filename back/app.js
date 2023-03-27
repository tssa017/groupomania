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

// Connect to MySQL database
// const { Sequelize } = require('sequelize');
// const mysql = require('mysql2/promise');

// const sequelize = new Sequelize('mydatabase', 'myusername', 'mypassword', {
//     dialect: 'mysql',
//     dialectModule: mysql,
//     host: 'localhost',
// });

// try {
//     await sequelize.authenticate(); // Function tests connection
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

// Sets access control headers to allow cross-origin sharing
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// Configure routes
const userRoutes = require('./routes/user'); // Imports user route
const publicationRoutes = require('./routes/publication'); // Imports publication route
const commentRoutes = require('./routes/comment'); // Imports comment route

// Register routes
// app.use('/api/user', userRoutes);
// app.use('/api/publication', publicationRoutes);
// app.use('/api/comment', commentRoutes);
// app.use('/images', express.static(path.join(__dirname, 'images'))); // Sets images folder where the file will be uploaded as static

module.exports = app;
