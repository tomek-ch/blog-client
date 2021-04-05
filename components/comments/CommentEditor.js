import { input } from '../../styles/Form.module.css';
import { btn } from '../../styles/Btn.module.css';
import { useState } from 'react';
import TextBox from '../TextBox';

function CommentEditor({ comment, token, setComments, setError, setIsEdited, updateComment }) {

    const [editedText, setEditedText] = useState(comment.text);

    const cancelEdit = () => {
        setIsEdited(false);
        setEditedText(comment.text);
        setError('');
    };

    const handleUpdate = () => updateComment(comment, editedText, token, setComments, setError, setIsEdited);

    return (
        <div>
            <TextBox
                className={input}
                value={editedText}
                onChange={e => setEditedText(e.target.value)}
            />
            <button className={btn} onClick={handleUpdate} disabled={!editedText}>Save</button>
            <button className={btn} onClick={cancelEdit}>Cancel</button>
        </div>
    );
}

export default CommentEditor;