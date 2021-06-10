import { useState, useEffect } from 'react';
import Link from 'next/link';
import PostDetails from '../posts/Details';
import style from '../../styles/YourPosts.module.css';
import api from '../apiServerUrl';
import { link } from '../../styles/InlineLink.module.css';
import Spinner from '../Spinner';

function PostList({ currentUser, unpublished, token }) {

    if (!currentUser)
        return null;

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (currentUser?._id) {

            const options =
                unpublished
                    ? {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    } : {};

            fetch(`${api}/posts?author=${currentUser._id}`, options)
                .then(res => res.json())
                .then(data => {
                    setIsLoading(false);
                    setPosts(data);
                })
                .catch(() => {
                    setIsLoading(false);
                    setError('Error retrieving posts');
                });
        }
    }, [currentUser, unpublished]);

    if (error)
        return error;

    if (isLoading)
        return <Spinner />;

    if (!posts.length)
        return (
            <>
                Nothing here yet. <Link href="/new">
                    <a className={link}>Write a post</a>
                </Link>
            </>
        );

    return posts.map(post => (
        <div key={post._id} className={style.listItem}>
            <Link href={`/posts/${post._id}`}>
                <a className={style.link}>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                </a>
            </Link>
            <PostDetails
                post={{ ...post, author: currentUser }}
                handleDelete={() => setPosts(prev => prev.filter(p => p._id !== post._id))}
            />
        </div>
    ));
}

export default PostList;