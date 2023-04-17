import '../../index.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

function Edit() {
    const [id, setId] = useState(''); // Add state to keep track of the post being edited
    const [userId, setUserId] = useState('');
    const [postPicUrl, setPostPicUrl] = useState(null); // Store the URL of the post picture displayed in the UI
    const [postPicFile, setPostPicFile] = useState(null); // Stores selected image file when a user chooses to update their post picture
    const [post, setPost] = useState(null); // Store the text content of the post
    const [isFileSelected, setIsFileSelected] = useState(false); // Set to false initially to keep track of whether or not a file has been uploaded
    const navigate = useNavigate(); // React function allows me to dynamically navigate to different routes

    const getPostById = (id) => {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get(`http://localhost:3001/api/posts/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setId(response.data[0].id);
                    setUserId(response.data[0].userId);
                    setPost(response.data[0].post);
                    setPostPicUrl(response.data[0].postPicUrl);
                    console.log('Successfully fetched post for editing!');
                })
                .catch((error) => {
                    console.error('Error fetching post for editing:', error);
                });
        }
    };
    getPostById();

    // Function allows user to modifies post
    const modifyPost = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        if (token) {
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('id', id);
            formData.append('image', postPicFile);
            formData.append('post', post); // TODO: Might need to change this?

            const updatedPostContent = event.target.elements.content.value;
            formData.set('content', updatedPostContent);
            const updatedPostPicUrl = event.target.elements.image.value;
            formData.set('image', updatedPostPicUrl);

            axios
                .post(`http://localhost:3001/api/edit-post/${id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setPostPicUrl(response.data.postPicUrl);
                    setPost(response.data.post); // TODO: May not need this
                    console.log(id);
                    navigate('/feed'); // Redirect to /feed upon successful profile update
                    console.log('Post updated successfully');
                })
                .catch((error) => {
                    console.error('Failed to update post:', error);
                });
        }
    };

    const setDisplayedImage = (value) => {
        setPostPicUrl(URL.createObjectURL(value)); // Sets the temporary URL of the selected image
        setPostPicFile(value); // Sets URL of selected image file
    };

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
                        {isFileSelected && ( // Only renders if file is currently selected
                            <img
                                src={postPicUrl}
                                className="create-post__cont--post-img"
                                alt="User post img"
                            />
                        )}
                        <div className="create-post__cont--post-error"></div>
                        <section className="create-post__cont--btns">
                            <label htmlFor="image">
                                <input
                                    type="file"
                                    id="image-input"
                                    name="image"
                                    accept="image/*"
                                    onChange={
                                        (event) =>
                                            setDisplayedImage(
                                                event.target.files[0]
                                            ) // Pass the uploaded image file to setDisplayedImage function
                                    }
                                />
                            </label>
                            <input
                                type="submit" // Submit form
                                className="create-post__cont--btns-postBtn"
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
