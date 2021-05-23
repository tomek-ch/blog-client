import { details } from '../../styles/Details.module.css';
import Link from 'next/link';
import { useAppContext } from '../Context';
import PostOptions from './PostOptions';

function Details({ post, handleDelete }) {

    const { currentUser } = useAppContext();

    const { readTime } = post;
    const timeToRead = readTime === 0
        ? 'Less than a min'
        : readTime === 1
            ? '1 min read'
            : `${readTime} min read`;

    const authorName = post.author.firstName && (
        <><Link href={`/users/${post.author.username}`}>
            <a>{post.author.firstName} {post.author.lastName}</a>
        </Link> • </>
    );

    return (
        <div className={details}>
            <div>{post.time} • {authorName}{timeToRead}</div>
            {
                currentUser && currentUser._id === (post.author?._id || post.author) &&
                <PostOptions id={post._id} handleDelete={handleDelete} />
            }
        </div>
    );
}

export default Details;