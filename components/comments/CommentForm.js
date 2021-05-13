import { useState, useRef, useEffect } from 'react';
import { input } from '../../styles/Form.module.css';
import { btn } from '../../styles/Btn.module.css';
import { form } from '../../styles/CommentForm.module.css';
import addComment from './api/commentCreate';
import Link from 'next/link';

function CommentForm({ currentUser, responseTo, token, setComments, replyAddCb = () => {}, focus }) {

    if (!currentUser)
        return (
            <Link href="/log-in">
                <a>Sign in to comment</a>
            </Link>
        );


    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    const successCb = () => {
        setComment('');
        setError('');
        replyAddCb();
    };

    const inputRef = useRef();
    useEffect(() => {
        if (focus)
            inputRef.current?.focus();
    }, []);

    return (
        <>
            <form
                className={form}
                onSubmit={e => {
                    e.preventDefault();
                    addComment(responseTo, comment, setComments, setError, successCb, token, currentUser);
                }}>
                <input
                    placeholder="Write a comment"
                    onChange={e => setComment(e.target.value)}
                    value={comment}
                    className={input}
                    ref={inputRef}
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