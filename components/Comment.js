import { comment, details } from '../styles/Comment.module.css';

function Comment({ text, time, author }) {
    return (
        <div className={comment}>
            <div className={details}>{author.firstName} {author.lastName}</div>
            <div>{text}</div>
            <div className={details}>{time}</div>
        </div>
    );
}

export default Comment;