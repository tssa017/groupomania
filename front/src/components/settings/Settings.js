// Imports
import '../../index.scss';
import { useState } from 'react';
import axios from 'axios'; // TODO: Do I need?

function Settings() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isIconUp, setIsIconUp] = useState(false);

    // Functions toggle nav to reveal or collapse on click
    function toggleNav() {
        setIsNavOpen(!isNavOpen);
    }

    function toggleIcon() {
        setIsIconUp(!isIconUp);
        setIsNavOpen(false);
    }

    // Function handles logout by clearing JWT from localStorage
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/portal'; // TODO: Use nav?
        alert('You have been logged out');
    };

    return (
        <div className="wrapper">
            <div className="settings">
                <nav className="settings__nav" onClick={toggleNav}>
                    Settings
                    <i
                        className={`settings__nav--icon fa-solid fa-angle-${
                            isIconUp ? 'up' : 'down'
                        }`}
                        onClick={toggleIcon}
                    ></i>
                    <ul
                        className="settings__nav--list"
                        style={{ display: isNavOpen ? 'block' : 'none' }}
                    >
                        <li className="settings__nav--list-item">
                            <a href="/profile">Update profile</a>
                        </li>
                        <li
                            className="settings__nav--list-item"
                            onClick={handleLogout}
                        >
                            Log out
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Settings;
