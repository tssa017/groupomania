import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

function CreatePost() {
    // Use state: store data within a component that can potentially change during the lifetime of a component (set state allows me to change it later)
    const [userId, setUserId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [profilePicUrl, setProfilePicUrl] = useState('');
    const [postPicUrl, setPostPicUrl] = useState('');
    const [isFileSelected, setIsFileSelected] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;

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
    }, []);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setPostPicUrl(event.target.result);
        };
        reader.readAsDataURL(file);
        setIsFileSelected(true);
    };

    const handleRemoveImage = () => {
        setPostPicUrl('');
        setIsFileSelected(false);
    };

    const handlePostSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('content', event.target.content.value);
        formData.append('userId', userId);

        if (isFileSelected) {
            formData.append('image', event.target.image.files[0]);
        }

        axios
            .post(`http://localhost:3001/api/posts/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                console.log('Post created successfully:');

                event.target.reset();
                window.location.reload();
            })
            .catch((error) => {
                console.error('Failed to create post:', error);
            });
    };

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
                        {isFileSelected && ( // Only renders if file is currently selected
                            <div className="create-post__cont--post-cont">
                                <img
                                    src={postPicUrl}
                                    className="create-post__cont--post-img"
                                    alt="User post img"
                                />
                                <i
                                    className="fa-solid fa-x create-post__cont--post-remove"
                                    onClick={handleRemoveImage}
                                ></i>
                            </div>
                        )}
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

export default CreatePost;
