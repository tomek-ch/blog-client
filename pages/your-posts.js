import Meta from '../components/Meta';
import { container } from '../styles/Post.module.css';
import { useEffect, useState } from 'react';
import { useAppContext } from '../components/Context';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PostOptions from '../components/posts/PostOptions';

function YourPosts() {

    const { currentUser, token } = useAppContext();
    const router = useRouter();

    if (!currentUser)
        router.push('/log-in');

    const [data, setData] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentUser._id)
            fetch(`http://localhost:5000/list-unpublished`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then(res => res.json())
                .then(setData)
                .catch(() => setError('Error retrieving posts'));
    }, [currentUser]);

    if (error)
        return (
            <div className={container}>
                <Meta title={error} />
                {error}
            </div>
        );

    return (
        <div className={container}>
            <Meta title="Your posts" />
            <h1>Your posts</h1>
            <h2>Published</h2>
            {
                data?.published?.map(post => (
                    <div key={post._id} style={{ display: 'flex' }}>
                        <Link href={`/posts/${post._id}`}>
                            <a>{post.title}</a>
                        </Link>
                        <PostOptions id={post._id} />
                    </div>
                ))
            }
            <h2>Unpublished</h2>
            {
                data?.unpublished?.map(post => (
                    <div key={post._id} style={{ display: 'flex' }}>
                        <Link href={`/posts/${post._id}`}>
                            <a>{post.title}</a>
                        </Link>
                        <PostOptions id={post._id} />
                    </div>
                ))
            }
            <h2>Comments</h2>
            {
                data?.comments?.map(comment => (
                    <div key={comment._id} style={{ display: 'flex' }}>
                        <Link href={`/posts/${comment.post ? comment.post : comment.comment.post}`}>
                            <a>{comment.text}</a>
                        </Link>
                    </div>
                ))
            }
        </div>
    );
}

export default YourPosts;