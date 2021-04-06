import { useState } from 'react';
import CommentDetails from './CommentDetails';
import CommentEditor from './CommentEditor';
import updateComment from './api/commentUpdate';
import deleteComment from './api/commentDelete';
import CommentForm from './CommentForm';
import { reply } from '../../styles/Reply.module.css';

function Comment({ comment, currentUser, setComments, token, containerClass, replyRemoveCb = () => {} }) {

    const [isEdited, setIsEdited] = useState(false);
    const [error, setError] = useState('');
    const [replyCount, setReplyCount] = useState(comment.replyCount);

    const [replies, setReplies] = useState([]);
    const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
    const [areRepliesVisible, setAreRepliesVisible] = useState(false);

    const replyAddCb = () => {
        setIsReplyFormOpen(false);
        setReplyCount(prev => prev + 1);
    }

    const showReplies = async () => {
        setAreRepliesVisible(prev => !prev);
        if (replyCount > replies.length) {
            const res = await fetch(`http://localhost:5000/comments?comment=${comment._id}`);
            setReplies(await res.json());
        }
    };

    return (
        <div className={containerClass}>
            <CommentDetails
                editable={currentUser?._id === comment.author._id}
                {...{ comment, setComments, token, setIsEdited, setError, deleteComment, replyRemoveCb }}
            />
            <CommentEditor
                {...{ comment, token, setComments, setError, isEdited, setIsEdited, updateComment }}
            />
            {
                comment.post
                && <button onClick={() => setIsReplyFormOpen(prev => !prev)}>Reply</button>
            }
            {
                !!replyCount
                && <button onClick={showReplies}>
                    {areRepliesVisible ? `Hide replies` : `Show replies (${replyCount})`}
                </button>
            }
            {
                isReplyFormOpen
                && <CommentForm
                    {...{ currentUser, setComments: setReplies, token, replyAddCb }}
                    responseTo={{ comment: comment._id }}
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