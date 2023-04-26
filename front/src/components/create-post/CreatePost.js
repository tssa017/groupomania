// Imports
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

function CreatePost() {
    // Use state: store data within a component that can potentially change during the lifetime of a component (set state allows me to change it later)
    const [userId, setUserId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [profilePicUrl, setProfilePicUrl] = useState('');
    const [postPicUrl, setPostPicUrl] = useState('');

    const [isFileSelected, setIsFileSelected] = useState(false); // Keep track of uploaded files for UI

    // Get request fetches user data from API to display on post
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId; // Get userId from the decoded token

            axios
                .get(`http://localhost:3001/api/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    if (response.data && response.data.firstName) {
                        const firstName = response.data.firstName;
                        const profilePic = response.data.profilePic;

                        setUserId(userId);
                        setFirstName(firstName);
                        setProfilePicUrl(profilePic);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []); // Function runs once when the component mounts

    // Function tracks file uploads and allows for a preview of image in UI before a user submits the post
    const handleFileInputChange = (event) => {
        const file = event.target.files[0]; // Retrieve the selected image file
        const reader = new FileReader(); // Create a new FileReader object, which is a built in JS object that reads file contents asynchronously
        reader.onload = (event) => {
            setPostPicUrl(event.target.result); // Set the postPicUrl to selected file that has been processed by FileReader
        };
        reader.readAsDataURL(file); // Turns the file into a string that can be used as "src" attribute in HTML
        setIsFileSelected(true); // Set isFileSected to true, allowing it to be displayed in UI
    };

    // Function allows users to remove an uploaded file before submission
    const handleRemoveImage = () => {
        setPostPicUrl(''); // Unset the contents of postPicUrl
        setIsFileSelected(false);
    };

    // Post request sends post data to API for storage in database
    const handlePostSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(); // Create a new FormData object to store the text and file contents of the post
        formData.append('content', event.target.content.value);
        formData.append('userId', userId);

        if (isFileSelected) {
            formData.append('image', event.target.image.files[0]);
        }

        axios
            .post(`http://localhost:3001/api/posts/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data', // This header indicates that the post request contains files
                },
            })
            .then((response) => {
                console.log('Post created successfully:');

                // Reset the form after submission
                event.target.reset();
                window.location.reload();
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    // Text is required to submit a post
                    alert('Please enter text to submit this post.');
                } else {
                    console.error('Failed to create post:', error);
                }
            });
    };

    // JSX renders the information dynamically on the DOM
    return (
        <div className="wrapper">
            <div className="create-post">
                <article className="create-post__cont">
                    <form onSubmit={handlePostSubmit}>
                        <img
                            src={profilePicUrl}
                            className="create-post__cont--profile-img"
                            alt="User profile"
                        />
                        <textarea
                            type="text"
                            name="content"
                            id="content"
                            className="create-post__cont--post"
                            placeholder={`What's happening, ${firstName}?`}
                            maxLength={500}
                        ></textarea>
                        {isFileSelected && ( // Section only renders if file is currently selected
                            <div className="create-post__cont--post-cont">
                                <img
                                    src={postPicUrl}
                                    className="create-post__cont--post-img"
                                    alt="User post img"
                                />
                                <i
                                    className="fa-solid fa-x create-post__cont--post-remove"
                                    onClick={handleRemoveImage} // Remove the image by clicking on the cross
                                ></i>
                            </div>
                        )}
                        <section className="create-post__cont--btns">
                            <label htmlFor="image">
                                <input
                                    type="file"
                                    id="image-input"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleFileInputChange} // Upload files
                                />
                            </label>
                            <input
                                type="submit" // Will run handlePostSubmit() on submission
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

export default CreatePost;
