// This file contains all user related business logic
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const validator = require('validator');

// Sign up
module.exports.signup = async (req, res) => {
    if (!validator.isEmail(req.body.email)) {
        return res.status(400).json({ error: 'Invalid email address' }); // If email address is invalid, return error message, otherwise proceed
    }

    try {
        const hash = await bcrypt.hash(req.body.password, 10); // Call hash function and set salt value to 10

        // Create new user
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
        });

        // Save new user to database
        await user.save();
        res.status(201).json({
            message: 'User added successfully!',
        });
    } catch (error) {
        res.status(500).json({
            error: error,
        });
    }
};

const { validationResult } = require('express-validator');

// Login
module.exports.login = async (req, res) => {
    // Validate user input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ where: { email: req.body.email } }); // Verify email address exists in database

        if (!user) {
            return res.status(401).json({ error: 'User not found!' });
        }

        const isValidPassword = await bcrypt.compare(
            // Compares string with hash to check whether an entered password corresponds to a secure hash stored in the database
            req.body.password,
            user.password
        );

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Incorrect password!' });
        }

        const token = jwt.sign(
            // Generates token that contains userID, the signature secret string, and expiry time
            { userId: user.userId },
            process.env.RANDOM_TOKEN_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            userId: user.userId,
            token,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// User routes
// GET route that gets an array of all users from database
// exports.getAllUsers = (req, res) => {
//     User.findAll({
//         attributes: { exclude: ['password', 'email'] }, // Exclude sensitive information
//     })
//         .then((users) => {
//             res.status(200).json(users);
//         })
//         .catch((error) => {
//             res.status(400).json({
//                 error: error,
//             });
//         });
// };

module.exports.getSingleUser = async (req, res) => {
    try {
        const userId = req.params.userId; // Retrieve the user ID from the URL parameter
        console.log(userId);

        // Fetch data for the single user using the user ID
        const userData = await User.findOne({
            where: { userId: userId }, // Fetch data for the user with the given ID
        });

        // Check if user exists
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the user data as response
        res.json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// PUT route modifies a user object based on its ID
// exports.modifyUser = (req, res) => {
//     const userId = req.auth.userId; // Extracts ID of the authenticated user from the request object's auth property
//     // Extract first and last names from request body
//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     // Update the firstName and lastName fields for a user with the given userId
//     User.update({ firstName, lastName }, { where: { id: userId } })
//         .then((result) => {
//             // Check whether the update() method affected database. If result is 0, user was not found
//             if (result[0] === 0) {
//                 return res.status(404).json({ error: 'User not found.' });
//             }
//             return User.findByPk(userId).then((user) => {
//                 // Retrieve updated user object from database
//                 res.status(200).json({
//                     message: 'Profile successfully updated!',
//                     user,
//                 });
//             });
//         })
//         .catch((error) => {
//             res.status(400).json({
//                 error: error.message || 'Failed to update profile.',
//             });
//         });
// };

// DELETE route deletes an exisiting User object based on its ID
// exports.deleteUser = (req, res) => {
//     User.findOne({
//         where: { id: req.params.userId },
//         attributes: ['profilePic'],
//     })
//         .then((user) => {
//             if (!user) {
//                 return res.status(404).json({ error: 'User not found' });
//             }
//             const filename = user.profilePic.split('/images/')[1];
//             fs.unlink('images/' + filename, () => {
//                 // Deletes profile pic file from file system
//                 User.destroy({ where: { id: req.params.userId } })
//                     .then(() => {
//                         res.status(200).json({
//                             message: 'Deleted!',
//                         });
//                     })
//                     .catch((error) => {
//                         res.status(400).json({
//                             error: error,
//                         });
//                     });
//             });
//         })
//         .catch((error) => {
//             res.status(500).json({
//                 error: error,
//             });
//         });
// };

// // Upload route
// // POST route allows user to upload a profile picture
// // TODO: Set new image url for profile pic
// exports.uploadProfilePic = (req, res) => {
//     req.body.user = JSON.parse(req.body.user);
//     const userId = req.auth.userId;
//     const url = req.protocol + '://' + req.get('host');
//     const profilePic = req.file ? url + '/images/' + req.file.filename : '';
//     const update = req.file
//         ? {
//               ...JSON.parse(req.body.user),
//               profilePic: `${req.protocol}://${req.get('host')}/images/${
//                   req.file.filename
//               }`,
//           }
//         : { ...req.body };

//     User.findOne({
//         where: {
//             id: userId,
//         },
//     })
//         .then((user) => {
//             if (!user) {
//                 return res.status(404).json({ error: 'User not found.' });
//             }
//             user.update(update)
//                 .then(() => {
//                     res.status(200).json({
//                         message: 'Profile successfully updated!',
//                         user,
//                     });
//                 })
//                 .catch((error) => {
//                     res.status(400).json({
//                         error: error.message || 'Failed to update profile.',
//                     });
//                 });
//         })
//         .catch((error) => {
//             res.status(400).json({
//                 error: error.message || 'Failed to update profile.',
//             });
//         });
// };
