import { useState, useEffect } from 'react';
import Link from 'next/link';
import PostDetails from '../posts/Details';
import { listItem } from '../../styles/YourPosts.module.css';

function PostList({ currentUser, unpublished, token }) {

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentUser._id) {

            const options =
                unpublished
                    ? {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    } : {};

            fetch(`http://localhost:5000/posts?author=${currentUser._id}`, options)
                .then(res => res.json())
                .then(setPosts)
                .catch(() => setError('Error retrieving posts'));
        }
    }, [currentUser, unpublished]);

    return error || posts.map(post => (
        <div key={post._id} className={listItem}>
            <Link href={`/posts/${post._id}`}>
                <a>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                </a>
            </Link>
            <PostDetails
                post={{ ...post, author: currentUser }}
                handleDelete={() => setData(prev => ({
                    ...prev,
                    [currentTab]: prev[currentTab].filter(p => p._id !== post._id),
                }))}
            />
        </div>
    ));
}

export default PostList;