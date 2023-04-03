// Imports
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js'); // Allows authentication of application pages
const multer = require('../middleware/multer-config'); // Defines name and destination of image files
const postCtrl = require('../controllers/post');

// Define Post routes
router.get('/', auth, postCtrl.getAllPosts); // TODO: check endpoint
router.get('/:id', auth, postCtrl.getSinglePost);
router.post('/', auth, multer, postCtrl.createPost); // TODO: check endpoint
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.likePost); // TODO: check endpoint

// Export
module.exports = router;
