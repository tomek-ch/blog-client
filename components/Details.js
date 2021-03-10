import { details } from '.././styles/Details.module.css';

function Details({ post }) {

    const { readTime } = post;
    const timeToRead = readTime === 0
        ? 'Less than a minute to read'
        : readTime === 1
            ? '1 minute read'
            : `${readTime} minutes read`;

    return (
        <div className={details}>
            {post.time} • {post.author.firstName} {post.author.lastName} • {timeToRead}
        </div>
    );
}

export default Details;