import Meta from '../../../components/Meta';
import { container } from '../../../styles/Post.module.css';
import PostExcerpt from '../../../components/posts/PostExcerpt';
import { useState } from 'react';
import api from '../../../components/apiServerUrl';

function PostsTagged({ posts, tag, error }) {

    if (error)
        return (
            <div className={container}>
                <Meta title={`${error} - Blogg`} />
                {error}
            </div>
        );

    const [currentPosts, setCurrentPosts] = useState(posts);

    return (
        <div className={container}>
            <Meta
                title={`Posts tagged ${tag} - Blogg`}
                description={`Discover internet's best articles about ${tag} on Blogg.`}
            />
            <h1>Posts tagged {tag}</h1>
            <div>
                {currentPosts.map(post => (
                    <PostExcerpt key={post._id} post={post} setPosts={setCurrentPosts} />
                ))}
            </div>
        </div>
    );
}

export async function getServerSideProps({ params: { tag } }) {
    try {
        const res = await fetch(`${api}/posts?tags=${encodeURI(tag)}`);
        const data = await res.json();

        if (res.status === 200) return { props: { posts: data, tag } };
        else return { props: { error: data[0] } };

    } catch (error) {
        return { props: { error: 'Failed to connect to the server' } };
    }
}

export default PostsTagged;