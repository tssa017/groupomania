import '../../index.scss';
import Settings from '../settings/Settings';
import Status from '../status/Status';
import Publication from '../publication/Publication';

// Function creates a 'Feed' page by combining three components
function Feed() {
    return (
        <div>
            <Settings />
            <Status />
            <Publication />
        </div>
    );
}

export default Feed;
