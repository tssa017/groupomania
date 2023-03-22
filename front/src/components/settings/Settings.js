import '../../index.scss';
import { useState } from 'react';

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
                            Update profile
                        </li>
                        <li className="settings__nav--list-item">Log out</li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Settings;
