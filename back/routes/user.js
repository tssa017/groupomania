const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config');
const userCtrl = require('../controllers/user');

// Define auth endpoints
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Define general user endpoints
// router.get('/:id', userCtrl.getAllUsers); // TODO: check endpoint, maybe I don't need this?
router.get('/:userId', userCtrl.getSingleUser);
// router.put('/:id', userCtrl.modifyUser); // TODO: check endpoint
// router.delete('/:id', userCtrl.deleteUser); // TODO: check endpoint

// // Define profile pic upload endpoint
router.post('/:userId', multer, userCtrl.uploadProfilePic); // TODO: fix this

// Export
module.exports = router;
