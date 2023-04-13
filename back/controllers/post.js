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
    const postPicUrl = req.body.postPicUrl
        ? url + '/images/' + req.body.postPicUrl
        : '';
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
// exports.getSinglePost = async (req, res) => {
//     try {
//         const postId = req.params.id;
//         const post = await Post.findOne({
//             where: { id: postId },
//         });
//         if (!post) {
//             throw new Error('Post not found');
//         }
//         res.status(200).json(post);
//     } catch (error) {
//         res.status(404).json({
//             error: error.message,
//         });
//     }
// };

// PUT route modifies an existing sauce object based on its ID
// exports.modifyPost = async (req, res) => {
//     const postId = req.params.id;
//     const userId = req.auth.userId;

//     try {
//         const post = await Post.findOne({
//             where: {
//                 id: postId,
//                 userId: userId,
//             },
//         });

//         if (!post) {
//             return res.status(404).json({ error: 'Post not found.' });
//         }

//         let update = req.body;

//         if (req.file) {
//             const postPicUrl = `${req.protocol}://${req.get('host')}/images/${
//                 req.file.filename
//             }`;
//             update = { ...JSON.parse(req.body.post), postPicUrl };
//         }

//         const [rowsUpdated, [updatedPost]] = await Post.update(update, {
//             // Array of objects that represents the updated instances
//             where: {
//                 id: postId,
//                 userId: userId,
//             },
//             returning: true,
//         });

//         if (rowsUpdated === 0) {
//             return res.status(404).json({ error: 'Post not found.' });
//         }

//         res.status(200).json({
//             message: 'Post updated successfully!',
//             post: updatedPost,
//         });
//     } catch (error) {
//         res.status(400).json({
//             error: error.message || 'Failed to update post.',
//         });
//     }
// };

// DELETE route deletes an exisiting Post object based on its ID
// exports.deletePost = async (req, res) => {
//     try {
//         const post = await Post.findOne({
//             where: { id: req.params.id },
//         });
//         if (!post) {
//             throw new Error('Post not found');
//         }
//         const filename = post.postPicUrl.split('/images/')[1];
//         fs.unlink('images/' + filename, async () => {
//             // Deletes file from file system
//             await post.destroy();
//             res.status(200).json({
//                 message: 'Deleted!',
//             });
//         });
//     } catch (error) {
//         res.status(400).json({
//             error: error.message,
//         });
//     }
// };

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
