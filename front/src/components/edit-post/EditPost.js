import '../../index.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

function Edit() {
    const [id, setId] = useState(''); // Add state to keep track of the post being edited
    const [userId, setUserId] = useState('');
    const [postPicUrl, setPostPicUrl] = useState(null); // Store the URL of the post picture displayed in the UI
    const [post, setPost] = useState(null); // Store the text content of the post
    const [isFileSelected, setIsFileSelected] = useState(false); // Set to false initially to keep track of whether or not a file has been uploaded
    const navigate = useNavigate(); // React function allows me to dynamically navigate to different routes
    const postId = localStorage.getItem('postId');

    const getPostById = (id) => {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get(`http://localhost:3001/api/posts/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setId(id); // Set the id state to the parameter value
                    setUserId(response.data[0].userId); // Update the userId state with the correct value
                    setPost(response.data[0].post);
                    setPostPicUrl(response.data[0].postPicUrl);
                    console.log('Successfully fetched post for editing!');
                })
                .catch((error) => {
                    console.error('Error fetching post for editing:', error);
                });
        }
    };

    useEffect(() => {
        getPostById(postId); // Call the function with postId as an argument
    }, [postId]);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0]; // Retrieves uploaded image file
        const reader = new FileReader();
        reader.onload = (event) => {
            setPostPicUrl(event.target.result); // Set the postPicUrl hook to the base64-encoded data URL of selected image file, re-renders
        };
        reader.readAsDataURL(file); // Reads file
        setIsFileSelected(true); // Resets isFileSelected hook so that the file preview is displayed
    };

    // Function allows user to modify a post
    const modifyPost = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
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
                .post(`http://localhost:3001/api/edit-post/${id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setPostPicUrl(response.data.postPicUrl);
                    navigate('/feed'); // Redirect to /feed upon successful profile update
                    console.log('Post updated successfully');
                })
                .catch((error) => {
                    console.error('Failed to update post:', error);
                });
        }
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
                        <div className="create-post__cont--post-error"></div>
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
