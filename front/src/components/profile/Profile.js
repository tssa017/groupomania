import '../../index.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

function Profile() {
    const [userId, setUserId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePicUrl, setProfilePicUrl] = useState(null);
    const [profilePicFile, setProfilePicFile] = useState(null);
    const navigate = useNavigate(); // Get the history object from React Router

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
                    setUserId(userId);
                    setProfilePicUrl(response.data.profilePic);
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [userId]);

    const handleProfileChange = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        if (token) {
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('image', profilePicFile);
            formData.append('firstName', firstName); // Add firstName value
            formData.append('lastName', lastName); // Add lastName value

            axios
                .post(`http://localhost:3001/api/${userId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setProfilePicUrl(response.data.user.profilePic);
                    navigate('/feed'); // Redirect to /feed upon successful update
                    console.log('Profile updated successfully');
                })
                .catch((error) => {
                    console.error('Failed to update profile:', error);
                });
        }
    };

    const setDisplayedImage = (value) => {
        console.log(value);
        setProfilePicUrl(URL.createObjectURL(value));
        setProfilePicFile(value);
    };

    return (
        <div className="portal-profile__wrapper">
            <div className="profile">
                <img
                    src={profilePicUrl}
                    className="profile__img"
                    alt="User profile picture"
                />
                <form onSubmit={handleProfileChange}>
                    <label htmlFor="image" className="profile__update-pic-btn">
                        Update profile picture
                        <input
                            type="file"
                            id="image-input"
                            name="image"
                            accept="image/*"
                            onChange={
                                (event) =>
                                    setDisplayedImage(event.target.files[0]) // Pass the uploaded image file to setDisplayedImage function
                            }
                        />
                    </label>
                    <div className="profile__form-group">
                        <label htmlFor="firstName">First name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={firstName}
                            onChange={(event) =>
                                setFirstName(event.target.value)
                            }
                        />
                    </div>
                    <div className="profile__form-group">
                        <label htmlFor="lastName">Last name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={lastName}
                            onChange={(event) =>
                                setLastName(event.target.value)
                            }
                        />
                    </div>
                    <button className="profile__update-btn" type="submit">
                        Update account
                    </button>
                    <button className="profile__deactivate-btn">
                        Deactivate account
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Profile;
