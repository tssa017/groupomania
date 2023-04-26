// Imports
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'; // TODO: Do I need?
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import './index.scss';

// Components
import Header from './components/header/Header';
import Portal from './components/portal/Portal';
import Profile from './components/profile/Profile';
import Feed from './components/feed/Feed';
import Edit from './components/edit-post/EditPost';

// Function dynamically displays each page in the browser
function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    // Function checks if user is logged in by checking for token in local storage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true);
        }
    }, []);

    // Function adds authorization token to request headers
    const authInterceptor = axios.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (loggedIn && token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    // Function handles unauthorised errors
    const unauthInterceptor = axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status === 401) {
                setLoggedIn(false);
            }
            return Promise.reject(error);
        }
    );

    // By applying 'loggedIn', all of website is protected by authorisation except for the portal (sign up and login) page
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/portal" element={<Portal />} />
                <Route
                    path="/profile"
                    element={loggedIn ? <Profile /> : <Portal />}
                />
                <Route
                    path="/feed"
                    element={loggedIn ? <Feed /> : <Portal />}
                />
                <Route
                    path="/edit"
                    element={loggedIn ? <Edit /> : <Portal />}
                />
            </Routes>
        </Router>
    );
}

export default App;
