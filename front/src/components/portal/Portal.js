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

    // Function allows users to toggle between login and signup mode
    const handleButtonClick = (isLoginClicked) => {
        // isLoginClicked variable stores whether or not a user has clicked on the login button, and styles accordingly
        setButtonState({
            loginClicked: isLoginClicked,
            signupClicked: !isLoginClicked, // If isLoginClicked returns false, we deduce that the user has instead either clicked on nothing yet (default) or clicked on signup
        });
    };

    return (
        <div className="portal-profile__wrapper">
            <div className="portal">
                <div className="portal__toggle">
                    <button
                        className={`portal__toggle--signup ${
                            !buttonState.loginClicked ? 'purple' : ''
                        }`}
                        onClick={() => handleButtonClick(false)} // If this signup button is clicked, isLoginTrue will return false. Both the button's state and classname are updated accordingly
                    >
                        Sign up
                    </button>
                    <button
                        className={`portal__toggle--login ${
                            buttonState.loginClicked ? 'purple' : ''
                        }`}
                        onClick={() => handleButtonClick(true)}
                    >
                        Login
                    </button>
                </div>

                {/* Conditional Signup and Login form rendering */}
                <form className="portal__form">
                    {(buttonState.signupClicked || // If signup has been clicked or if neither button has been clicked (default setting), the Signup form will render
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
                    {buttonState.loginClicked && ( // Otherwise, if login has been clicked, Login form will render
                        <>
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
                        </>
                    )}
                </form>

                {/* Conditional redirect button rendering */}
                {(buttonState.signupClicked ||
                    (!buttonState.signupClicked &&
                        !buttonState.loginClicked)) && ( // If signup button has been clicked or if neither signup nor login buttons have been clicked (default mode), render the 'Already have an account' button which redirects to the login page
                    <p
                        className={`portal__account-login ${
                            buttonState.loginClicked ? 'purple' : ''
                        }`}
                        onClick={() => handleButtonClick(true)} // Triggered by click even that contains the `true` parameter corresponding to above logic
                    >
                        <em>Already have an account?</em>
                    </p>
                )}
                {buttonState.loginClicked && ( // If signup button has been clicked, render the 'Don't have an account yet' button which redirects to the signup pag
                    <p
                        className={`portal__account-signup ${
                            buttonState.signupClicked ? 'purple' : ''
                        }`}
                        onClick={() => handleButtonClick(false)}
                    >
                        <em>Don't have an account yet?</em>
                    </p>
                )}

                {/* Use react <link> component to navigate to the 'feed' route */}
                <Link to="/feed">
                    <button className="portal__enter-btn">Let's go!</button>
                </Link>
            </div>
        </div>
    );
}

export default Portal;
