import api from '../../apiServerUrl';

async function updateComment(comment, editedText, token, setComments, setError, setIsEdited) {
    try {
        const res = await fetch(`${api}/comments/${comment._id}`, {
            method: 'put',
            body: JSON.stringify({ text: editedText }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (res.status === 200) {
            const updatedComment = await res.json();
            setComments(prev => prev.map(com => com._id === comment._id ? {
                ...updatedComment,
                replies: comment.replies,
                author: comment.author,
            } : com));

            setError('');
            setIsEdited(false);
        } else {
            const data = await res.json();
            setError(data[0]);
        }
    } catch {
        setError('Error trying to submit');
    }
};

export default updateComment;