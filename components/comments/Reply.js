import { reply } from '../../styles/Reply.module.css';
import { useState } from 'react';
import CommentDetails from './CommentDetails';
import CommentEditor from './CommentEditor';
import updateComment from './api/replyUpdate';
import deleteComment from './api/replyDelete';

function Reply({ comment, currentUser, setComments, token, setError }) {

    const [isEdited, setIsEdited] = useState(false);

    return (
        <div className={reply}>
            <CommentDetails
                editable={currentUser?._id === comment.author._id}
                {...{ comment, setComments, token, setIsEdited, setError, deleteComment }}
            />
            {
                isEdited
                    ? <CommentEditor {...{ comment, token, setComments, setError, setIsEdited, updateComment }} />
                    : <div>{comment.text}</div>
            }
        </div>
    );
}

export default Reply;