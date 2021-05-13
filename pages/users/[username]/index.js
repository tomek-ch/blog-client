import Meta from '../../../components/Meta';
import { container, postFeed } from '../../../styles/Post.module.css';
import PostExcerpt from '../../../components/posts/PostExcerpt';
import { useState, useEffect } from 'react';
import api from '../../../components/apiServerUrl';

function Post({ user, posts, error }) {

    if (error) return (
        <div className={container}>
            <Meta title={error} />
            {error}
        </div>
    );

    const [currentPosts, setCurrentPosts] = useState(posts);

    // Sync component state with server side props
    useEffect(() => {
        setCurrentPosts(posts);
    }, [posts]);

    return (
        <div className={container}>
            <Meta title={`${user.firstName} ${user.lastName} - Blogg`} description={user.description} />
            <h1>{user.firstName} {user.lastName}</h1>
            <h2>{user.username}</h2>
            <p>{user.description}</p>
            <div className={postFeed}>
                {currentPosts.map(post => (
                    <PostExcerpt key={post._id} post={post} setPosts={setCurrentPosts} />
                ))}
            </div>
        </div>
    );
}

export async function getServerSideProps({ params: { username } }) {
    try {
        const res = await fetch(`${api}/users/${username}`);

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