// Imports
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js'); // Allows authentication of application pages
const commentCtrl = require('../controllers/comment');

// Define Comment endpoints
// router.get('/comments', auth, commentCtrl.getAllComments);
// router.post('/comments/:postId', auth, commentCtrl.createComment);
// router.put('/comments/:id', auth, commentCtrl.modifyComment);
// router.delete('/comments/:id', auth, commentCtrl.deleteComment);
// router.post('/:id/like', auth, commentCtrl.likeComment); // TODO: check endpoint

// Export
module.exports = router;
