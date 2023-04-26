// This file contains all comment related business logic
let db = require('../models');
const Comment = db.Comment;
const User = db.User; // TODO: Do I need?

// GET route gets an array of all comments from database
exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.getAllComments(); // Use getAllComments() function defined in the Comment model
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

// POST route creates a new comment and saves to database
exports.createComment = async (req, res) => {
    const postId = req.params.postId;
    try {
        const newComment = await Comment.create({
            postId: postId,
            userId: req.body.userId,
            comment: req.body.content,
        });
        res.status(201).json({
            message: 'Comment saved successfully!',
        });
    } catch (error) {
        res.status(400).json({
            error: error,
        });
    }
};

// GET route for single comment based on its id number
exports.getSingleComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const comment = await Comment.findOne({
            where: { id: commentId },
        });
        if (!comment) {
            throw new Error('Comment not found');
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({
            error: error.message,
        });
    }
};

// PUT route modifies a comment and saves to database based on its ID
exports.modifyComment = (req, res) => {
    const commentText = req.body.content;

    Comment.findOne({
        where: {
            id: req.params.id,
        },
    })
        .then((comment) => {
            if (!comment) {
                return res.status(404).json({ error: 'Comment not found.' });
            }

            // Get user ID associated with comment
            const userId = comment.userId;

            const updatedFields = {}; // Create empty object to store updated fields in Comment object
            if (commentText) {
                updatedFields.comment = commentText; // Update 'comment' field with new content
            }

            // Update and save new comment to database based on comment's id and userId
            Comment.update(updatedFields, {
                where: { id: req.params.id, userId: userId },
            })
                .then((updatedComment) => {
                    console.log('Comment updated successfully');
                    return res.status(200).json(updatedComment);
                })
                .catch((error) => {
                    console.error('Failed to update comment:', error);
                    return res
                        .status(500)
                        .json({ error: 'Failed to update comment.' });
                });
        })
        .catch((error) => {
            console.error('Error fetching comment:', error);
            return res.status(500).json({ error: 'Failed to fetch comment.' });
        });
};

// DELETE route to delete a comment based on its id
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findOne({
            where: { id: req.params.id },
        });
        if (!comment) {
            throw new Error('Comment not found');
        }
        await comment.destroy();
        res.status(200).json({
            message: 'Deleted!',
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};
