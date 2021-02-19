import React from 'react';
import { Link } from 'react-router-dom';

function PostThumbnail({ post: { _id, title, paragraphs } }) {

    const heading = paragraphs[0].heading ? <h3>{paragraphs[0].heading}</h3> : '';

    return (
        <Link to={`/posts/${_id}`}>
            <h2>{title}</h2>
            {heading}
            <p>{paragraphs[0].body}</p>
        </Link>
    );
}

export default PostThumbnail;