import '../../index.scss';
import Settings from '../settings/Settings';
import CreatePost from '../create-post/CreatePost';
import Post from '../post/Post';

// Function creates a 'Feed' page by combining three components
function Feed() {
    return (
        <div>
            <Settings />
            <CreatePost />
            <Post />
        </div>
    );
}

export default Feed;
