// This file contains all publication related business logic
const fs = require('fs'); // Allow file system modification
const { Publication } = require('../models/publication');
const { User } = require('../models/user');

// GET route that gets an array of all posts from database
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Publication.findAll();
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

// POST route that creates a new post and saves to database
exports.createPost = async (req, res) => {
    const url = req.protocol + '://' + req.get('host'); // Creates URL for image file path
    const postPicUrl = req.file ? url + '/images/' + req.file.filename : ''; // Checks if image file was uploaded with the request. If yes, the imageUrl set to url + location + filename. If no, imageUrl set to an empty string

    try {
        const post = await Publication.create({
            // TODO: does the variable need to be 'publication'
            id: req.body.publication.id,
            post: req.body.publication.post,
            userId: req.body.publication.userId,
            userProfilePic: req.body.publication.userProfilePic,
            postPicUrl: postPicUrl,
            likes: req.body.publication.likes,
            usersLiked: req.body.publication.usersLiked,
        });
        res.status(201).json({
            message: 'Post saved successfully!',
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

// GET route for single post based on its id
exports.getSinglePost = async (req, res) => {
    try {
        const post = await Publication.findOne({
            where: { id: req.params.id },
        });
        if (!post) {
            throw new Error('Post not found');
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({
            error: error.message,
        });
    }
};

// PUT route modifies an existing sauce object based on its ID
exports.modifyPost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.auth.userId;

    try {
        const post = await Publication.findOne({
            where: {
                id: postId,
                userId: userId,
            },
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found.' });
        }

        let update = req.body;

        if (req.file) {
            const postPicUrl = `${req.protocol}://${req.get('host')}/images/${
                req.file.filename
            }`;
            update = { ...JSON.parse(req.body.post), postPicUrl };
        }

        const [rowsUpdated, [updatedPost]] = await Publication.update(update, {
            // Array of objects that represents the updated instances
            where: {
                id: postId,
                userId: userId,
            },
            returning: true,
        });

        if (rowsUpdated === 0) {
            return res.status(404).json({ error: 'Post not found.' });
        }

        res.status(200).json({
            message: 'Post updated successfully!',
            post: updatedPost,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message || 'Failed to update post.',
        });
    }
};

// DELETE route deletes an exisiting Publication object based on its ID
exports.deletePost = async (req, res) => {
    try {
        const post = await Publication.findOne({
            where: { id: req.params.id },
        });
        if (!post) {
            throw new Error('Post not found');
        }
        const filename = post.postPicUrl.split('/images/')[1];
        fs.unlink('images/' + filename, async () => {
            // Deletes file from file system
            await post.destroy();
            res.status(200).json({
                message: 'Deleted!',
            });
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

// POST route allows user to like a comment
exports.likePost = (req, res) => {
    if (req.body.like === 1) {
        Publication.findByPk(req.params.id)
            .then((post) => {
                if (!post) {
                    return res.status(404).json({ error: 'Post not found!' });
                }
                User.findByPk(req.body.userId)
                    .then((user) => {
                        if (!user) {
                            return res
                                .status(404)
                                .json({ error: 'User not found!' });
                        }
                        post.addUser(user, { through: { liked: true } }) // Add user to post's usersLiked array
                            .then(() => {
                                post.increment('likes', { by: 1 }) // Increment likes by 1
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
