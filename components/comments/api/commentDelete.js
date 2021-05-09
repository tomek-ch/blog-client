import api from '../../apiServerUrl';

async function deleteComment(_id, token, setComments, setError, replyRemoveCb) {
    try {    
        const res = await fetch(`${api}/comments/${_id}`, {
            method: 'delete',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status === 200) {
            setComments(prev => prev.filter(com => com._id !== _id));
            replyRemoveCb();
        } else {
            setError('Error trying to delete comment');
        }
    } catch {
        setError('Error trying to delete comment');
    }
};

export default deleteComment;