import './index.scss'; // Import main stylesheet
import Header from './components/header/Header';
import Portal from './components/portal/Portal';

function App() {
    return (
        <div className="app">
            <Header />
            <div className="app__portal">
                <Portal />
            </div>
        </div>
    );
}

export default App;
