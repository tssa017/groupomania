import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
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

    useEffect(() => {
        // Check if user is logged in by checking for token in local storage or cookie
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true);
        }
    }, []);

    const authInterceptor = axios.interceptors.request.use((config) => {
        // Add authorization token to request headers
        const token = localStorage.getItem('token');
        if (loggedIn && token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    const unauthInterceptor = axios.interceptors.response.use(
        (response) => response,
        (error) => {
            // Handle unauthorized errors
            if (error.response.status === 401) {
                setLoggedIn(false);
            }
            return Promise.reject(error);
        }
    );

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
