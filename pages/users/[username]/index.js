import Meta from '../../../components/Meta';
import { container } from '../../../styles/Post.module.css';
import style from '../../../styles/UserProfile.module.css';
import PostExcerpt from '../../../components/posts/PostExcerpt';
import { useState, useEffect } from 'react';
import api from '../../../components/apiServerUrl';

function Post({ user, posts, comments, error }) {

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
        <div className={style.container}>
            <div className={style.userInfo}>
                <Meta title={`${user.firstName} ${user.lastName} - Blogg`} description={user.description} />
                <h1>{user.firstName} {user.lastName}</h1>
                <h2>{user.username}</h2>
                <p>{user.description}</p>
                <div>
                    <h2>Latest Comments:</h2>
                    {comments.slice(0, 5).map(comment => (
                        <div key={comment._id} style={{ margin: '0.5em 0' }}>
                            {comment.text}
                        </div>)
                    )}
                </div>
            </div>
            <div className={container}>
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
            const props = await res.json();
            try {
                const comments = await (await fetch(`${api}/comments?author=${props.user._id}`)).json();
                return { props: { ...props, comments } }
            } catch {
                props.comments = [];
                return { props };
            }
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