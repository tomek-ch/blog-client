import { useState } from 'react';
import { input } from '../../styles/Form.module.css';
import { btn } from '../../styles/Btn.module.css';
import { link } from '../../styles/InlineLink.module.css';
import { form, container } from '../../styles/CommentForm.module.css';
import addComment from './api/commentCreate';
import Link from 'next/link';

function CommentForm({ currentUser, responseTo, token, setComments, replyAddCb = () => { }, focus }) {

    if (!currentUser)
        return (
            <div className={container}>
                <Link href="/register">
                    <a className={link}>Sign up</a>
                </Link> to comment
            </div>
        );


    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    const successCb = () => {
        setComment('');
        setError('');
        replyAddCb();
    };

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
                    autoFocus={focus}
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