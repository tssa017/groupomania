import '../../index.scss';

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
                <button className="profile__update-btn">
                    Update profile picture
                </button>
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
                        <input
                            id="email"
                            name="email"
                            type="text"
                            placeholder="user@example.com"
                        />
                    </div>
                </form>
                <button className="profile__update-btn">Update account</button>
                <button className="profile__deactivate-btn">
                    Deactivate account
                </button>
            </div>
        </div>
    );
}

export default Profile;
