// This file contains all post related business logic
let db = require('../models');
const Post = db.Post;
const User = db.User; // TODO: Do I need?

// GET route gets an array of all posts from database
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.getAllPosts(); // Use getAllPosts() function defined in Posts model
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};

// POST route creates a new post and saves to database
exports.createPost = async (req, res) => {
    const url = req.protocol + '://' + req.get('host'); // Creates URL for image file path
    const postPicUrl = req.file ? url + '/images/' + req.file.filename : ''; // Checks if image file was uploaded with the request. If yes, the imageUrl set to url + location + filename. If no, imageUrl set to an empty string
    try {
        {
            /* Create new Post object and save as entry in database */
        }
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

// GET route gets a single post based on its id
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

// PUT route modifies an existing post object based on its id and saves to database
exports.modifyPost = (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const postPicUrl = req.file ? url + '/images/' + req.file.filename : '';
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

            const userId = post.userId;

            const updatedFields = {}; // Creates an empty object to store the updated fields
            if (postText) {
                updatedFields.post = postText;
            }
            if (postPicUrl) {
                updatedFields.postPicUrl = postPicUrl;
            }

            // Update method saves new modified post in database
            Post.update(updatedFields, {
                where: { id: req.params.id, userId: userId }, // Search for post object in database that has the id specified in params object
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
            where: { id: req.params.id }, // Search for post object in database that has the id specified in params object
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

// GET route to display number of likes
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

// POST route saves likes data to database, allowing a user to like a post
exports.likePost = (req, res) => {
    const postId = req.params.id; // Gets post id from params
    const likedPostCount = req.body.likes; // Gets number of likes associated with that post id from request body

    Post.findOne({
        // Find entry with specified post id in database
        where: {
            id: postId,
        },
    })
        .then((post) => {
            if (!post) {
                return res.status(404).json({ error: 'Post not found.' });
            }

            // Update likes field in entry in Posts table with new likes count from request and saves
            post.likes = likedPostCount;
            return post.save({ fields: ['likes'] });
        })
        .then((updatedPost) => {
            console.log('Post successfully liked!');
            return res.status(200).json(updatedPost); // Return new object // TODO: check
        })
        .catch((error) => {
            console.error('Failed to like post:', error);
            return res.status(500).json({ error: 'Failed to like post.' });
        });
};

// PUT route updates 'read' field of a post so other unread posts will be prioritised in the UI
exports.updateReadStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByPk(id); // Find the post with associated id in database
        if (!post) {
            return res.status(404).send('Post not found');
        }
        post.read = true; // Set the read property to true and save
        await post.save();
        return res.status(200).send('Post read status updated');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
};
