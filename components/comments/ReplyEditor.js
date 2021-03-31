import { useState } from 'react';
import TextBox from '../TextBox';
import { input } from '../../styles/Form.module.css';
import { btn } from '../../styles/Btn.module.css';

function ReplyEditor({ _id, token, setComments, setError }) {

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
        <>
            <button onClick={() => setIsReplyOpen(prev => !prev)}>Reply</button>
            {
                isReplyOpen && <div>
                    <TextBox
                        className={input}
                        value={replyText}
                        onChange={e => setReplyText(e.target.value)}
                    />
                    <button className={btn} onClick={addReply} disabled={!replyText}>Add</button>
                </div>
            }
        </>
    );
}

export default ReplyEditor;