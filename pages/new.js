import Meta from '../components/Meta';
import PostEditor from '../components/PostEditor';
import { container } from '../styles/Post.module.css';

function NewPost() {
    return (
        <div className={container}>
            <Meta title="New post - Blogg" />
            <PostEditor />
        </div>
    );
}

export default NewPost;