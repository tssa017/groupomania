import '../../index.scss';
import { useState } from 'react';
import axios from 'axios';

// Function formats Portal component in JSX
function Portal() {
    // Store and manages state of user input
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Function to reset input fields to an empty string
    const resetFields = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setErrorMessage('');
    };

    // Function posts user input `Signup` info to API, granting conditional access to the website
    const handleSignup = async (event) => {
        event.preventDefault();

        // Validate input fields
        if (!firstName || !lastName || !email || !password) {
            setErrorMessage('Please fill all fields');
            return;
        }

        try {
            const res = await axios.post('http://localhost:3001/api/signup', {
                firstName,
                lastName,
                email,
                password,
            });

            if (res.status >= 200 && res.status < 300) {
                window.location.href = '/feed';
            } else {
                setErrorMessage('Invalid email or password');
            }
        } catch (err) {
            setErrorMessage('Error signing up');
        }
    };

    // Function posts user `Login` input to API, granting conditional access to the website
    const handleLogin = async (event) => {
        event.preventDefault();

        // Validate input fields
        if (!email || !password) {
            setErrorMessage('Please enter your email and password');
            return;
        }

        try {
            const res = await axios.post('http://localhost:3001/api/login', {
                email,
                password,
            });

            if (res.status >= 200 && res.status < 300) {
                window.location.href = '/feed';
            } else {
                setErrorMessage('Invalid email or password');
            }
        } catch (err) {
            setErrorMessage('Error logging in');
        }
    };

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

        // Reset input fields before toggling
        resetFields();
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
                {(buttonState.signupClicked || // If signup has been clicked or if neither button has been clicked (default setting), the Signup form will render
                    (!buttonState.signupClicked &&
                        !buttonState.loginClicked)) && (
                    <form className="portal__form" onSubmit={handleSignup}>
                        <div className="portal__form-group">
                            <label htmlFor="firstName">First name</label>
                            <input
                                className="input"
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
                                className="input"
                                id="lastName"
                                name="lastName"
                                type="text"
                                onChange={({ target }) =>
                                    setLastName(target.value)
                                }
                            />
                        </div>
                        <div className="portal__form-group">
                            <label htmlFor="emailAddress">Email address</label>
                            <input
                                className="input"
                                id="emailAddress"
                                name="emailAddress"
                                type="text"
                                onChange={({ target }) =>
                                    setEmail(target.value)
                                }
                                value={email}
                            />
                        </div>
                        <div className="portal__form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                className="input"
                                id="password"
                                name="password"
                                type="password"
                                onChange={({ target }) =>
                                    setPassword(target.value)
                                }
                                value={password}
                            />
                        </div>
                        {errorMessage && (
                            <div className="alert alert-danger">
                                {errorMessage}
                            </div>
                        )}
                        <input
                            className="portal__enter-btn"
                            type="submit"
                            value="Create account" // Runs handleLogin() on submit (click event)
                        />
                    </form>
                )}

                {buttonState.loginClicked && (
                    <form className="portal__form" onSubmit={handleLogin}>
                        <div className="portal__form-group">
                            <label htmlFor="emailAddress">Email address</label>
                            <input
                                className="input"
                                id="emailAddress"
                                name="emailAddress"
                                type="text"
                                onChange={({ target }) =>
                                    setEmail(target.value)
                                }
                                value={email}
                            />
                        </div>
                        <div className="portal__form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                className="input"
                                id="password"
                                name="password"
                                type="password"
                                onChange={({ target }) =>
                                    setPassword(target.value)
                                }
                                value={password}
                            />
                        </div>
                        {errorMessage && (
                            <div className="alert alert-danger">
                                {errorMessage}
                            </div>
                        )}
                        <input
                            className="portal__enter-btn"
                            type="submit"
                            value="Log in"
                        />
                    </form>
                )}

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
            </div>
        </div>
    );
}

export default Portal;
