// Imports
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js'); // Allows authentication of application pages
const multer = require('../middleware/multer-config'); // Defines name and destination of image files
const publicationCtrl = require('../controllers/publication');

// Define Publication routes
router.get('/', auth, publicationCtrl.getAllPosts); // TODO: check endpoint
router.get('/:id', auth, publicationCtrl.getSinglePost);
router.post('/', auth, multer, publicationCtrl.createPost); // TODO: check endpoint
router.put('/:id', auth, multer, publicationCtrl.modifyPost);
router.delete('/:id', auth, publicationCtrl.deletePost);
router.post('/:id/like', auth, publicationCtrl.likePost); // TODO: check endpoint

// Export
module.exports = router;
