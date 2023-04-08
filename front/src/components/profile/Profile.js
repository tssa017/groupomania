import '../../index.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

function Profile() {
    const [profilePic, setProfilePic] = useState('');
    const [userId, setUserId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

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
                })
                .then((response) => {
                    if (response.data && response.data.firstName) {
                        const firstName = response.data.firstName;
                        setFirstName(firstName);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    const handleUserUpdate = (event) => {
        // Image upload
        const imageFile = event.target.files[0];
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('image', imageFile);
        console.log(formData);

        // Convert FormData to JSON so I can read it
        const formDataObject = {};
        for (const [key, value] of formData.entries()) {
            formDataObject[key] = value;
        }
        console.log(formDataObject);

        axios
            .post(`http://localhost:3001/api/${userId}`, formData)
            .then((response) => {
                const profilePicUrl = `http://localhost:3001/images/${response.data.filename}`;
                setProfilePic(profilePicUrl);
            })
            .catch((error) => {
                console.error('Failed to upload profile picture:', error);
            });
    };

    return (
        <div className="portal-profile__wrapper">
            <div className="profile">
                <img
                    src={profilePic}
                    className="profile__img"
                    alt="User profile picture"
                />
                <label htmlFor="image" className="profile__update-pic-btn">
                    Update profile picture
                    <input
                        type="file"
                        id="image-input"
                        name="image"
                        accept="image/*"
                    />
                </label>
                <form>
                    <div className="profile__form-group">
                        <label htmlFor="firstName">First name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder={`${firstName}`}
                        />
                    </div>
                    <div className="profile__form-group">
                        <label htmlFor="lastName">Last name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder={`${lastName}`}
                        />
                    </div>
                    <div className="profile__form-group">
                        <label htmlFor="email">Email</label>
                        {/* Only admin will be able to modify email address */}
                        <input
                            id="email"
                            name="email"
                            type="text"
                            placeholder="user@example.com"
                            disabled
                        />
                    </div>
                </form>
                <button
                    className="profile__update-btn"
                    onChange={handleUserUpdate}
                >
                    Update account
                </button>
                <Link to="/portal">
                    <button className="profile__deactivate-btn">
                        Deactivate account
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Profile;
