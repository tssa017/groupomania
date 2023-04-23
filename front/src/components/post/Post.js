import '../../index.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

function Post() {
    const [posts, setPosts] = useState([]); // Stores posts data as an array
    const [comments, setComments] = useState([]); // Stores posts data as an array
    const [userId, setUserId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState(''); // TODO: Check this
    const [profilePicUrl, setProfilePicUrl] = useState('');
    const [postId, setPostId] = useState(''); // TODO: Do I need this?
    const [commentContent, setCommentContent] = useState('');
    const [commentId, setCommentId] = useState('');
    const [comment, setComment] = useState(null); // Keep track of comment state
    const [likes, setLikes] = useState(0); // Keep track of likes
    const [liked, setLiked] = useState(false); // TODO: Do I need this?
    const [selectedPostId, setSelectedPostId] = useState(null); // Keep track of selected post
    const [isAdmin, setisAdmin] = useState();

    const navigate = useNavigate();

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

                    Promise.all(promises)
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

    const deletePost = (id) => {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .delete(`http://localhost:3001/api/posts/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setPosts(posts.filter((post) => post.id !== id));
                    console.log('Successfully deleted post!');
                })
                .catch((error) => {
                    console.error('Error deleting post:', error);
                });
        }
    };

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
                    // window.location.reload();
                })
                .catch((error) => {
                    console.error('Error deleting comment:', error);
                });
        }
    };

    const handlePostEditClick = (postId) => {
        localStorage.setItem('postId', postId);
        navigate('/edit');
    };

    const handleCommentEditClick = (commentId) => {
        // TODO: Implement or delete. Do I need this?
        localStorage.setItem('commentId', commentId);
        // navigate('/edit');
    };

    const createComment = (event, postId) => {
        event.preventDefault();

        const content = commentContent;

        const commentData = {
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
                // event.target.reset();
                // window.location.reload();
            })
            .catch((error) => {
                console.error('Failed to add comment:', error);
            });
    };

    const getCommentById = (event) => {
        event.preventDefault();
        const commentId = localStorage.getItem('commentId');

        axios
            .get(`http://localhost:3001/api/comments/${commentId}`)
            .then((response) => {
                setComment(response.data[0].comment);
                setCommentId(response.data[0].id); // Set the id state to the parameter value
                console.log(response.data[0].id);
                console.log(response.data[0].comment);
                console.log('Successfully fetched comment for editing!');
            })
            .catch((error) => {
                console.error('Error fetching comment for editing:', error);
            });
    };

    // Function allows user to modify a comment
    const modifyComment = (event, commentId) => {
        event.preventDefault();

        const updatedCommentContent = event.target.elements.content.value;

        const data = {
            content: updatedCommentContent,
        };

        axios
            .put(`http://localhost:3001/api/comments/${commentId}`, data)
            .then((response) => {
                // navigate('/feed'); // Redirect to /feed upon successful profile update
                console.log('Comment updated successfully');
            })
            .catch((error) => {
                console.error('Failed to update comment:', error);
            });
    };

    useEffect(() => {
        // Fetch the initial likes count from the server and set it in the state
        axios
            .get(`http://localhost:3001/api/posts/${postId}/get-likes`)
            .then((response) => {
                setLikes(response.data[0].likes);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function handleLikes(event, postId) {
        event.preventDefault();

        setLikes(likes + 1);

        const likesData = {
            likes: likes + 1,
        };

        axios
            .put(`http://localhost:3001/api/posts/${postId}/likes`, likesData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((response) => {
                console.log(likesData);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Function dynamically maps information from post and comments response
    const renderPosts = () => {
        return posts.map((post) => {
            const isPostAuthor = post.userId === userId;
            return (
                <div
                    className="post"
                    key={post.id}
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
                                {post.postPicUrl !== '' ? (
                                    <img
                                        className="post__cont--status-txt-img"
                                        name="image"
                                        src={post.postPicUrl}
                                        alt="Image included in post"
                                    />
                                ) : null}
                            </p>
                            {(isPostAuthor || isAdmin) && (
                                <article className="post__cont--status-edit-cont">
                                    <button
                                        className="post__cont--status-edit-cont--edit"
                                        onClick={() =>
                                            handlePostEditClick(post.id)
                                        }
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="post__cont--status-edit-cont--delete"
                                        onClick={() => deletePost(post.id)}
                                    >
                                        Delete
                                    </button>
                                </article>
                            )}
                        </section>
                    </article>
                    <section className="post__cont--reactions">
                        <div className="post__cont--reactions-likes">
                            {`${post.likes} likes`}
                        </div>
                        <i
                            className="post__cont--reactions--like fa-solid fa-heart"
                            onClick={(event) => handleLikes(event, post.id)}
                        ></i>
                    </section>
                    <div className="create-comment">
                        <section className="post__cont--comment-cont">
                            <img
                                className="post__cont--comment-cont-img"
                                src={profilePicUrl}
                                alt="User profile picture"
                            />
                            <textarea
                                type="text"
                                name="content"
                                id="content"
                                className="post__cont--comment-cont-post"
                                placeholder={`Have something to say about this, ${firstName}?`}
                                maxLength={500}
                                onChange={(event) =>
                                    setCommentContent(event.target.value)
                                }
                            ></textarea>
                            <form
                                className="post__cont--comment-cont-edit-cont"
                                onSubmit={(event) =>
                                    createComment(event, post.id)
                                }
                            >
                                <input
                                    type="submit" // Submit form
                                    className="create-post__cont--btns-postBtn"
                                    onClick={() => setSelectedPostId(post.id)}
                                    id="button"
                                    value="POST"
                                />
                            </form>
                        </section>
                        {/* Render the comments */}
                        <section className="post__cont--comment-cont">
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
                                            className="post__comment"
                                            key={comment.id}
                                        >
                                            <p className="post__cont--status-publisher-name">
                                                {comment.firstName}{' '}
                                                {comment.lastName}
                                            </p>
                                            <img
                                                className="post__cont--comment-cont-img"
                                                src={comment.profilePicUrl}
                                                alt="User profile picture"
                                            />
                                            <p className="post__cont--comment-cont-post">
                                                {comment.comment}
                                            </p>
                                            {/* Render edit and delete buttons for comment authors only */}
                                            {(isCommentAuthor || isAdmin) && (
                                                <article className="post__cont--status-edit-cont">
                                                    <button
                                                        className="post__cont--status-edit-cont--edit"
                                                        onClick={(event) =>
                                                            getCommentById(
                                                                event,
                                                                commentId
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="post__cont--status-edit-cont--delete"
                                                        onClick={() =>
                                                            deleteComment(
                                                                comment.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </article>
                                            )}
                                        </div>
                                    );
                                })}
                        </section>
                        <form
                            onSubmit={(event) =>
                                modifyComment(event, commentId)
                            }
                        >
                            <textarea
                                type="text"
                                name="content"
                                id="content"
                                className="create-post__cont--post"
                                placeholder="Edit comment..."
                                maxLength={500}
                            ></textarea>
                            <div className="create-post__cont--post-error"></div>
                            <section className="create-post__cont--btns">
                                <input
                                    type="submit"
                                    className="create-post__cont--btns-postBtn"
                                    id="button"
                                    value="POST"
                                />
                            </section>
                        </form>
                    </div>
                </div>
            );
        });
    };

    return <div className="wrapper">{renderPosts()}</div>;
}

export default Post;
