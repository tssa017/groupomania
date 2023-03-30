// Imports
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js'); // Allows authentication of application pages
const commentCtrl = require('../controllers/comment');

// Define Comment endpoints
router.get('/', auth, commentCtrl.getAllComments); // TODO: check endpoint
router.post('/', auth, commentCtrl.createComment); // TODO: check endpoint
router.put('/:id', auth, commentCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

// Export
module.exports = router;
