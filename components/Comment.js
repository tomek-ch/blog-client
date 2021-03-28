import { comment, details, body } from '../styles/Comment.module.css';
import Link from 'next/link';
import CommentOptions from './CommentOptions';

function Comment({ _id, text, time, author, editable, setComments, token }) {
    return (
        <div className={comment}>
            <div className={details}>
                <Link href={`/users/${author._id}`}>
                    <a className={details}>{author.firstName} {author.lastName}</a>
                </Link> • {time} {editable && <CommentOptions {...{ setComments, token, _id }} />}
            </div>
            <div className={body}>{text}</div>
        </div>
    );
}

export default Comment;