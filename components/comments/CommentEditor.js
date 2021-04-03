import { input } from '../../styles/Form.module.css';
import { btn } from '../../styles/Btn.module.css';
import { useState } from 'react';
import TextBox from '../TextBox';

function CommentEditor({ comment: { _id, author, text, replies }, token, setComments, setError, setIsEdited }) {

    const [editedText, setEditedText] = useState(text);

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
                    replies,
                } : com));

                setError('');
                setIsEdited(false);
            } else {
                const data = await res.json();
                setError(data[0]);
            }
        } catch (e) {
            console.log(e);
            setError('Error trying to submit');
        }
    };

    return (
        <div>
            <TextBox
                className={input}
                value={editedText}
                onChange={e => setEditedText(e.target.value)}
            />
            <button className={btn} onClick={updateComment}>Save</button>
            <button className={btn} onClick={cancelEdit}>Cancel</button>
        </div>
    );
}

export default CommentEditor;