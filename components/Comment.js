import { comment, details, body } from '../styles/Comment.module.css';
import Link from 'next/link';

function Comment({ text, time, author, editable }) {
    return (
        <div className={comment}>
            <div className={details}>
                <Link href={`/users/${author._id}`}>
                    <a className={details}>{author.firstName} {author.lastName}</a>
                </Link> • {time} {editable && <button>...</button>}
            </div>
            <div className={body}>{text}</div>
        </div>
    );
}

export default Comment;