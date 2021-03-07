import Link from 'next/link';
import { postSnippet } from '../styles/PostSnippet.module.css';

function PostThumbnail({ post: { _id, title, paragraphs } }) {

    return (
        <Link href={`/posts/${_id}`}>
            <a className={postSnippet}>
                <h2>{title}</h2>
                <p>{paragraphs[0].body}</p>
            </a>
        </Link>
    );
}

export default PostThumbnail;