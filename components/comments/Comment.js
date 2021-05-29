import { useState } from 'react';
import CommentDetails from './CommentDetails';
import CommentEditor from './CommentEditor';
import updateComment from './api/commentUpdate';
import deleteComment from './api/commentDelete';
import CommentForm from './CommentForm';
import { reply } from '../../styles/Reply.module.css';
import commentStyle from '../../styles/Comment.module.css';
import api from '../apiServerUrl';

function Comment({
    comment, currentUser, setComments, token,
    containerClass = commentStyle.comment,
    replyRemoveCb = () => { },
}) {

    const [isEdited, setIsEdited] = useState(false);
    const [error, setError] = useState('');
    const [replyCount, setReplyCount] = useState(comment.replyCount);

    const [replies, setReplies] = useState([]);
    const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
    const [areRepliesVisible, setAreRepliesVisible] = useState(false);

    const replyAddCb = () => {
        setIsReplyFormOpen(false);
        setReplyCount(prev => prev + 1);
    };

    const showReplies = async () => {
        setAreRepliesVisible(prev => !prev);
        if (replyCount > replies.length) {
            try {
                const res = await fetch(`${api}/comments?comment=${comment._id}`);
                if (res.status === 200)
                    setReplies(await res.json());
                else
                    setError('Error trying to retrieve replies');
            } catch {
                setError('Error trying to retrieve replies');
            }
        }
    };

    return (
        <div className={containerClass} id={comment._id}>
            <CommentDetails
                editable={currentUser?._id === comment.author._id}
                {...{ comment, setComments, token, setIsEdited, setError, deleteComment, replyRemoveCb }}
            />
            <CommentEditor
                {...{ comment, token, setComments, setError, isEdited, setIsEdited, updateComment }}
            />
            <div className={commentStyle.btns}>
                {
                    comment.post
                    && (
                        <button
                            onClick={() => setIsReplyFormOpen(prev => !prev)}
                            className={commentStyle.btn}
                        >
                            <i className="ri-reply-fill" />
                            Reply
                        </button>
                    )
                }
                {
                    !!replyCount && comment.post && ' • '
                }
                {
                    !!replyCount
                    && <button onClick={showReplies} className={commentStyle.btn}>
                        {areRepliesVisible ? `Hide replies` : `Show replies (${replyCount})`}
                    </button>
                }
            </div>
            {
                isReplyFormOpen
                && <CommentForm
                    {...{ currentUser, setComments: setReplies, token, replyAddCb }}
                    responseTo={{ comment: comment._id }}
                    focus={true}
                />
            }
            <div>{error}</div>
            {
                areRepliesVisible
                && replies.map(rep => (
                    <Comment
                        key={rep._id}
                        comment={rep}
                        setComments={setReplies}
                        containerClass={reply}
                        {...{ token, currentUser }}
                        replyRemoveCb={() => setReplyCount(prev => prev - 1)}
                    />
                ))
            }
        </div>
    );
}

export default Comment;