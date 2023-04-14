import '../../index.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

function Post() {
    const [posts, setPosts] = useState([]); // Stores posts data as an array
    const [userId, setUserId] = useState('');

    // Fetch posts data from database
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            axios
                .get(`http://localhost:3001/api/posts/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setPosts(response.data); // Update the post state with fetched posts data
                    console.log('Successfully fetched posts!');
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching posts:', error);
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

    // Function maps information from post response into posts so they are dynamically rendered in DOM
    const renderPosts = () => {
        {
            return posts.map(
                (
                    post // Iterates over each element in `posts` array
                ) => (
                    //`key` attribute set to `post.id` to uniquely identify each `post` element
                    <div className="post" key={post.id}>
                        <article className="post__cont">
                            <section className="post__cont--status">
                                <p className="post__cont--status-txt">
                                    {post.post}
                                    <img
                                        className="post__cont--status-txt-img"
                                        src={post.postPicUrl}
                                        alt="Image included in post"
                                    />
                                </p>
                                <article className="post__cont--status-edit-cont">
                                    <button className="post__cont--status-edit-cont--edit">
                                        Edit
                                    </button>
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
                )
            );
        }
    };

    return (
        // Call renderPosts function
        <div className="wrapper">
            {renderPosts()}
            {/* <div className="post">
                <article className="post__cont">
                    <section className="post__cont--status">
                        <p className="post__cont--status-txt">
                            I'm pleased to announce that I have started the Web
                            Developer path with OpenClassrooms!
                            <img
                                className="post__cont--status-txt-img"
                                src=""
                                alt="Image included in post"
                            />
                        </p>
                        <article className="post__cont--status-edit-cont">
                            <button className="post__cont--status-edit-cont--edit">
                                Edit
                            </button>
                            <button className="post__cont--status-edit-cont--delete">
                                Delete
                            </button>
                        </article>
                    </section>
                    <section className="post__cont--reactions">
                        <div className="post__cont--reactions--likes">
                            101 likes
                        </div>
                        <div className="post__cont--reactions--comments">
                            1 Comment
                        </div>
                        <i className="post__cont--reactions--like fa-solid fa-heart"></i>
                    </section>
                    <section className="post__cont--comment-cont">
                        <img
                            className="post__cont--comment-cont-img"
                            src="/images/me.jpg"
                            alt="User profile picture"
                        />
                        <p className="post__cont--comment-cont-post">
                            Congrats!
                        </p>
                        <article className="post__cont--comment-cont-edit-cont">
                            <button className="post__cont--comment-cont-edit-cont--edit">
                                Edit
                            </button>
                            <button className="post__cont--comment-cont-edit-cont--delete">
                                Delete
                            </button>
                        </article>
                    </section>
                </article>
            </div> */}
        </div>
    );
}

export default Post;
