import { useState } from 'react';

function CommentForm({ handleSubmit }) {

    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    return (
        <>
            <form onSubmit={e => {
                e.preventDefault();
                handleSubmit(comment, setError, () => setComment(''));
            }}>
                <input
                    placeholder="Write a comment"
                    onChange={e => setComment(e.target.value)}
                    value={comment}
                />
                <button>
                    Add
            </button>
            </form>
            <div>{error}</div>
        </>
    );
}

export default CommentForm;