import { tile, details } from '../../styles/PostTile.module.css';
import Link from 'next/link';

function PostTile({ post: { _id, title, author, excerpt, readTime, time } }) {

    const timeToRead = readTime === 0
        ? 'Less than a min'
        : readTime === 1
            ? '1 min read'
            : `${readTime} min read`;

    return (
        <Link href={`/posts/${_id}`}>
            <a className={tile}>
                <div className={details}>{author.firstName} {author.lastName}</div>
                <h3>{title}</h3>
                <p>{excerpt}</p>
                <div className={details}>{time} • {timeToRead}</div>
            </a>
        </Link>
    );
}

export default PostTile;