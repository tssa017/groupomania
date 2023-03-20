import './index.scss'; // Import main stylesheet
import Header from './components/header/Header';
// import Portal from './components/portal/Portal';
import Profile from './components/profile/Profile';

function App() {
    return (
        // <div className="app">
        //     <Header />
        //     <div className="app__portal">
        //         <Portal />
        //     </div>
        // </div>
        <div className="app">
            <Header />
            <div className="app__profile">
                <Profile />
            </div>
        </div>
    );
}

export default App;
