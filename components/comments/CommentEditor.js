import { input } from '../../styles/Form.module.css';
import { btn } from '../../styles/Btn.module.css';
import { useState } from 'react';
import TextBox from '../TextBox';
import updateComment from './api/commentUpdate';

function CommentEditor({ comment, token, setComments, setError, setIsEdited }) {

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
            <button className={btn} onClick={handleUpdate}>Save</button>
            <button className={btn} onClick={cancelEdit}>Cancel</button>
        </div>
    );
}

export default CommentEditor;