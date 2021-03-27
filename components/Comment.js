import { comment, details, body } from '../styles/Comment.module.css';
import Link from 'next/link';
import CommentOptions from './CommentOptions';

function Comment({ text, time, author, editable }) {
    return (
        <div className={comment}>
            <div className={details}>
                <Link href={`/users/${author._id}`}>
                    <a className={details}>{author.firstName} {author.lastName}</a>
                </Link> • {time} {editable && <CommentOptions />}
            </div>
            <div className={body}>{text}</div>
        </div>
    );
}

export default Comment;