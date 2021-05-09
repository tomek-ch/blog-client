import api from '../../apiServerUrl';

async function addComment(responseTo, text, setComments, setError, handleSuccess, token, currentUser) {
    try {
        const comment = { text };

        if (responseTo.post)
            comment.post = responseTo.post;
        else
            comment.comment = responseTo.comment;

        const res = await fetch(`${api}/comments`, {
            method: 'post',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await res.json()

        if (res.status === 200) {
            setComments(prev => [{ ...data, author: currentUser }, ...prev]);
            handleSuccess();
        } else {
            setError(data[0]);
        }
    } catch {
        setError('Error trying to submit');
    }
};

export default addComment;