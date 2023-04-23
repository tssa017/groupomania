import '../../index.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

function Profile() {
    const [userId, setUserId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicUrl, setProfilePicUrl] = useState(null); // Store the URL of the profile picture displayed in the UI
    const [profilePicFile, setProfilePicFile] = useState(null); // Stores selected image file when a user chooses to update their profile picture
    const [isAdmin, setisAdmin] = useState(); // Keep track of whether or not user is admin

    const navigate = useNavigate(); // React function allows me to dynamically navigate to different routes

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
                    setEmail(response.data.email);
                    setisAdmin(response.data.isAdmin);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [userId]); // Fetch data dependent on userId. Component will dynamically update with the correct profile data when the userId changes

    // Function dynamically updates user information on change
    const handleProfileChange = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        if (token) {
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('image', profilePicFile);
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);

            axios
                .post(`http://localhost:3001/api/${userId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setProfilePicUrl(response.data.user.profilePic);
                    navigate('/feed'); // Redirect to /feed upon successful profile update
                    console.log('Profile updated successfully');
                })
                .catch((error) => {
                    console.error('Failed to update profile:', error);
                });
        }
    };

    const handleAccountDeactivation = () => {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .delete(`http://localhost:3001/api/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => {
                    localStorage.clear();
                    navigate('/portal'); // Redirect to /feed upon successful account deletion
                    console.log('Account successfully deactivated!');
                })
                .catch((error) => {
                    console.error('Failed to deactivate account:', error);
                });
        }
    };

    const setDisplayedImage = (value) => {
        setProfilePicUrl(URL.createObjectURL(value)); // Sets the temporary URL of the selected image
        setProfilePicFile(value); // Sets URL of selected image file
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
                    {/* Only admin can modify email address */}
                    {isAdmin ? (
                        <div className="profile__form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />
                        </div>
                    ) : (
                        <div className="profile__form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                name="email"
                                disabled
                                type="text"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />
                        </div>
                    )}
                    <button className="profile__update-btn" type="submit">
                        Update account
                    </button>
                    <button
                        className="profile__deactivate-btn"
                        onClick={handleAccountDeactivation}
                    >
                        Deactivate account
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Profile;
