// This file contains all post related business logic
// const fs = require('fs'); // Allow file system modification
let db = require('../models');
const Post = db.Post;
const User = db.User;

// GET route that gets an array of all posts from database
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.getAllPosts(); // Use getAllPosts() function I defined in the Posts model
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' }); // Send an error response if fetching posts fails
    }
};

// POST route that creates a new post and saves to database
exports.createPost = async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const postPicUrl = req.file ? url + '/images/' + req.file.filename : '';
    try {
        const newPost = await Post.create({
            userId: req.body.userId,
            post: req.body.content,
            postPicUrl: postPicUrl,
        });
        res.status(201).json({
            message: 'Post saved successfully!',
        });
    } catch (error) {
        res.status(400).json({
            error: error,
        });
    }
};

// GET route for single post based on its id
exports.getSinglePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findOne({
            where: { id: postId },
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

// POST route modifies an existing post object based on its ID
exports.modifyPost = (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const postPicUrl = req.file ? url + '/images/' + req.file.filename : ''; // Use filename or name property if available
    const postText = req.body.content;

    Post.findOne({
        where: {
            id: req.params.id,
        },
    })
        .then((post) => {
            if (!post) {
                return res.status(404).json({ error: 'Post not found.' });
            }

            // Use the userId property of the post object to get the user ID associated with that post
            const userId = post.userId;

            const updatedFields = {}; // Create an empty object to store the updated fields
            if (postText) {
                updatedFields.post = postText; // Update 'post' field with the new post content
            }
            if (postPicUrl) {
                updatedFields.postPicUrl = postPicUrl; // Update 'postPicUrl' field with the new post picture URL
            }

            // Use the update method to update the post in the database
            Post.update(updatedFields, {
                where: { id: req.params.id, userId: userId }, // Use the retrieved user ID to update the post
            })
                .then((updatedPost) => {
                    console.log('Post updated successfully');
                    return res.status(200).json(updatedPost);
                })
                .catch((error) => {
                    console.error('Failed to update post:', error);
                    return res
                        .status(500)
                        .json({ error: 'Failed to update post.' });
                });
        })
        .catch((error) => {
            console.error('Error fetching post:', error);
            return res.status(500).json({ error: 'Failed to fetch post.' });
        });
};

// DELETE route deletes an exisiting Post object based on its ID
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.id },
        });
        if (!post) {
            throw new Error('Post not found');
        }
        await post.destroy();
        res.status(200).json({
            message: 'Deleted!',
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

// GET route displays like count
exports.getLikes = async (req, res, next) => {
    try {
        const postId = req.params.id;

        const post = await Post.findOne({ where: { id: postId } });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const likes = post.likes;

        return res.status(200).json({ likes: likes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

// POST route allows user to like a post
exports.likePost = (req, res) => {
    const postId = req.params.id;
    const likedPostCount = req.body.likes;

    Post.findOne({
        where: {
            id: postId,
        },
    })
        .then((post) => {
            if (!post) {
                return res.status(404).json({ error: 'Post not found.' });
            }

            // Update the like count in the post object
            post.likes = likedPostCount;

            // Save the updated post to the database
            return post.save({ fields: ['likes'] });
        })
        .then((updatedPost) => {
            console.log('Post successfully liked!');
            return res.status(200).json(updatedPost);
        })
        .catch((error) => {
            console.error('Failed to like post:', error);
            return res.status(500).json({ error: 'Failed to like post.' });
        });
};

// PUT route updates 'read' field of a post
exports.updateReadStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        post.read = true;
        await post.save();
        return res.status(200).send('Post read status updated');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
};
