import { useState } from 'react';
import '../../index.scss';

function Portal() {
    return (
        <div className="portal">
            <form className="portal__form">
                <label>
                    First name:
                    <input
                        id="firstName"
                        name="firstName"
                        className="portal__form--first-name"
                        type="text"
                    ></input>
                </label>
                <label>
                    Last name:
                    <input
                        id="lastName"
                        name="lastName"
                        className="portal__form--last-name"
                        type="text"
                    ></input>
                </label>
                <label>
                    Email address:
                    <input
                        id="emailAddress"
                        name="emailAddress"
                        className="portal__form--email"
                        type="text"
                    ></input>
                </label>
                <label>
                    Password:
                    <input
                        id="password"
                        name="password"
                        className="portal__form--password"
                        type="text"
                    ></input>
                </label>
                <label>
                    Confirm password:
                    <input
                        id="password"
                        name="password"
                        className="portal__form--confirm-password"
                        type="text"
                    ></input>
                </label>
            </form>
        </div>
    );
}

export default Portal;
