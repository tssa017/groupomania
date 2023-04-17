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
                    setPosts(reversedPosts); // Update the post state with fetched posts data in reverse order
                    console.log('Successfully fetched posts!');
                })
                .catch((error) => {
                    console.error('Error fetching posts:', error);
                });
        }
    }, []);

    const getUser = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token); // Method from jwt-decode library that parses the payload and headers of the token to JSON
            const userId = decodedToken.userId;

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
                        setUserId(userId);
                        setFirstName(firstName);
                        setLastName(lastName);
                        setProfilePicUrl(profilePic);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    getUser();

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

    // Function maps information from post response into posts so they are dynamically rendered in DOM
    const renderPosts = () => {
        return posts.map((post) => (
            <div className="post" key={post.id}>
                <article className="post__cont">
                    <section className="post__cont--status">
                        <div className="post__cont--status-publisher">
                            <img
                                className="post__cont--status-publisher-img"
                                src={profilePicUrl}
                                alt="User profile picture"
                            />
                            <p className="post__cont--status-publisher-name">
                                {firstName + ' ' + lastName}
                            </p>
                        </div>
                        <p className="post__cont--status-txt" name="content">
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
                        <article className="post__cont--status-edit-cont">
                            <Link to="/edit">
                                <button className="post__cont--status-edit-cont--edit">
                                    Edit
                                </button>
                            </Link>
                            <button
                                className="post__cont--status-edit-cont--delete"
                                onClick={() => deletePost(post.id)}
                            >
                                Delete
                            </button>
                        </article>
                    </section>
                </article>
            </div>
        ));
    };

    return <div className="wrapper">{renderPosts()}</div>;
}

export default Post;
