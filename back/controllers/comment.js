// This file contains all comment related business logic
const fs = require('fs'); // TODO: Do I need?
let db = require('../models');
const Comment = db.Comment;
const User = db.User;

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
    console.log(req.body.content);
    try {
        const newComment = await Comment.create({
            postId: req.body.postId,
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

console.log('before');

// GET route for single post based on its id
exports.getSingleComment = async (req, res) => {
    console.log('hi');
    try {
        console.log('trying');
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
console.log('after');

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

            const updatedFields = {}; // Create an empty object to store the updated fields
            if (commentText) {
                updatedFields.comment = commentText; // Update 'comment' field with the new comment content
            }

            // Use the update method to update the post in the database
            Comment.update(updatedFields, {
                where: { id: req.params.id }, // Use the retrieved user ID to update the post
            })
                .then((updatedComment) => {
                    console.log('Comment updated successfully');
                    console.log(req.params.id);
                    console.log('Im here!!!!!!!!!!!!!!!!!!!!!!!!!');
                    console.log(req.body);

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
