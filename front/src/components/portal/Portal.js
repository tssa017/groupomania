// Imports
import '../../index.scss';
import { useState } from 'react';
import axios from 'axios';
import Button from '../button/Button.js';

function Portal() {
    // Store and manages state of user input
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [signedUp, setSignedUp] = useState(false); // Keep track of sign in state

    // JS function to reset input fields to an empty string when toggling between signup and login
    const resetFields = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    };

    // Define regex patterns to ensure user input conforms to standard convention
    const namePattern = /^[a-zA-Z]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    // Function to validate user input
    const validateInput = () => {
        let isValid = true;

        // Validate first name
        if (!namePattern.test(firstName)) {
            isValid = false;
            document.getElementById('firstNameErrorMsg').textContent =
                'Please enter a valid first name.';
        } else {
            document.getElementById('firstNameErrorMsg').textContent = '';
        }

        // Validate last name
        if (!namePattern.test(lastName)) {
            isValid = false;
            document.getElementById('lastNameErrorMsg').textContent =
                'Please enter a valid last name.';
        } else {
            document.getElementById('lastNameErrorMsg').textContent = '';
        }

        // Validate email
        if (!emailPattern.test(email)) {
            isValid = false;
            document.getElementById('emailErrorMsg').textContent =
                'Please enter a valid email address.';
        } else {
            document.getElementById('emailErrorMsg').textContent = '';
        }

        // Validate password
        if (!passwordPattern.test(password)) {
            isValid = false;
            document.getElementById('passwordErrorMsg').textContent =
                'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.';
        } else {
            document.getElementById('passwordErrorMsg').textContent = '';
        }

        return isValid;
    };

    // Function posts user input to API, granting conditional access to the website
    const handleSignup = async (event) => {
        event.preventDefault();

        // Validate input before submitting
        if (!validateInput()) {
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
                setSignedUp(true);
                alert(
                    'User saved! To complete the verification process, please log in to your account'
                ); // Users must login to generate a JWT and be authorised to access site
            }
        } catch (err) {
            console.log(err);
        }
    };

    // Function posts user input to API, granting conditional access to the website
    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post('http://localhost:3001/api/login', {
                email,
                password,
            });

            if (res.status >= 200 && res.status < 300) {
                // Store the token in local storage for future use
                localStorage.setItem('token', res.data.token);
                window.location.href = '/feed';
            }
        } catch (error) {
            alert('Login failed. Please use a valid email and password.');
            console.log(error);
        }
    };

    // Hook stores the state so users can toggle between signup and login tabs
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

    // Render signup and login forms on the DOM
    return (
        <div className="portal-profile__wrapper">
            <div className="portal">
                <div className="portal__toggle">
                    <Button
                        className={`portal__toggle--signup ${
                            !buttonState.loginClicked ? 'purple' : ''
                        }`}
                        onClick={() => handleButtonClick(false)} // If this signup button is clicked, isLoginTrue will return false. Both the button's state and classname are updated accordingly
                    >
                        Sign up
                    </Button>
                    <Button
                        className={`portal__toggle--login ${
                            buttonState.loginClicked ? 'purple' : ''
                        }`}
                        onClick={() => handleButtonClick(true)}
                    >
                        Login
                    </Button>
                </div>

                {/* Conditional Signup and Login form rendering */}
                {/* Sign up */}

                {!signedUp &&
                    (buttonState.signupClicked || // If signup has been clicked or if neither button has been clicked (default setting), the Signup form will render
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
                                <p id="firstNameErrorMsg" className="alert"></p>
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
                                <p id="lastNameErrorMsg" className="alert"></p>
                            </div>
                            <div className="portal__form-group">
                                <label htmlFor="emailAddress">
                                    Email address
                                </label>
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
                                <p id="emailErrorMsg" className="alert"></p>
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
                                <p id="passwordErrorMsg" className="alert"></p>
                            </div>
                            <input
                                className="portal__enter-btn"
                                type="submit"
                                value="Create account" // Runs handleLogin() on submit (click event)
                            />
                        </form>
                    )}

                {/* Login */}
                {(buttonState.loginClicked || signedUp) && (
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
