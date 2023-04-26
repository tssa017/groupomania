// Imports
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const userCtrl = require('../controllers/user');

// Define auth endpoints
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Define general user endpoints
router.get('/:userId', userCtrl.getSingleUser);
router.delete('/:userId', userCtrl.deleteUser);

// Define profile pic upload endpoint
router.post('/:userId', multer, userCtrl.modifyProfile);

// Export
module.exports = router;
