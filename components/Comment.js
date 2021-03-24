import { comment, details } from '../styles/Comment.module.css';
import Link from 'next/link';

function Comment({ text, time, author }) {
    return (
        <div className={comment}>
            <Link href={`/users/${author._id}`}>
                <a className={details}>{author.firstName} {author.lastName}</a>
            </Link>
            <div>{text}</div>
            <div className={details}>{time}</div>
        </div>
    );
}

export default Comment;