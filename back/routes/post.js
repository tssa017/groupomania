// Imports
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js'); // Allows authentication of application pages
const multer = require('../middleware/multer-config'); // Defines name and destination of image files
const postCtrl = require('../controllers/post');

// Define Post routes
router.get('/:userId', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getSinglePost);
router.post('/:userId', auth, multer, postCtrl.createPost);
router.put('/:id', multer, postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);
router.get('/:id/get-likes', auth, postCtrl.getLikes);
router.put('/:id/likes', auth, postCtrl.likePost);
router.put('/:id/read', postCtrl.updateReadStatus); // Updates 'read' field of a post

// Export
module.exports = router;
