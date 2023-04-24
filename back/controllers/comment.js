// This file contains all comment related business logic
let db = require('../models');
const Comment = db.Comment;
const User = db.User;

// GET route that gets an array of all comments from database
exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.getAllComments(); // Use getAllComments() function I defined in the Comment model
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

// POST route that creates a new comment and saves to database
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

// GET route for single post based on its id
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

// POST route modifies a Comment object based on its ID
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

            // Use the userId property of the comment object to get the user ID associated with that post
            const userId = comment.userId;

            const updatedFields = {}; // Create an empty object to store the updated fields
            if (commentText) {
                updatedFields.comment = commentText; // Update 'comment' field with the new comment content
            }

            // Use the update method to update the post in the database
            Comment.update(updatedFields, {
                where: { id: req.params.id, userId: userId }, // Use the retrieved user ID to update the post
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

// // DELETE route deletes an exisiting Comment object based on its ID
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
