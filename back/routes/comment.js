// Imports
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js'); // Allows authentication of application pages
const commentCtrl = require('../controllers/comment');

// Define Comment endpoints
router.get('/comments/:userId', auth, commentCtrl.getAllComments);
router.get('/comments/:id', auth, commentCtrl.getSingleComment);
router.post('/comments/:postId', auth, commentCtrl.createComment);
router.post('/edit-comment/:id', commentCtrl.modifyComment); // TODO: check endpoint, add /comments?
router.delete('/comments/:id', auth, commentCtrl.deleteComment);
// router.post('/:id/like', auth, commentCtrl.likeComment); // TODO: check endpoint
// TODO: add `/comments` to app

// Export
module.exports = router;
