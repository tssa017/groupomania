// Imports
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js'); // Allows authentication of application pages
const commentCtrl = require('../controllers/comment');

// Define Comment endpoints
router.get('/comments/:userId', auth, commentCtrl.getAllComments);
router.post('/comments/:postId', auth, commentCtrl.createComment);
// router.post('/comments/:id', auth, commentCtrl.modifyComment); // TODO: check endpoint
router.delete('/comments/:id', auth, commentCtrl.deleteComment);
// router.post('/:id/like', auth, commentCtrl.likeComment); // TODO: check endpoint

// Export
module.exports = router;
