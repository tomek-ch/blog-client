import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Post() {

    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postId}`)
            .then(res => res.json())
            .then(setPost)
            .catch(() => setError('A network error occured'));
    }, []);

    return (
        error ?
        error :
        post ?
        <article>
            <h1>{post.title}</h1>
            {post.paragraphs.map(p => (
                <div key={p._id}>
                    <h2>{p.heading}</h2>
                    <p>{p.body}</p>
                </div>
            ))}
            {post.tags.map(tag => <div key={tag}>{tag}</div>)}
        </article>
        : 'Loading...'
    );
}

export default Post;