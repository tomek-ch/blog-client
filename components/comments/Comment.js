import style from '../../styles/Comment.module.css';
import { useState } from 'react';
import CommentDetails from './CommentDetails';
import CommentEditor from './CommentEditor';
import ReplyEditor from './ReplyEditor';

function Comment({ comment, editable, setComments, token }) {

    const [isEdited, setIsEdited] = useState(false);
    const [error, setError] = useState('');

    return (
        <div className={style.comment}>
            <CommentDetails {...{ comment, editable, setComments, token, setIsEdited, setError }} />
            {
                isEdited
                    ? <CommentEditor {...{ comment, token, setComments, setError, setIsEdited }} />
                    : <div className={style.body}>{comment.text}</div>
            }
            <ReplyEditor {...{ _id: comment._id, token, setComments, setError }} />
            <div>{error}</div>
            {comment.replies.map(rep => <div key={rep._id}>{rep.text}</div>)}
        </div>
    );
}

export default Comment;