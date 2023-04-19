// This file contains all post related business logic
// const fs = require('fs'); // Allow file system modification
let db = require('../models');
const Post = db.Post;
// const User = db.User;

// GET route that gets an array of all posts from database
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll(); // Fetch all posts from the Post model using Sequelize's findAll() method
        res.status(200).json(posts); // Send the fetched posts as JSON response
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

// POST route allows user to like a comment
// exports.likePost = (req, res) => {
//     if (req.body.like === 1) {
//         Post.findByPk(req.params.id)
//             .then((post) => {
//                 if (!post) {
//                     return res.status(404).json({ error: 'Post not found!' });
//                 }
//                 User.findByPk(req.body.userId)
//                     .then((user) => {
//                         if (!user) {
//                             return res
//                                 .status(404)
//                                 .json({ error: 'User not found!' });
//                         }
//                         post.addUser(user, { through: { liked: true } }) // Add user to post's usersLiked array
//                             .then(() => {
//                                 post.increment('likes', { by: 1 }) // Increment likes by 1
//                                     .then(() => {
//                                         res.status(201).json({
//                                             message: 'You liked this comment!',
//                                         });
//                                     })
//                                     .catch((error) => {
//                                         res.status(400).json({
//                                             error: error,
//                                         });
//                                     });
//                             })
//                             .catch((error) => {
//                                 res.status(400).json({
//                                     error: error,
//                                 });
//                             });
//                     })
//                     .catch((error) => {
//                         res.status(400).json({
//                             error: error,
//                         });
//                     });
//             })
//             .catch((error) => {
//                 res.status(400).json({
//                     error: error,
//                 });
//             });
//     }
// };
