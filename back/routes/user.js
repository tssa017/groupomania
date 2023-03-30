// Imports
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config'); // Middleware defines name and destination of image files
const userCtrl = require('../controllers/user');

// Define auth endpoints
router.post('/:id', userCtrl.signup); // TODO: check endpoint
router.post('/portal', userCtrl.login); // TODO: check endpoint
router.get('/portal', userCtrl.logout); // TODO: check endpoint

// Define general user endpoints
router.get('/:id', userCtrl.getAllUsers); // TODO: check endpoint
router.get('/:id', userCtrl.getSingleUser); // TODO: check endpoint
router.put('/:id', userCtrl.modifyUser); // TODO: check endpoint
router.delete('/:id', userCtrl.deleteUser); // TODO: check endpoint

// Define profile pic upload enpoint
router.post('/', auth, multer, userCtrl.uploadProfilePic); // TODO: fix this

// Export
module.exports = router;
