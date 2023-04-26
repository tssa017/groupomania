// Imports
import '../../index.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Edit() {
    const [id, setId] = useState('');
    const [userId, setUserId] = useState('');
    const [postPicUrl, setPostPicUrl] = useState(null); // Store the URL of the post picture displayed in the UI
    const [post, setPost] = useState(null); // Store the text content of the post
    const postId = localStorage.getItem('postId');

    const [isFileSelected, setIsFileSelected] = useState(false);

    const navigate = useNavigate(); // React function allows me to dynamically navigate to different routes

    // Function gets post id to use in editing posts
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get(`http://localhost:3001/api/posts/${postId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    const data = response.data[0];
                    setId(postId);
                    setUserId(data.userId);
                    setPost(data.post);
                    setPostPicUrl(data.postPicUrl);
                    console.log('Successfully fetched post for editing!');
                })
                .catch((error) => {
                    console.error('Error fetching post for editing:', error);
                });
        }
    }, [postId]);

    // Function tracks file uploads for submission (similarly to in CreatePost.js)
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setPostPicUrl(event.target.result);
        };
        reader.readAsDataURL(file);
        setIsFileSelected(true);
    };

    // Function allows user to modify a post and saves to database
    const modifyPost = (event) => {
        event.preventDefault(); // Prevent auto-submission of the form
        const token = localStorage.getItem('token'); // Get JWT from localStorage in order  to retrieve user data
        if (token) {
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('id', id);
            formData.append('image', postPicUrl);
            formData.append('post', post);

            const updatedPostContent = event.target.elements.content.value;
            formData.set('content', updatedPostContent);
            const updatedPostPicUrl = event.target.elements.image.value;
            formData.set('image', updatedPostPicUrl);

            // Check if image file exists before appending to form data
            if (isFileSelected) {
                // Use the isFileSelected state to check if an image file has been selected
                formData.append('image', event.target.image.files[0]); // Append the actual image file to the form data
            }

            axios
                .put(`http://localhost:3001/api/posts/${id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setPostPicUrl(response.data.postPicUrl);
                    navigate('/feed'); // Redirect to /feed upon successfully updating post
                    console.log('Post updated successfully');
                })
                .catch((error) => {
                    console.error('Failed to update post:', error);
                });
        }
    };

    // Render the edit post screen on the DOM
    return (
        <div className="wrapper">
            <div className="edit-post">
                <article className="create-post__cont">
                    <form onSubmit={modifyPost}>
                        <textarea
                            type="text"
                            name="content"
                            id="content"
                            className="create-post__cont--post"
                            placeholder="Edit post..."
                            maxLength={500}
                        ></textarea>
                        <section className="create-post__cont--btns">
                            <label htmlFor="image">
                                <input
                                    type="file"
                                    id="image-input"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleFileInputChange}
                                />
                            </label>
                            <input
                                type="submit" // Submit form
                                className="create-post__cont--btns-post-btn"
                                id="button"
                                value="POST"
                            />
                        </section>
                    </form>
                </article>
            </div>
        </div>
    );
}

export default Edit;
