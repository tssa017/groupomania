import '../../index.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

function Post() {
    const [posts, setPosts] = useState([]); // Stores posts data as an array
    const [userId, setUserId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePicUrl, setProfilePicUrl] = useState('');
    const [postId, setPostId] = useState(''); // TODO: Figure this out
    const [commentContent, setCommentContent] = useState('');
    console.log(commentContent);

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
                    const reversedPosts = response.data.reverse(); // Ensure posts display in reverse order (newest to oldest)

                    // Get user information for all posts
                    const promises = reversedPosts.map((post) => {
                        return axios.get(
                            `http://localhost:3001/api/${post.userId}`,
                            {
                                headers: { Authorization: `Bearer ${token}` },
                            }
                        );
                    });

                    // Wait for all requests to finish and update the state with modified posts
                    Promise.all(promises)
                        .then((responses) => {
                            const updatedPosts = reversedPosts.map(
                                (post, i) => {
                                    const userResponse = responses[i];
                                    if (
                                        userResponse.data &&
                                        userResponse.data.firstName
                                    ) {
                                        const firstName =
                                            userResponse.data.firstName;
                                        const lastName =
                                            userResponse.data.lastName;
                                        const profilePic =
                                            userResponse.data.profilePic;
                                        post.firstName = firstName;
                                        post.lastName = lastName;
                                        post.profilePicUrl = profilePic;
                                    }
                                    return post;
                                }
                            );
                            setPosts(updatedPosts); // Update the post state with fetched posts data in reverse order
                            console.log('Successfully fetched posts!');
                        })
                        .catch((error) => {
                            console.error(
                                'Error fetching user information:',
                                error
                            );
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
                        // Check if firstName included in response
                        const firstName = response.data.firstName;
                        const lastName = response.data.lastName;
                        const profilePic = response.data.profilePic;
                        // Set extracted values
                        setFirstName(firstName);
                        setLastName(lastName);
                        setProfilePicUrl(profilePic);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    const deletePost = (id) => {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .delete(`http://localhost:3001/api/posts/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    // Update the posts state by removing the deleted post from the array
                    setPosts(posts.filter((post) => post.id !== id));
                    console.log('Successfully deleted post!');
                })
                .catch((error) => {
                    console.error('Error deleting post:', error);
                });
        }
    };

    const handleEditClick = (postId) => {
        localStorage.setItem('postId', postId);
        window.location.href = '/edit'; // Redirect to the "/edit" page
    };

    const createComment = (event, postId) => {
        event.preventDefault(); // TODO: nav

        console.log(postId);

        const content = commentContent;

        const commentData = {
            postId,
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
                event.target.reset(); // Reset the post after submission
                window.location.reload(); // Refresh the page after submission
            })
            .catch((error) => {
                console.error('Failed to add comment:', error);
                console.log(commentData);
            });
    };

    // Function maps information from post response into posts so they are dynamically rendered in DOM
    const renderPosts = () => {
        return posts.map((post) => {
            const isPostAuthor = post.userId === userId;
            // Render the post with the updated user information
            return (
                <div className="post" key={post.id}>
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
                            {isPostAuthor && (
                                <article className="post__cont--status-edit-cont">
                                    <button
                                        className="post__cont--status-edit-cont--edit"
                                        onClick={() => handleEditClick(post.id)}
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
                        {/* <div className="post__cont--reactions--comments">
                            1 Comment
                        </div> */}
                        <div className="post__cont--reactions-likes">
                            {/* // TODO: Change */}
                            {`${userId} likes`}
                        </div>
                        <i className="post__cont--reactions--like fa-solid fa-heart"></i>
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
                                    className="post__cont--comment-cont-edit-cont--post"
                                    id="button"
                                    value="POST"
                                />
                                <button className="post__cont--comment-cont-edit-cont--delete">
                                    Delete
                                </button>
                                {/* // TODO: Hide this */}
                                <button className="post__cont--comment-cont-edit-cont--edit">
                                    Edit
                                </button>
                            </form>
                        </section>
                    </div>
                </div>
            );
        });
    };

    return <div className="wrapper">{renderPosts()}</div>;
}

export default Post;
