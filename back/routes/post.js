// Imports
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js'); // Allows authentication of application pages
const multer = require('../middleware/multer-config'); // Defines name and destination of image files
const postCtrl = require('../controllers/post');

// Define Post routes
router.get('/posts/:userId', auth, postCtrl.getAllPosts);
router.get('/posts/:id', auth, postCtrl.getSinglePost);
router.post('/posts/:userId', auth, multer, postCtrl.createPost);
router.post('/edit-post/:id', multer, postCtrl.modifyPost);
router.delete('/posts/:id', postCtrl.deletePost);
// router.post('/:id/like', auth, postCtrl.likePost); // TODO: check endpoint

// Export
module.exports = router;
