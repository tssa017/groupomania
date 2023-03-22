import '../../index.scss';

function Profile() {
    return (
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
                    <input id="firstName" name="firstName" type="text" />
                    <label htmlFor="firstName">First name</label>
                </div>
                <div className="profile__form-group">
                    <input id="lastName" name="lastName" type="text" />
                    <label htmlFor="lastName">Last name</label>
                </div>
                <div className="profile__form-group">
                    <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="user@example.com"
                    />
                    <label htmlFor="email">Email</label>
                </div>
            </form>
            <button className="profile__deactivate-btn">
                Deactivate account
            </button>
        </div>
    );
}

export default Profile;
