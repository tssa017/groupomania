import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.scss'; // Imports main stylesheet
import Header from './components/header/Header.js';
import Portal from './components/portal/Portal.js';
import Profile from './components/profile/Profile.js';
import Status from './components/status/Status.js';
import Settings from './components/settings/Settings.js';
import Publication from './components/publication/Publication';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Portal />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/status" element={<Status />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/publication" element={<Publication />} />
            </Routes>
        </Router>
    );
}

export default App;
