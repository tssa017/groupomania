// This file contains all comment related business logic
const fs = require('fs'); // Allow file system modification
const { Comment } = require('../models/comment');
const { User } = require('../models/user');

// GET route that gets an array of all comments from database
exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

// POST route that creates a new comment and saves to database
exports.createComment = async (req, res) => {
    try {
        const comment = await Comment.create({
            id: req.body.commment.id,
            comment: req.body.commment.comment,
            userId: req.body.commment.userId,
            userProfilePic: req.body.commment.userProfilePic,
            likes: req.body.commment.likes,
            usersLiked: req.body.commment.usersLiked,
        });
        res.status(201).json({
            message: 'Comment successfully saved!',
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

// PUT route modifies a Comment object based on its ID
exports.modifyComment = async (req, res) => {
    const commentId = req.params.id;
    const userId = req.auth.userId;

    try {
        const comment = await Comment.findOne({
            where: {
                id: commentId,
                userId: userId,
            },
        });

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found.' });
        }

        let update = req.body;

        const [rowsUpdated, [updatedComment]] = await Comment.update(update, {
            // Array of objects that represents the updated instances
            where: {
                id: commentId,
                userId: userId,
            },
            returning: true,
        });

        if (rowsUpdated === 0) {
            return res.status(404).json({ error: 'Comment not found.' });
        }

        res.status(200).json({
            message: 'Comment updated successfully!',
            comment: updatedComment,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message || 'Failed to update comment.',
        });
    }
};

// DELETE route deletes an exisiting Comment object based on its ID
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
            message: 'Comment deleted successfully!',
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

// POST route allows user to like a comment
exports.likeComment = (req, res) => {
    if (req.body.like === 1) {
        Comment.findByPk(req.params.id)
            .then((comment) => {
                if (!comment) {
                    return res
                        .status(404)
                        .json({ error: 'Comment not found!' });
                }
                User.findByPk(req.body.userId)
                    .then((user) => {
                        if (!user) {
                            return res
                                .status(404)
                                .json({ error: 'User not found!' });
                        }
                        comment
                            .addUser(user, { through: { liked: true } }) // Add user to comment's usersLiked array
                            .then(() => {
                                comment
                                    .increment('likes', { by: 1 }) // Increment likes by 1
                                    .then(() => {
                                        res.status(201).json({
                                            message: 'You liked this comment!',
                                        });
                                    })
                                    .catch((error) => {
                                        res.status(400).json({
                                            error: error,
                                        });
                                    });
                            })
                            .catch((error) => {
                                res.status(400).json({
                                    error: error,
                                });
                            });
                    })
                    .catch((error) => {
                        res.status(400).json({
                            error: error,
                        });
                    });
            })
            .catch((error) => {
                res.status(400).json({
                    error: error,
                });
            });
    }
};
