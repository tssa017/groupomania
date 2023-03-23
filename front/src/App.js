import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.scss';
import Header from './components/header/Header';
import Portal from './components/portal/Portal';
import Profile from './components/profile/Profile';
import Status from './components/status/Status';
import Settings from './components/settings/Settings';
import Publication from './components/publication/Publication';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/portal" element={<Portal />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/feed" element={<Feed />} />
            </Routes>
        </Router>
    );
}

function Feed() {
    return (
        <div>
            <Settings />
            <Status />
            <Publication />
        </div>
    );
}

export default App;
