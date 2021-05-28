import { useState, useEffect } from 'react';
import api from '../apiServerUrl';
import CommentOverview from '../comments/CommentOverview';

function CommentList({ currentUser }) {

    const [comments, setComments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentUser?._id)
            fetch(`${api}/comments?author=${currentUser._id}&getPost=true&newest=true`)
                .then(res => res.json())
                .then(setComments)
                .catch(() => setError('Error retrieving comments'));
    }, [currentUser]);

    if (!currentUser)
        return null;

    return error || comments.map(com => (
        <CommentOverview key={com._id} com={{ ...com, author: currentUser }} />
    ));
}

export default CommentList;