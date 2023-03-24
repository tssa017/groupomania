import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.scss';

// Components
import Header from './components/header/Header';
import Portal from './components/portal/Portal';
import Profile from './components/profile/Profile';
import Feed from './components/feed/Feed';

// Function dynamically displays each page in the browser
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

export default App;
