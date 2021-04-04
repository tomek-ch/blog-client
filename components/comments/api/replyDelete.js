async function deleteReply(_id, token, setComments, setError) {
    try {    
        const res = await fetch(`http://localhost:5000/replies/${_id}`, {
            method: 'delete',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status === 200) {
            setComments(prev => prev.filter(com => com._id !== _id));
        } else {
            setError('Error trying to delete reply');
        }
    } catch {
        setError('Error trying to delete reply');
    }
}

export default deleteReply;