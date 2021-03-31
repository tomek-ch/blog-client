import { useState } from 'react';
import { input } from '../../styles/Form.module.css';
import { btn } from '../../styles/Btn.module.css';
import { form } from '../../styles/CommentForm.module.css';

function CommentForm({ handleSubmit }) {

    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    const successCb = () => {
        setComment('');
        setError('');
    };

    return (
        <>
            <form
                className={form}
                onSubmit={e => {
                    e.preventDefault();
                    handleSubmit(comment, setError, successCb);
                }}>
                <input
                    placeholder="Write a comment"
                    onChange={e => setComment(e.target.value)}
                    value={comment}
                    className={input}
                />
                <button className={btn} disabled={!comment}>
                    Add
                </button>
            </form>
            <div>{error}</div>
        </>
    );
}

export default CommentForm;