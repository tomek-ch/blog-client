import Meta from '../../../components/Meta';
import { container } from '../../../styles/Post.module.css';
import PostExcerpt from '../../../components/posts/PostExcerpt';
import { useState } from 'react';

function Post({ user, posts, error }) {

    if (error) return (
        <div className={container}>
            <Meta title={error} />
            {error}
        </div>
    );

    const [currentPosts, setCurrentPosts] = useState(posts)

    return (
        <div className={container}>
            <Meta title={`${user.firstName} - Blogg`} description={user.description} />
            <h1>{user.firstName} {user.lastName}</h1>
            <p>{user.description}</p>
            {currentPosts.map(post => <PostExcerpt key={post._id} post={post} setPosts={setCurrentPosts} />)}
        </div>
    );
}

export async function getServerSideProps({ params: { id } }) {
    try {
        const res = await fetch(`http://localhost:5000/users/${id}`);
        
        if (res.status === 200) {
            return {
                props: await res.json(),
            };
        } else if (res.status === 404) {
            return { props: { error: 'User not found' } };
        } else {
            return { props: { error: 'Failed to connect to the server' } };
        }

    } catch (error) {
        return { props: { error: 'Failed to connect to the server' } };
    }
}

export default Post;