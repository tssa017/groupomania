// Imports
import '../../index.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Button from '../button/Button.js';

function Post() {
    const [posts, setPosts] = useState([]); // Stores posts data as an array
    const [comments, setComments] = useState([]); // Stores comments data as an array

    const [userId, setUserId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePicUrl, setProfilePicUrl] = useState('');
    const [postId, setPostId] = useState('');
    const [commentId, setCommentId] = useState('');
    const [comment, setComment] = useState(null); // Keep track of comment state
    const [likes, setLikes] = useState(0); // Keep track of likes
    const [isAdmin, setisAdmin] = useState();

    const [commentContent, setCommentContent] = useState('');

    const [selectedPostId, setSelectedPostId] = useState(null); // Keep track of selected post

    // Toggle comments display
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [isIconUp, setIsIconUp] = useState(false);

    // Edit post
    const [isEditingComment, setIsEditingComment] = useState(false);

    const navigate = useNavigate();

    // Function fetches posts, comments, and user data together in order to reduce number of requests and state updates
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;

            // Get all posts
            axios
                .get(`http://localhost:3001/api/posts/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    const posts = response.data;

                    // Get user information for all posts
                    const promises = posts.map((post) => {
                        return axios.get(
                            `http://localhost:3001/api/${post.userId}`,
                            {
                                headers: { Authorization: `Bearer ${token}` },
                            }
                        );
                    });

                    Promise.all(promises) // Promise.all() method means we wait for all API calls to complete before updating the state with the fetched data
                        .then((responses) => {
                            const updatedPosts = posts.map((post, i) => {
                                const userResponse = responses[i];
                                if (userResponse.data) {
                                    const firstName =
                                        userResponse.data.firstName;
                                    const lastName = userResponse.data.lastName;
                                    const profilePic =
                                        userResponse.data.profilePic;
                                    post.firstName = firstName;
                                    post.lastName = lastName;
                                    post.profilePicUrl = profilePic;
                                }
                                return post;
                            });
                            setPosts(updatedPosts); // Update post state with posts data
                            console.log('Successfully fetched posts!');
                        })
                        .catch((error) => {
                            console.error(
                                'Error fetching user information:',
                                error
                            );
                        });

                    // Fetch comments data for all posts
                    const commentPromises = posts.map((post) => {
                        return axios.get(
                            `http://localhost:3001/api/comments/${userId}`,
                            {
                                headers: { Authorization: `Bearer ${token}` },
                            }
                        );
                    });

                    // Update state with comments data for each post
                    Promise.all(commentPromises)
                        .then((commentResponses) => {
                            const updatedComments = posts.map((post, i) => {
                                const commentResponse = commentResponses[i];
                                if (commentResponse.data) {
                                    const comments = commentResponse.data;
                                    post.comments = comments.map((comment) => {
                                        axios
                                            .get(
                                                `http://localhost:3001/api/${comment.userId}`,
                                                {
                                                    headers: {
                                                        Authorization: `Bearer ${token}`,
                                                    },
                                                }
                                            )
                                            .then((userResponse) => {
                                                if (userResponse.data) {
                                                    const firstName =
                                                        userResponse.data
                                                            .firstName;
                                                    const lastName =
                                                        userResponse.data
                                                            .lastName;
                                                    const profilePic =
                                                        userResponse.data
                                                            .profilePic;
                                                    comment.firstName =
                                                        firstName;
                                                    comment.lastName = lastName;
                                                    comment.profilePicUrl =
                                                        profilePic;
                                                }
                                            })
                                            .catch((error) => {
                                                console.error(
                                                    'Error fetching user information:',
                                                    error
                                                );
                                            });
                                        return comment;
                                    });
                                }
                                return post;
                            });
                            setPosts(updatedComments); // Update the post state with fetched comments data for each post
                            console.log('Successfully fetched comments!');
                        })
                        .catch((error) => {
                            console.error('Error fetching comments:', error);
                        });

                    setUserId(userId);
                })
                .catch((error) => {
                    console.error('Error fetching posts:', error);
                });

            // Get user information
            axios
                .get(`http://localhost:3001/api/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    if (response.data && response.data.firstName) {
                        const firstName = response.data.firstName;
                        const lastName = response.data.lastName;
                        const profilePic = response.data.profilePic;
                        const isAdmin = response.data.isAdmin;
                        setFirstName(firstName);
                        setLastName(lastName);
                        setProfilePicUrl(profilePic);
                        setisAdmin(isAdmin);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    // Get read status of posts
    async function updateReadStatus(postId) {
        try {
            const response = await axios.put(
                `http://localhost:3001/api/posts/${postId}/read`,
                { read: true }
            );
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    // Function allows post author to delete post from database
    const deletePost = (id) => {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .delete(`http://localhost:3001/api/posts/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setPosts(posts.filter((post) => post.id !== id)); // Filter out posts with corresponding id
                    console.log('Successfully deleted post!');
                })
                .catch((error) => {
                    console.error('Error deleting post:', error);
                });
        }
    };

    // Function allows post author to delete comment from database
    const deleteComment = (id) => {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .delete(`http://localhost:3001/api/comments/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setComments(
                        comments.filter((comment) => comment.id !== id)
                    );
                    console.log('Successfully deleted comment!');
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('Error deleting comment:', error);
                });
        }
    };

    // Function gets postId from localStorage in order to pass it to the modifyPost function when a user clicks the edit post button
    const handlePostEditClick = (postId) => {
        localStorage.setItem('postId', postId);
        navigate('/edit'); // Also redirects to edit post page
    };

    // Function gets commentId from localStorage in order to pass it to the modifyComment function when a user clicks the edit comment button
    const handleCommentEditClick = (commentId) => {
        localStorage.setItem('commentId', commentId);
        setIsEditingComment(true); // Sets state of isEditingComment to true so that the create comment textbox will disappear on clicking the edit comment button
    };

    // Function posts new comment content to API, allowing users to submit comments
    const createComment = (event, postId) => {
        event.preventDefault();

        const content = commentContent;

        const commentData = {
            // Create new instance of a comment
            postId: selectedPostId,
            userId,
            content,
        };

        axios
            .post(`http://localhost:3001/api/comments/${postId}`, commentData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((response) => {
                console.log('Comment created successfully:');

                // Reset the form
                window.location.reload();
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    // Text is required to submit a comment
                    alert('Please enter text to submit this comment.');
                } else {
                    console.error('Failed to add comment:', error);
                }
            });
    };

    // Function gets a given comment's id
    useEffect(() => {
        const token = localStorage.getItem('token');
        const commentId = localStorage.getItem('commentId');
        if (token && commentId) {
            axios
                .get(`http://localhost:3001/api/comments/${commentId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setCommentId(response.data[0].id); // Set the id state to the parameter value
                    setUserId(response.data[0].userId);
                    setComment(response.data[0].comment);
                    console.log('Successfully fetched comment for editing!');
                })
                .catch((error) => {
                    console.error('Error fetching comment for editing:', error);
                });
        }
    }, []);

    // Function allows user to modify a comment
    const modifyComment = (event) => {
        event.preventDefault();
        if (!isEditingComment) return; // Check if editing is true to update UI (remove create comment textbox)
        const token = localStorage.getItem('token');
        if (token) {
            const updatedCommentContent = event.target.elements.content.value; // Retrieve new comment content

            axios
                .put(
                    `http://localhost:3001/api/comments/${localStorage.getItem(
                        'commentId'
                    )}`, // Retrieve commentId from localStorage object
                    { content: updatedCommentContent },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                .then((response) => {
                    console.log('Comment updated successfully');
                })
                .catch((error) => {
                    console.error('Failed to update comment:', error);
                });
        }
        setIsEditingComment(false);
        window.location.reload();
    };

    // Function gets the initial likes count for all posts from the server and set them in the state
    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/posts/${postId}/get-likes`)
            .then((response) => {
                setPosts(response.data); // Set the posts data in the state
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // Function allows user to like a post and saves likes count to database
    async function handleLikes(event, postId) {
        event.preventDefault();

        // Find the post in the state and update its likes count
        const updatedPosts = posts.map((post) => {
            // Use map method to create a new array of updated posts with the new like count for the given post
            if (post.id === postId) {
                return { ...post, likes: post.likes + 1 };
            }
            return post;
        });

        const updatedPost = updatedPosts.find((post) => post.id === postId); // Finds updated post via post id

        const likesData = {
            // Create a new object with updated likes count
            postId: postId,
            likes: updatedPost.likes,
        };

        try {
            const response = await axios.put(
                `http://localhost:3001/api/posts/${postId}/likes`,
                likesData,

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );
            console.log(likesData);
            setPosts(updatedPosts); // Update the state with the new post data
        } catch (error) {
            console.error(error);
        }
    }

    // Functions toggle section to reveal or collapse on click
    function toggleComments() {
        setIsCommentsOpen(!isCommentsOpen);
    }

    function toggleIcon() {
        setIsIconUp(!isIconUp);
        setIsCommentsOpen(false);
    }

    // Text will change based on whether or not the comments are visible or hidden
    const commentsButtonText = isCommentsOpen
        ? 'Hide comments'
        : 'View comments';

    // Function dynamically maps information from post and comments response
    const renderPosts = () => {
        return posts.map((post) => {
            const isPostAuthor = post.userId === userId;
            return (
                <div
                    className="post"
                    key={post.id} // Unique identifier for each post to help React track the items in the mapped list and update the Dom when an item is added to said list (e.g. a new post)
                    onClick={() => updateReadStatus(post.id)} // Sets post read status to true if a user clicks on a post or interacts with it
                >
                    <article className="post__cont">
                        <section className="post__cont--status">
                            <div className="post__cont--status-publisher">
                                <img
                                    className="post__cont--status-publisher-img"
                                    src={post.profilePicUrl}
                                    alt="User profile picture"
                                />
                                <p className="post__cont--status-publisher-name">
                                    {post.firstName} {post.lastName}
                                </p>
                            </div>
                            <p
                                className="post__cont--status-txt"
                                name="content"
                            >
                                {post.post}
                                {/* If there is an image present, set url, otherwise set "src" attribute in HTML to an empty string */}
                                {post.postPicUrl !== '' ? (
                                    <img
                                        className="post__cont--status-txt-img"
                                        name="image"
                                        src={post.postPicUrl}
                                        alt="Image included in post"
                                    />
                                ) : null}
                            </p>
                            <article className="post__cont--status-edit-cont">
                                <section className="post__cont--reactions">
                                    <i
                                        className="post__cont--reactions--like fa-solid fa-heart"
                                        onClick={(event) =>
                                            handleLikes(event, post.id)
                                        }
                                    ></i>
                                    <div className="post__cont--reactions-likes">
                                        {post.likes}
                                    </div>
                                </section>
                                {/* Only post author or admin accounts can edit or delete a given post  */}
                                {(isPostAuthor || isAdmin) && (
                                    <div className="post__cont--status-edit-cont-mods">
                                        <Button
                                            className="post__cont--status-edit-cont-mods--edit"
                                            onClick={() =>
                                                handlePostEditClick(post.id)
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            className="post__cont--status-edit-cont-mods--delete"
                                            onClick={() => deletePost(post.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                )}
                            </article>
                        </section>
                    </article>
                    {isEditingComment ? null : ( // If editing a comment, do not render the create comment section
                        <section className="create-comment__cont">
                            <img
                                className="create-comment__cont--img"
                                src={profilePicUrl}
                                alt="User profile picture"
                            />
                            <textarea
                                type="text"
                                name="content"
                                id="content"
                                className="create-comment__cont--comment"
                                placeholder={`Have something to say about this, ${firstName}?`}
                                maxLength={500}
                                onChange={(event) =>
                                    setCommentContent(event.target.value)
                                }
                            ></textarea>
                            <form
                                onSubmit={(event) =>
                                    createComment(event, post.id)
                                }
                            >
                                <input
                                    type="submit"
                                    className="create-comment__cont--post-btn"
                                    onClick={() => setSelectedPostId(post.id)}
                                    id="button"
                                    value="Post comment"
                                />
                            </form>
                        </section>
                    )}
                    {/* Apply the toggleComments functions to allow user to display or hide comments. For example, commentsButtonText will say 'Hide comments' if they are currently displayed */}
                    <div id="toggle-comments" onClick={toggleComments}>
                        {commentsButtonText}
                        <i
                            className={`settings__nav--icon fa-solid fa-angle-${
                                isIconUp ? 'up' : 'down'
                            }`}
                            onClick={toggleIcon}
                        ></i>

                        {/* Render the comments */}
                        <section
                            className="comment__cont"
                            style={{
                                display: isCommentsOpen ? 'block' : 'none',
                            }}
                        >
                            {post.comments &&
                                post.comments.map((comment) => {
                                    if (comment.postId !== post.id) {
                                        return null;
                                    }
                                    {
                                        /* Ensure comments display under corresponding postId */
                                    }
                                    const isCommentAuthor =
                                        comment.userId === userId;
                                    return (
                                        <div
                                            className="comment__cont--comment-card"
                                            key={comment.id}
                                        >
                                            <div className="comment__cont--comment-card-publisher">
                                                <img
                                                    className="comment__cont--comment-card-publisher-img"
                                                    src={comment.profilePicUrl}
                                                    alt="User profile picture"
                                                />
                                                <p className="comment__cont--comment-card-publisher-name">
                                                    {comment.firstName}{' '}
                                                    {comment.lastName}
                                                </p>
                                            </div>
                                            <p className="comment__cont--comment-card-comment">
                                                {comment.comment}
                                            </p>
                                            {/* Render edit and delete buttons for admin account or comment authors only */}
                                            {(isCommentAuthor || isAdmin) && (
                                                <div className="comment__cont--comment-card--edit">
                                                    <Button
                                                        className="comment__cont--comment-card--edit-edit-btn"
                                                        onClick={() =>
                                                            handleCommentEditClick(
                                                                comment.id
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        className="comment__cont--comment-card--edit-delete"
                                                        onClick={() =>
                                                            deleteComment(
                                                                comment.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                        </section>
                        {/* Only render this textbox if currently editing a comment */}
                        {isEditingComment && (
                            <form
                                onSubmit={modifyComment}
                                className="edit-comment__cont"
                            >
                                <textarea
                                    type="text"
                                    name="content"
                                    id="content"
                                    className="edit-comment__cont--comment"
                                    placeholder="Edit comment..."
                                    maxLength={500}
                                ></textarea>
                                <input
                                    type="submit"
                                    className="edit-comment__cont--post-btn"
                                    id="button"
                                    value="Save comment"
                                />
                            </form>
                        )}
                    </div>
                </div>
            );
        });
    };

    return <div className="wrapper">{renderPosts()}</div>;
}

export default Post;
