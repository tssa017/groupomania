import '../../index.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Function formats Portal component in JSX
function Portal() {
    // Store and manages state of non-senistive user input
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');

    // Hook stores the state of a button so to apply styles
    const [buttonState, setButtonState] = useState({
        loginClicked: false,
        signupClicked: false,
    });

    // Function allows users to switch between login and signup mode
    const handleButtonClick = (buttonName) => {
        setButtonState((prevState) => ({
            loginClicked: buttonName === 'login',
            signupClicked: buttonName === 'signup',
        }));
    };

    return (
        <div className="portal-profile__wrapper">
            <div className="portal">
                <div className="portal__toggle">
                    <button
                        className={`portal__toggle--signup ${
                            buttonState.signupClicked ||
                            (!buttonState.signupClicked &&
                                !buttonState.loginClicked)
                                ? 'clicked'
                                : 'purple'
                        }`}
                        onClick={() => handleButtonClick('signup')}
                    >
                        Sign up
                    </button>
                    <button
                        className={`portal__toggle--login ${
                            buttonState.loginClicked ? 'clicked' : ''
                        }`}
                        onClick={() => handleButtonClick('login')}
                    >
                        Login
                    </button>
                </div>
                <form className="portal__form">
                    {(buttonState.signupClicked ||
                        (!buttonState.signupClicked &&
                            !buttonState.loginClicked)) && (
                        // React fragment used to group multiple elements together without creating an extra DOM node
                        <>
                            <div className="portal__form-group">
                                <label htmlFor="firstName">First name</label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    onChange={({ target }) =>
                                        setFirstName(target.value)
                                    }
                                />
                            </div>
                            <div className="portal__form-group">
                                <label htmlFor="lastName">Last name</label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    onChange={({ target }) =>
                                        setLastName(target.value)
                                    }
                                />
                            </div>
                            <div className="portal__form-group">
                                <label htmlFor="emailAddress">
                                    Email address
                                </label>
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    onChange={({ target }) =>
                                        setEmailAddress(target.value)
                                    }
                                />
                            </div>
                            <div className="portal__form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                />
                            </div>
                            <div className="portal__form-group">
                                <label htmlFor="confirmPassword">
                                    Confirm password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                />
                            </div>
                        </>
                    )}
                    {buttonState.loginClicked && (
                        <>
                            <div className="portal__form-group">
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    onChange={({ target }) =>
                                        setEmailAddress(target.value)
                                    }
                                />
                                <label htmlFor="emailAddress">
                                    Email address
                                </label>
                            </div>
                            <div className="portal__form-group">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </>
                    )}
                </form>
                {(buttonState.signupClicked ||
                    (!buttonState.signupClicked &&
                        !buttonState.loginClicked)) && (
                    <p
                        className={`portal__account-login ${
                            buttonState.loginClicked ? 'clicked' : ''
                        }`}
                        onClick={() => handleButtonClick('login')}
                    >
                        <em>Already have an account?</em>
                    </p>
                )}
                {buttonState.loginClicked && (
                    <p
                        className={`portal__account-signup ${
                            buttonState.signupClicked ? 'clicked' : ''
                        }`}
                        onClick={() => handleButtonClick('signup')}
                    >
                        <em>Don't have an account yet?</em>
                    </p>
                )}
                <Link to="/feed">
                    <button className="portal__enter-btn">You're in!</button>
                </Link>
            </div>
        </div>
    );
}

export default Portal;
