import { comment, body } from '../styles/Comment.module.css';
import { useState } from 'react';
import CommentDetails from './CommentDetails';
import CommentEditor from './CommentEditor';
import ReplyEditor from './ReplyEditor';

function Comment({ replies, _id, text, time, author, editable, setComments, token }) {

    const [isEdited, setIsEdited] = useState(false);
    const [error, setError] = useState('');

    return (
        <div className={comment}>
            <CommentDetails {...{ editable, author, time, setComments, token, _id, setIsEdited, setError }} />
            {
                isEdited
                    ? <CommentEditor {...{ author, _id, token, setComments, text, setError, setIsEdited }} />
                    : <div className={body}>{text}</div>
            }
            <ReplyEditor {...{ _id, token, setComments, setError }} />
            <div>{error}</div>
            {replies.map(rep => <div key={rep._id}>{rep.text}</div>)}
        </div>
    );
}

export default Comment;