import '../../index.scss';
import { useState } from 'react';

function Settings() {
    return (
        <div className="settings">
            <nav className="settings__nav">
                Settings
                <ul className="settings__nav--list">
                    <li className="settings__nav--list-item">Update</li>
                    <li className="settings__nav--list-item">Log out</li>
                </ul>
            </nav>
        </div>
    );
}

export default Settings;
