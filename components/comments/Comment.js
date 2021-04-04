import style from '../../styles/Comment.module.css';
import { useState } from 'react';
import CommentDetails from './CommentDetails';
import CommentEditor from './CommentEditor';
import ReplyEditor from './ReplyEditor';
import updateComment from './api/commentUpdate';
import deleteComment from './api/commentDelete';
import Reply from './Reply';

function Comment({ comment, currentUser, setComments, token }) {

    const [replies, setReplies] = useState(comment.replies);
    const [isEdited, setIsEdited] = useState(false);
    const [error, setError] = useState('');

    return (
        <div className={style.comment}>
            <CommentDetails
                editable={currentUser?._id === comment.author._id}
                {...{ comment, setComments, token, setIsEdited, setError, deleteComment }}
            />
            {
                isEdited
                    ? <CommentEditor {...{ comment, token, setComments, setError, setIsEdited, updateComment }} />
                    : <div className={style.body}>{comment.text}</div>
            }
            <ReplyEditor {...{ _id: comment._id, token, setReplies, setError, currentUser }} />
            <div>{error}</div>
            {replies.map(rep => (
                <Reply
                    key={rep._id}
                    {...{ comment: rep, currentUser, setComments: setReplies, token, setError }}
                />
            ))}
        </div>
    );
}

export default Comment;