import '../../index.scss';
import { Link } from 'react-router-dom';

// Function formats Profile component in JSX
function Profile() {
    return (
        <div className="portal-profile__wrapper">
            <div className="profile">
                <img
                    src="/images/malina.jpeg"
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
                        <input id="firstName" name="firstName" type="text" />
                    </div>
                    <div className="profile__form-group">
                        <label htmlFor="lastName">Last name</label>
                        <input id="lastName" name="lastName" type="text" />
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
                <Link to="/feed">
                    <button className="profile__update-btn">
                        Update account
                    </button>
                </Link>
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
