import './index.scss'; // Import main stylesheet
import Header from './components/header/Header.js';
// import Portal from './components/portal/Portal.js';
// import Profile from './components/profile/Profile.js';
import Status from './components/status/Status.js';
import Settings from './components/settings/Settings.js';

function App() {
    return (
        // <div className="app">
        //     <Header />
        //     <div className="app__portal">
        //         <Portal />
        //     </div>
        // </div>
        // <div className="app">
        //     <Header />
        //     <div className="app__profile">
        //         <Profile />
        //     </div>
        // </div>
        <div className="app">
            <Header />
            <Settings />
            <Status />
        </div>
    );
}

export default App;
