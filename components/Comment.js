import { comment, details, body } from '../styles/Comment.module.css';
import { input } from '../styles/Form.module.css';
import { btn } from '../styles/Btn.module.css';
import Link from 'next/link';
import CommentOptions from './CommentOptions';
import { useState } from 'react';
import TextBox from './TextBox';

function Comment({ _id, text, time, author, editable, setComments, token }) {

    const [isEdited, setIsEdited] = useState(false);
    const [editedText, setEditedText] = useState(text);
    const [error, setError] = useState('');

    const cancelEdit = () => {
        setIsEdited(false);
        setEditedText(text);
        setError('');
    };

    const updateComment = async () => {
        try {
            const res = await fetch(`http://localhost:5000/comments/${_id}`, {
                method: 'put',
                body: JSON.stringify({ text: editedText }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                const updatedComment = await res.json();
                setComments(prev => prev.map(com => com._id === _id ? {
                    ...updatedComment,
                    author,
                } : com));

                setError('');
                setIsEdited(false);
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
            <div className={details}>
                <div>
                    <Link href={`/users/${author._id}`}>
                        <a className={details}>{author.firstName} {author.lastName}</a>
                    </Link> • {time}
                </div>
                {editable && <CommentOptions {...{ setComments, token, _id, setIsEdited, setError }} />}
            </div>
            {isEdited
                ? <div>
                    <TextBox
                        className={input}
                        value={editedText}
                        onChange={e => setEditedText(e.target.value)}
                    />
                    <button className={btn} onClick={updateComment}>Save</button>
                    <button className={btn} onClick={cancelEdit}>Cancel</button>
                </div>
                : <div className={body}>{text}</div>}
            <div>{error}</div>
        </div>
    );
}

export default Comment;