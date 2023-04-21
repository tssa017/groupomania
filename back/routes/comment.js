// Imports
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js'); // Allows authentication of application pages
const commentCtrl = require('../controllers/comment');

// Define Comment endpoints
router.get('/:userId', auth, commentCtrl.getAllComments);
router.get('/:id', auth, commentCtrl.getSingleComment);
router.post('/:postId', auth, commentCtrl.createComment);
router.put('/:id', commentCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

// Export
module.exports = router;
