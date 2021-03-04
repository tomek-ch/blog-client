import Link from 'next/link';
import { postSnippet } from '../styles/PostSnippet.module.css';

function PostThumbnail({ post: { _id, title, paragraphs } }) {

    const heading = paragraphs[0].heading ? <h3>{paragraphs[0].heading}</h3> : '';

    return (
        <Link href={`/posts/${_id}`}>
            <a className={postSnippet}>
                <h2>{title}</h2>
                {heading}
                <p>{paragraphs[0].body}</p>
            </a>
        </Link>
    );
}

export default PostThumbnail;