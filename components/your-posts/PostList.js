import { useState, useEffect } from 'react';
import Link from 'next/link';
import PostDetails from '../posts/Details';
import { listItem } from '../../styles/YourPosts.module.css';
import api from '../apiServerUrl';

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
        return 'Loading...';

    if (!posts.length)
        return 'Nothing here yet';

    return posts.map(post => (
        <div key={post._id} className={listItem}>
            <Link href={`/posts/${post._id}`}>
                <a>
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