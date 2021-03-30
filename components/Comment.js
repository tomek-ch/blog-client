import { comment, body } from '../styles/Comment.module.css';
import { input } from '../styles/Form.module.css';
import { btn } from '../styles/Btn.module.css';
import { useState } from 'react';
import TextBox from './TextBox';
import CommentDetails from './CommentDetails';
import CommentEditor from './CommentEditor';

function Comment({ replies, _id, text, time, author, editable, setComments, token }) {

    const [isEdited, setIsEdited] = useState(false);
    const [error, setError] = useState('');

    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const [replyText, setReplyText] = useState('');

    const addReply = async () => {
        try {
            const res = await fetch('http://localhost:5000/replies', {
                method: 'post',
                body: JSON.stringify({ text: replyText, comment: _id }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                const reply = await res.json();
                setComments(prev => prev.map(com => com._id === _id ? {
                    ...com,
                    replies: [...com.replies, reply],
                } : com));

                setError('');
                setIsReplyOpen(false);
                setReplyText('');
            } else {
                const data = await res.json();
                setError(data[0]);
            }
        } catch (e) {
            setError('Error trying to submit');
        }
    };

    return (
        <div className={comment}>
            <CommentDetails {...{ editable, author, time, setComments, token, _id, setIsEdited, setError }} />
            {
                isEdited
                    ? <CommentEditor {...{ author, _id, token, setComments, text, setError, setIsEdited }} />
                    : <div className={body}>{text}</div>
            }
            <button onClick={() => setIsReplyOpen(prev => !prev)}>Reply</button>
            {isReplyOpen && <div>
                <TextBox
                    className={input}
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                />
                <button className={btn} onClick={addReply} disabled={!replyText}>Add</button>
            </div>}
            <div>{error}</div>
            {replies.map(rep => <div key={rep._id}>{rep.text}</div>)}
        </div>
    );
}

export default Comment;