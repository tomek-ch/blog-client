import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Post() {

    const { postId } = useParams();
    const [post, setPost] = useState({});
    const { title, paragraphs, tags } = post;

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postId}`)
            .then(res => res.json())
            .then(setPost);
    }, []);

    return (
        <article>
            <h1>{title}</h1>
            {paragraphs?.map(p => (
                <div key={p._id}>
                    <h2>{p.heading}</h2>
                    <p>{p.body}</p>
                </div>
            ))}
            {tags?.map(tag => <div key={tag}>{tag}</div>)}
        </article>
    );
}

export default Post;